const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const kasMonth = db.KasMonth;
const kasYear = db.KasYear;
const { Op } = require("sequelize");

exports.getUsers = async (req, res) => {
  const { page = 1, limit = 15, order = "asc", search = "" } = req.query;
  const offset = (page - 1) * limit;

  try {
    const whereCondition = search
      ? { name: { [Op.like]: `%${search}%` } }
      : {};

    const totalUsers = await User.count({ where: whereCondition });

    const users = await User.findAll({
      where: whereCondition,
      attributes: [
        "uuid",
        "name",
        "username",
        "roleId",
        "jenis_kelamin",
        "alamat",
        "no_telp",
        "profilePicture",
      ],
      include: {
        model: Role,
        as: "role",
        attributes: ["name", "roleGroup"],
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["name", order]],
    });

    res.status(200).json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};


exports.getUsersById = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: [
        "uuid",
        "name",
        "username",
        "roleId",
        "jenis_kelamin",
        "alamat",
        "no_telp",
        "profilePicture",
      ],
      where: {
        uuid: req.params.uuid,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting user" });
  }
};

exports.createUser = async (req, res) => {
  const {
    name,
    username,
    password,
    confirmPassword,
    roleId,
    jenis_kelamin,
    alamat,
    no_telp,
    profilePicture,
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ msg: "Username sudah digunakan!" });
    }

    if (!password) {
      return res.status(400).json({ msg: "Masukkan Password!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password dan Confirm Password Tidak Sama!" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      username,
      password: hashPassword,
      roleId,
      jenis_kelamin,
      alamat,
      no_telp,
      profilePicture,
    });

    // Menambahkan otomatis kasMonth untuk semua tahun yang sudah ada
    if (roleId == 7) { // hanya jika rolenya adalah warga
      const kasYears = await kasYear.findAll();
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];

      const kasMonthData = [];

      for (const year of kasYears) {
        for (const month of months) {
          kasMonthData.push({
            month,
            kasYearId: year.uuid,
            userId: newUser.uuid,
          });
        }
      }

      await kasMonth.bulkCreate(kasMonthData);
    }

    res.status(201).json({ msg: "Pendaftaran User Berhasil!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


exports.updateUser = async (req, res) => {
  const user = await User.findOne({ where: { uuid: req.params.uuid } });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  const {
    name,
    username,
    password,
    confirmPassword,
    roleId,
    jenis_kelamin,
    alamat,
    no_telp,
    profilePicture,
  } = req.body;

  let hashPassword = user.password;

  if (password && password !== "") {
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password doesn't match" });
    }
    const salt = await bcrypt.genSalt();
    hashPassword = await bcrypt.hash(password, salt);
  }

  try {
    await User.update(
      {
        name,
        username,
        password: hashPassword,
        roleId,
        jenis_kelamin,
        alamat,
        no_telp,
        profilePicture,
      },
      {
        where: { uuid: req.params.uuid },
      }
    );

    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: req.params.uuid } });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ msg: "Password lama salah" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await user.update({ password: hashPassword });

    res.status(200).json({ msg: "Password berhasil diubah" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};


exports.deleteUser = async (req, res) => {
  const user = await User.findOne({ where: { uuid: req.params.uuid } });

  if (!user) return res.status(404).json({ msg: "User not found" });

  try {
    // Hapus kasMonth yang terkait user ini
    await kasMonth.destroy({ where: { userId: user.uuid } });

    // Baru hapus user
    await user.destroy();

    res.status(200).json({ msg: "User Deleted beserta data kasMonth-nya" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ msg: "Username tidak ditemukan" });
    }

    const defaultPassword = "1234"; // default password baru
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(defaultPassword, salt);

    await user.update({ password: hashPassword });

    res.status(200).json({ 
      msg: "Password berhasil direset. Gunakan password default: 1234" 
    });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};