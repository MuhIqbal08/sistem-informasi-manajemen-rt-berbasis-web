const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.User;
const Role = db.Role;

exports.login = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
    include: {
      model: Role,
      as: "role",
      attributes: ["name", "roleGroup"], 
    },
  });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.status(404).json({ msg: "Password salah" });

  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const username = user.username;
  const roleId = user.roleId;
  const roleName = user.role?.name;
  const roleGroup = user.role?.roleGroup;
  const jenis_kelamin = user.jenis_kelamin;
  const alamat = user.alamat;
  const no_telp = user.no_telp;
  const profilePicture = user.profilePicture;
  res.status(200).json({
    uuid,
    name,
    username,
    roleId,
    roleName,
    roleGroup,
    jenis_kelamin,
    alamat,
    no_telp,
    profilePicture,
  });
};

// Untuk cek apakah masih/sudah login
exports.getMe = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun anda" });
  }

  console.log("userId: ", req.session.userId);

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
    include: {
      model: Role,
      as: "role", 
      attributes: ["name", "roleGroup"],
    },
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json({...user.toJSON(), roleGroup: user.role?.roleGroup});
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "Tidak dapat logout" });
    res.status(200).json({ message: "Anda telah logout" });
  });
};
