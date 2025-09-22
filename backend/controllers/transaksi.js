const { Op, fn, col, where } = require("sequelize");
const db = require("../models");
const Transaksi = db.Transaksi;

exports.getTransactions = async (req, res) => {
  try {
    const { type, bulan, tahun, search, page = 1, limit = 5 } = req.query;

    const whereCondition = {};

    // Filter tipe transaksi
    if (type) {
      whereCondition.type = type;
    }

    // Filter tahun & bulan
    if (tahun) {
      if (bulan && parseInt(bulan) !== 0) {
        const startDate = new Date(tahun, bulan - 1, 1);
        const endDate = new Date(tahun, bulan, 0, 23, 59, 59);
        whereCondition.date = { [Op.between]: [startDate, endDate] };
      } else {
        const startYear = new Date(tahun, 0, 1);
        const endYear = new Date(tahun, 11, 31, 23, 59, 59);
        whereCondition.date = { [Op.between]: [startYear, endYear] };
      }
    }

    // Filter search
    if (search) {
      whereCondition.category = { [Op.like]: `%${search}%` };
    }

    // Kalau ada search / filter date / type tampilkan semua data
    const isFilterActive = !!(search || bulan || tahun || type);
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const total = await Transaksi.count({ where: whereCondition });

    const transaksi = await Transaksi.findAll({
      attributes: [
        "transactionId",
        "type",
        "category",
        "amount",
        "date",
        "userId",
      ],
      where: whereCondition,
      order: [["date", "DESC"]],
      ...(isFilterActive
        ? {} // tanpa pagination kalau filter aktif
        : { limit: parseInt(limit), offset }),
    });

    res.status(200).json({
      data: transaksi,
      currentPage: isFilterActive ? 1 : parseInt(page),
      totalData: total,
      totalPages: isFilterActive ? 1 : Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTransactionsById = async (req, res) => {
  try {
    const transaksi = await Transaksi.findOne({
      attributes: ["transactionId", "type", "category", "amount", "date"],
      where: {
        transactionId: req.params.uuid,
      },
    });
    res.status(200).json(transaksi);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal mengambil data" });
  }
};

exports.getTotalJumlahTransaksiByMonth = async (req, res) => {
  try {
    const { type } = req.query;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (!type || (type !== "pemasukan" && type !== "pengeluaran")) {
      return res
        .status(400)
        .json({ message: 'Query "type" harus "pemasukan" atau "pengeluaran"' });
    }

    const totalBulanIni = await Transaksi.sum("amount", {
      where: {
        type,
        [Op.and]: [
          where(fn("MONTH", col("date")), currentMonth),
          where(fn("YEAR", col("date")), currentYear),
        ],
      },
    });

    const totalSemua = await Transaksi.sum("amount", {
      where: { type },
    });

    const totalPerBulan = await Transaksi.findAll({
      attributes: [
        [fn("MONTH", col("date")), "bulan"],
        [fn("YEAR", col("date")), "tahun"],
        [fn("SUM", col("amount")), "total"],
      ],
      where: { type },
      group: [fn("YEAR", col("date")), fn("MONTH", col("date"))],
      order: [
        [fn("YEAR", col("date")), "DESC"],
        [fn("MONTH", col("date")), "DESC"],
      ],
    });

    res.status(200).json({
      type,
      totalBulanIni: totalBulanIni || 0,
      totalSemua: totalSemua || 0,
      perBulan: totalPerBulan,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil data transaksi" });
  }
};

exports.getTransactionsByMonth = async (req, res) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  try {
    const transaksi = await Transaksi.findAll({
      where: {
        date: { [Op.between]: [start, end] },
      },
    });

    const pemasukan = transaksi
      .filter((t) => t.type === "pemasukan")
      .reduce((sum, t) => sum + t.amount, 0);

    const pengeluaran = transaksi
      .filter((t) => t.type === "pengeluaran")
      .reduce((sum, t) => sum + t.amount, 0);

    res.json({ pemasukan, pengeluaran });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Gagal mengambil data bulan ini" });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, userId } = req.body;
    const transaksi = await Transaksi.create({
      type,
      category,
      amount,
      date,
      userId,
    });
    res.status(200).json(transaksi);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal menambahkan transaksi" });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const transaksi = await Transaksi.findOne({
      where: {
        transactionId: req.params.uuid,
      },
    });

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    const { type, category, amount, date, userId } = req.body;
    await transaksi.update({
      type,
      category,
      amount,
      date,
      userId,
    });

    res.status(200).json(transaksi);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal mengedit transaksi" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaksi = await Transaksi.findOne({
      where: {
        transactionId: req.params.uuid,
      },
    });

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    await transaksi.destroy();
    res.status(200).json("Transaction Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal menghapus transaksi" });
  }
};
