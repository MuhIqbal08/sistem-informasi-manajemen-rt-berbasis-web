const express = require("express");
const dotenv = require("dotenv");
const { login, getMe, logout } = require("../controllers/auth");

dotenv.config();

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.get("/me", getMe);
authRoute.delete("/logout", logout);

module.exports = authRoute;
