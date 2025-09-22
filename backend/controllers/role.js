const db = require("../models");
const Role = db.Role; // ✅ ambil model Role dari objek db

exports.getRoles = async (req, res) => {
  const { page = 1, limit = 15, order = "asc" } = req.query;
  const offset = (page - 1) * limit;
  try {
    const totalRoles = await Role.count();
    const roles = await Role.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", order]],
    });
    res
      .status(200)
      .json({
        roles,
        totalRoles,
        totalPages: Math.ceil(totalRoles / limit),
        currentPage: parseInt(page),
      });
  } catch (error) {
    console.log(error);
  }
};

exports.getRolesById = async (req, res) => {
  try {
    const role = await Role.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(role);
  } catch (error) {
    console.log(error);
  }
};

exports.createRoles = async (req, res) => {
  const { name, roleGroup } = req.body;
  try {
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ msg: "Role already exists" });
    }
    await Role.create({ name, roleGroup });
    res.status(201).json({ msg: "Role Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.updateRoles = async (req, res) => {
  const { name, roleGroup } = req.body;

  try {
    const role = await Role.findOne({ where: { id: req.params.id } });
    if (!role) return res.status(404).json({ msg: "Role not found" });

    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole && existingRole.id !== role.id) {
      return res.status(400).json({ msg: "Role already exists" });
    }

    await Role.update({ name, roleGroup }, { where: { id: role.id } });
    res.status(200).json({ msg: "Role Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteRoles = async (req, res) => {
  try {
    const role = await Role.findOne({ where: { id: req.params.id } });
    if (!role) return res.status(404).json({ msg: "Role not found" });

    await Role.destroy({ where: { id: role.id } });
    res.status(200).json({ msg: "Role Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

