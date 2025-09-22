const express = require("express");
const dotenv = require("dotenv");
const { getPengumuman, getPengumumanById, createPengumuman, updatePengumuman, deletePengumuman } = require("../controllers/pengumuman");
const { verifyUser, pengurusOnly } = require("../middleware/authUser");


dotenv.config();

const pengumumanRoutes = express.Router();

pengumumanRoutes.get('/pengumuman', getPengumuman);
pengumumanRoutes.get('/pengumuman/:uuid', getPengumumanById);
pengumumanRoutes.post('/pengumuman', verifyUser, pengurusOnly, createPengumuman);
pengumumanRoutes.put('/pengumuman/:uuid', verifyUser, pengurusOnly, updatePengumuman);
pengumumanRoutes.delete('/pengumuman/:uuid', verifyUser, pengurusOnly, deletePengumuman);

module.exports = pengumumanRoutes;
