const db = require("../models");
const { Sequelize } = db;
const Galeri = db.Galeri;
const Gambar = db.Gambar;
const fs = require("fs");
const path = require("path");

exports.createGaleri = async (req, res) => {
  try {
    const { judul } = req.body;
    const files = req.files;

    const galeri = await Galeri.create({ judul });

    for (const file of files) {
      await Gambar.create({
        filename: file.filename,
        galeriId: galeri.id
      });
    }

    res.status(201).json({ message: "Galeri berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat galeri", error });
  }
};

exports.getAllGaleri = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const sortOrder = req.query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";

  try {
    const { count, rows } = await Galeri.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", sortOrder]],
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM \`${Gambar.getTableName()}\` AS Gambar
              WHERE Gambar.galeriId = Galeri.id
            )`),
            "totalGambar"
          ]
        ]
      }
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      galeri: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data galeri",
      error: error.message
    });
  }
};

exports.getGambarById = async (req, res) => {
  try {
    const gambar = await Gambar.findAll({
      where: { galeriId: req.params.uuid }
    });

    if (!gambar) return res.status(404).json({ message: "Gambar tidak ditemukan" });

    res.status(200).json(gambar);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data gambar", error });
  }
};
exports.getGaleriById = async (req, res) => {
  try {
    const galeri = await Galeri.findOne({
      where: {
        uuid: req.params.uuid
      }
  });

    if (!galeri) return res.status(404).json({ message: "Galeri tidak ditemukan" });

    res.status(200).json(galeri);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data galeri", error });
  }
};


exports.updateGaleri = async (req, res) => {
  try {
    const galeri = await Galeri.findOne({
      where: { uuid: req.params.uuid }
    });

    if (!galeri) return res.status(404).json({ message: "Galeri tidak ditemukan" });

    const { judul } = req.body;
    galeri.judul = judul || galeri.judul;
    await galeri.save();

    res.status(200).json({ message: "Galeri berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui galeri", error });
  }
};

exports.deleteGaleri = async (req, res) => {
  try {
    const galeri = await Galeri.findOne({
      where: { uuid: req.params.uuid },
      include: [{ model: Gambar, as: "gambar" }]
    });

    if (!galeri) return res.status(404).json({ message: "Galeri tidak ditemukan" });

    // Hapus gambar dari folder
    for (const img of galeri.gambar) { 
      const filePath = path.join('public', 'images', img.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Hapus dari Database
    await Gambar.destroy({ where: { galeriId: galeri.id } });
    await galeri.destroy();

    res.status(200).json({ message: "Galeri dan gambar-gambarnya berhasil dihapus" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Gagal menghapus galeri", error });
  }
};


