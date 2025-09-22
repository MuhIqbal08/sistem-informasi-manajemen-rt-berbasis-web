
const { Sequelize } = require("sequelize");
const db = require("../models");
const User = db.User;
const kasMonth = db.KasMonth;
const kasYear = db.KasYear;

exports.addKasYearWithMonths = async (req, res) => {
  try {
    const { year } = req.body;

    if (!year) {
      return res.status(400).json({ message: "Tahun wajib diisi." });
    }

    // Cek apakah tahun sudah ada
    const existing = await kasYear.findOne({ where: { year } });
    if (existing) {
      return res.status(400).json({ message: "Tahun sudah ada." });
    }

    // Buat tahun
    const newYear = await kasYear.create({ year });

    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];

    // Ambil semua user dengan role warga
    const users = await User.findAll({ where: { roleId: 7 } });

    const allMonthData = [];

    for (const user of users) {
      for (const month of months) {
        allMonthData.push({
          month,
          kasYearId: newYear.uuid,
          userId: user.uuid,
        });
      }
    }

    await kasMonth.bulkCreate(allMonthData);

    return res.status(201).json({
      message: "Tahun dan bulan berhasil dibuat untuk semua user",
      year: newYear.year,
      userCount: users.length,
      totalKasMonthsCreated: allMonthData.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.getKasYearByUserId = async (req, res) => {
  const month = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  try {
    const kasMonths = await kasMonth.findAll({
      where: {
        userId: req.params.userId,
        kasYearId: req.params.kasYear
      },
      order: [
        ['userId', 'ASC'],
        [Sequelize.literal(`FIELD(month, ${month.map(b => `'${b}'`).join(',')})`), 'ASC']
      ]
    });
    res.status(200).json(kasMonths);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getKasYearByMonthId = async (req, res) => {
  try {
    const month = await kasMonth.findOne({
      where: { uuid: req.params.kasMonthId }
    });
    res.status(200).json(month);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getKasYear = async (req, res) => {
  try {
    const year = await kasYear.findAll();
    res.status(200).json(year);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
