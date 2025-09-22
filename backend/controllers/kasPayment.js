const db = require("../models");
const kasPayment = db.KasPayment;
const kasMonth = db.KasMonth;

exports.createPayment = async (req, res) => {
  try {
    const { userId, kasMonthId, berapaBulan, amount } = req.body;
    const paymentDate = new Date();
    let proofImage = null;

    if (req.file) {
      proofImage = `/uploads/${req.file.filename}`;
    }

    const payment = await kasPayment.create({
      userId,
      kasMonthId,
      berapaBulan,
      amount,
      status: "pending",
      paymentDate,
      proofImage,
    });

    res.status(201).json({
      msg: "Pembayaran berhasil diajukan. Menunggu konfirmasi bendahara.",
      payment,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getPayment = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const sortOrder = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  try {
    const { count, rows } = await kasPayment.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', sortOrder]],
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      payment: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal mengambil data iuran" });
  }
};

exports.getPaymentByUserId = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const payment = await kasPayment.findAll({ where: { userId } });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const monthOrder = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];



const normalize = (month) => month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

exports.confirmPaymentOffline = async (req, res) => {
  try {
    const { monthId } = req.params;

    const kasMonths = await kasMonth.findOne({ where: { uuid: monthId } });
    if (!kasMonths) {
      return res.status(404).json({ msg: "Data bulan tidak ditemukan" });
    }

    kasMonths.status = "Sudah ACC";
    kasMonths.tanggalPembayaran = new Date();

    await kasMonths.save();

    res.status(200).json({
      msg: "Status bulan berhasil diperbarui menjadi Sudah ACC",
      updatedMonth: kasMonths
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal konfirmasi pembayaran offline" });
  }
};


exports.confirmPayment = async (req, res) => {
  try {
    const { id, monthId } = req.params;
    const { bendaharaId } = req.body;

    const payment = await kasPayment.findOne({ where: { uuid: id } });
    if (!payment) return res.status(404).json({ msg: "Data pembayaran tidak ditemukan" });

    const kasMonths = await kasMonth.findOne({ where: { uuid: monthId } });
    if (!kasMonths) return res.status(404).json({ msg: "Data bulan tidak ditemukan" });

    let allMonths = await kasMonth.findAll({
      where: {
        userId: kasMonths.userId,
        kasYearId: kasMonths.kasYearId
      }
    });

    allMonths.sort((a, b) => {
      return monthOrder.indexOf(normalize(a.month)) - monthOrder.indexOf(normalize(b.month));
    });

    const startIndex = allMonths.findIndex(m => m.uuid === kasMonths.uuid);
    if (startIndex === -1) {
      return res.status(400).json({ msg: "Bulan awal tidak valid dalam tahun tersebut" });
    }

    const targetMonths = allMonths
      .slice(startIndex)
      .filter(m => m.status !== "Sudah ACC")
      .slice(0, payment.berapaBulan);

    if (targetMonths.length < payment.berapaBulan) {
      return res.status(400).json({
        msg: `Jumlah bulan valid untuk dikonfirmasi (${targetMonths.length}) kurang dari yang dibayar (${payment.berapaBulan})`
      });
    }

    for (const m of targetMonths) {
      m.status = "Sudah ACC";
      m.tanggalPembayaran = payment.paymentDate;
      await m.save();
    }

    payment.status = "confirmed";
    payment.confirmedBy = bendaharaId;
    payment.confirmationDate = new Date();
    await payment.save();

    res.status(200).json({
      msg: "Pembayaran berhasil dikonfirmasi.",
      payment,
      updatedMonths: targetMonths.map(m => ({ month: m.month, status: m.status }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server", error: error.message });
  }
};
