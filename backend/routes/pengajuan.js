const express = require("express");
const dotenv = require("dotenv");
const { getPengajuan, getPengajuanById, getPengajuanByUserId, createPengajuan, editPengajuan, deletePengajuan } = require("../controllers/pengajuan");
const { verifyUser, ketuaOnly, adminOnly } = require("../middleware/authUser");


dotenv.config();

const pengajuanRoute = express.Router();

pengajuanRoute.get('/pengajuan', verifyUser, getPengajuan);
pengajuanRoute.get('/pengajuan/list/:userId/:uuid', verifyUser, getPengajuanById);
pengajuanRoute.get('/pengajuan/list/:userId', verifyUser, getPengajuanByUserId);
pengajuanRoute.post('/pengajuan', verifyUser, createPengajuan);
pengajuanRoute.put('/pengajuan/:uuid', verifyUser, ketuaOnly, editPengajuan);
pengajuanRoute.delete('/pengajuan/:uuid', verifyUser, ketuaOnly, deletePengajuan);

module.exports = pengajuanRoute;
