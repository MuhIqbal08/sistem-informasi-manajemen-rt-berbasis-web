const db = require("../models");
const User = db.User;

exports.verifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.session.userId,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Mohon login ke akun Anda!" });
    }

    req.userId = user.id;
    req.role = user.role;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.adminOnly = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.session.userId,
      },
    });

    if (!user) return res.status(404).json({ message: "Admin tidak ditemukan" });
    if (user.roleId !== 1) return res.status(403).json({ message: "Akses terlarang" });

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.ketuaOnly = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { uuid: req.session.userId } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (![1, 2, 3].includes(user.roleId)) {
      return res.status(403).json({ message: "Akses hanya untuk Ketua atau Wakil Ketua RT" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.sekretarisOnly = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { uuid: req.session.userId } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (![1, 4].includes(user.roleId)) {
      return res.status(403).json({ message: "Akses hanya untuk Sekretaris" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.bendaharaOnly = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { uuid: req.session.userId } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (![1, 5].includes(user.roleId)) {
      return res.status(403).json({ message: "Akses hanya untuk Bendahara" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.pengurusOnly = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { uuid: req.session.userId } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (![1, 2, 3, 4, 5, 6].includes(user.roleId)) {
      return res.status(403).json({ message: "Akses hanya untuk Pengurus" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
