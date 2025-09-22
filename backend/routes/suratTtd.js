const express = require("express");
const dotenv = require("dotenv");
const { verifyUser, adminOnly } = require("../middleware/authUser");
const { getSuratTtdById } = require("../controllers/SuratTtd");


dotenv.config();

const suratTtdRoute = express.Router();

suratTtdRoute.get('/suratTtd/:suratId', verifyUser, getSuratTtdById);

module.exports = suratTtdRoute;
