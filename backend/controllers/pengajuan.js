const db = require("../models");
const Pengajuan = db.Pengajuan;
const SuratTtd = db.SuratTtd
const User = db.User;
const path = require('path');

exports.getPengajuan = async (req, res) => {
  try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const sortOrder = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        try {
            const { count, rows } = await Pengajuan.findAndCountAll({
                limit: limit,
                offset: offset,
                order: [['createdAt', sortOrder]],
            });
    
            res.status(200).json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                pengajuan: rows,
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getPengajuanById = async (req, res) => {
  try {
    const pengajuan = await Pengajuan.findOne({
      attributes: [
        "uuid",
        "userId",
        "nama",
        "ttl",
        "jenisKelamin",
        "alamat",
        "nomorKtp",
        "kewarganegaraan",
        "agama",
        "statusPerkawinan",
        "pekerjaan",
        "statusPengajuan",
        "ttd",
        "keperluan",
        "keperluanId",
        "createdAt",
        "updatedAt"
      ],
      where: {
        userId: req.params.userId,
        uuid: req.params.uuid,
      },
      raw: true,
    });
    res.status(200).json(pengajuan);
  } catch (error) {
    console.log(error);
  }
};

exports.getPengajuanByUserId = async (req, res) => {
  try {
    const pengajuan = await Pengajuan.findAll({
      attributes: [
        "uuid",
        "userId",
        "nama",
        "ttl",
        "jenisKelamin",
        "alamat",
        "nomorKtp",
        "kewarganegaraan",
        "agama",
        "statusPerkawinan",
        "pekerjaan",
        "statusPengajuan",
        "ttd",
        "keperluan",
        "keperluanId",
        "createdAt",
        "updatedAt"
      ],
      where: {
        userId: req.params.userId,
      },
    });
    res.status(200).json(pengajuan);
  } catch (error) {
    console.log(error);
  }
};

exports.createPengajuan = async (req, res) => {
  const {
    userId,
    nama,
    ttl,
    jenisKelamin,
    alamat,
    nomorKtp,
    kewarganegaraan,
    agama,
    statusPerkawinan,
    pekerjaan,
    statusPengajuan,
    ttd,
    keperluan,
    keperluanId
  } = req.body;
  try {
    const pengajuan = await Pengajuan.create({
      userId,
      nama,
      ttl,
      jenisKelamin,
      alamat,
      nomorKtp,
      kewarganegaraan,
      agama,
      statusPerkawinan,
      pekerjaan,
      statusPengajuan,
      ttd,
      keperluan,
      keperluanId
    });
    res.status(200).json(pengajuan);
  } catch (error) {
    console.log(error);
  }
};


exports.editPengajuan = async (req, res) => {
  const t = await Pengajuan.sequelize.transaction();
  try {
    const pengajuan = await Pengajuan.findOne({
      where: { uuid: req.params.uuid },
    });

    if (!pengajuan) {
      return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
    }

    const { statusPengajuan } = req.body;

    // Memasukan statusPengajuan sesuai enum
    if (!["Belum ACC", "Sudah ACC", "Tidak ACC"].includes(statusPengajuan)) {
      return res.status(400).json({ message: "Status pengajuan tidak valid" });
    }

    await Pengajuan.update(
      { statusPengajuan },
      { where: { uuid: req.params.uuid }, transaction: t }
    );

    // Kalau ACC, buat SuratTtd
    if (statusPengajuan === "Sudah ACC") {
      const tahunSekarang = new Date().getFullYear();
      const noRt = 2;

      // Ambil rtId dari user yang roleId = 2
      const rtUser = await User.findOne({
        where: { roleId: 2 },
        attributes: ['uuid'],
        transaction: t
      });

      if (!rtUser) {
        throw new Error("User RT tidak ditemukan");
      }

      // Hitung nomor urut tahun ini
      const count = await SuratTtd.count({
        where: { tahunSurat: tahunSekarang },
        transaction: t
      });

      const nomorSurat = count + 1;

      // Gambar ttd bawaan
      const ttdImagePath = '/uploads/ttd.png'; 

      await SuratTtd.create({
        suratId: pengajuan.uuid,
        rtId: rtUser.uuid,
        nomorSurat,
        noRt,
        tahunSurat: tahunSekarang,
        ttdImage: ttdImagePath
      }, { transaction: t });
    }

    await t.commit();
    res.status(200).json({ message: "Pengajuan berhasil diperbarui" });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengedit pengajuan" });
  }
};

exports.deletePengajuan = async (req, res) => {
  const pengajuan = await Pengajuan.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  try {
    await pengajuan.destroy();
    req.status(200).json("Pengajuan Deleted");
  } catch (error) {
    console.log(error);
  }
};
