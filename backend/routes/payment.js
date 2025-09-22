const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const { createPayment, getPayment, getPaymentByUserId, confirmPayment, confirmPaymentOffline } = require("../controllers/kasPayment");
const { verifyUser, bendaharaOnly } = require("../middleware/authUser");


dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const paymentRoute = express.Router();

paymentRoute.post("/payment", upload.single("buktiPembayaran"), verifyUser, createPayment);
paymentRoute.post("/payment/offline/:monthId", verifyUser, bendaharaOnly, confirmPaymentOffline);
paymentRoute.get("/payment", verifyUser, getPayment);
paymentRoute.get("/payment/:id", verifyUser, getPaymentByUserId);
paymentRoute.put("/payment/:id/:monthId", verifyUser, bendaharaOnly, confirmPayment);

module.exports = paymentRoute;
