const express = require("express");
const dotenv = require("dotenv");
const { getAgenda, getAgendaById, createAgenda, updateAgenda, deleteAgenda } = require("../controllers/agenda");
const { verifyUser, pengurusOnly } = require("../middleware/authUser");

dotenv.config();

const agendaRoutes = express.Router();

agendaRoutes.get('/agenda', getAgenda);
agendaRoutes.get('/agenda/:uuid', getAgendaById);
agendaRoutes.post('/agenda', verifyUser, pengurusOnly, createAgenda);
agendaRoutes.put('/agenda/:uuid', verifyUser, pengurusOnly, updateAgenda);
agendaRoutes.delete('/agenda/:uuid', verifyUser, pengurusOnly, deleteAgenda);

module.exports = agendaRoutes;
