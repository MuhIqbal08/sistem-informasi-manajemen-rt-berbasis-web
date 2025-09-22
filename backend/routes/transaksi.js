const express = require("express");
const dotenv = require("dotenv");
const { getTransactions, getTransactionsById, createTransaction, getTotalJumlahTransaksiByMonth, editTransaction, deleteTransaction } = require("../controllers/transaksi");
const { verifyUser, adminOnly, bendaharaOnly } = require("../middleware/authUser");

dotenv.config();

const transaksiRoutes = express.Router();

transaksiRoutes.get('/transaksi', verifyUser, getTransactions);
transaksiRoutes.get('/transaksi/:uuid', verifyUser, getTransactionsById);
transaksiRoutes.post('/transaksi', verifyUser, bendaharaOnly, createTransaction);
transaksiRoutes.get('/transaksi/total/bulanan', verifyUser, getTotalJumlahTransaksiByMonth);
transaksiRoutes.put('/transaksi/:uuid', verifyUser, bendaharaOnly, editTransaction);
transaksiRoutes.delete('/transaksi/:uuid', verifyUser, bendaharaOnly, deleteTransaction);

module.exports = transaksiRoutes;
