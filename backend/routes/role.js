const express = require("express");
const dotenv = require("dotenv");
const { getRoles, getRolesById, createRoles, updateRoles, deleteRoles } = require("../controllers/role");
const { verifyUser, adminOnly, sekretarisOnly } = require("../middleware/authUser");


dotenv.config();

const roleRoute = express.Router();

roleRoute.get('/roles', verifyUser, sekretarisOnly, getRoles);
roleRoute.get('/roles/:id', verifyUser, sekretarisOnly, getRolesById);
roleRoute.post('/roles', verifyUser, adminOnly, createRoles);
roleRoute.put('/roles/:id', verifyUser, adminOnly, updateRoles);
roleRoute.delete('/roles/:id', verifyUser, adminOnly, deleteRoles);

module.exports = roleRoute;
