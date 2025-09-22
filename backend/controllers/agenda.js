const db = require("../models");
const Agenda = db.Agenda;

exports.createAgenda = async (req, res) => {
  try {
    const { userId, title, deskripsi, tanggal, waktu, lokasi } = req.body;
    const newAgenda = await Agenda.create({
      userId,
      title,
      deskripsi,
      tanggal,
      waktu,
      lokasi
    });
    res.status(200).json(newAgenda);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal membuat agenda" });
  }
};

exports.getAgenda = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const sortOrder = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  try {
    const { count, rows } = await Agenda.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', sortOrder]],
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      agenda: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal mengambil data agenda" });
  }
};

exports.getAgendaById = async (req, res) => {
  try {
    const agenda = await Agenda.findOne({
      where: {
        uuid: req.params.uuid
      }
    });
    res.status(200).json(agenda);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal mengambil agenda" });
  }
};

exports.updateAgenda = async (req, res) => {
  try {
    const { title, deskripsi, tanggal, waktu, lokasi, userId } = req.body;

    const agenda = await Agenda.findOne({
      where: {
        uuid: req.params.uuid
      }
    });

    if (!agenda) return res.status(404).json({ message: "Agenda tidak ditemukan" });

    await agenda.update({
      title,
      deskripsi,
      tanggal,
      waktu,
      lokasi,
      userId
    });

    res.status(200).json(agenda);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAgenda = async (req, res) => {
  try {
    const agenda = await Agenda.findOne({
      where: {
        uuid: req.params.uuid
      }
    });

    if (!agenda) return res.status(404).json({ message: "Agenda tidak ditemukan" });

    await agenda.destroy();
    res.status(200).json("Agenda berhasil dihapus");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal menghapus agenda" });
  }
};
