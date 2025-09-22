const express = require("express");
const dotenv = require("dotenv");
const { addKasYearWithMonths, getKasYearByUserId, getKasYearByMonthId, getKasYear } = require("../controllers/kasMonthYear");
const { verifyUser, bendaharaOnly, adminOnly } = require("../middleware/authUser");


dotenv.config();

const kasYearRoute = express.Router();

kasYearRoute.post("/kasyear", addKasYearWithMonths);
kasYearRoute.get("/kasyear/:userId/:kasYear",  getKasYearByUserId);
kasYearRoute.get("/kasmonth/:kasMonthId", getKasYearByMonthId);
kasYearRoute.get("/kasyear", verifyUser, getKasYear);

module.exports = kasYearRoute;
