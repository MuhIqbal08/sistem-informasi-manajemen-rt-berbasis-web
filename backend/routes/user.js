const express = require('express');
const dotenv = require('dotenv');

const { verifyUser, adminOnly, sekretarisOnly } = require('../middleware/authUser.js');
const { getUsers, getUsersById, createUser, updateUser, deleteUser, resetPassword, changePassword } = require('../controllers/user.js');

dotenv.config();

const userRoute = express.Router();

userRoute.get('/users', verifyUser, getUsers);
userRoute.get('/users/:uuid', verifyUser, getUsersById);
userRoute.post('/users', verifyUser, sekretarisOnly, createUser);
userRoute.put('/users/:uuid', verifyUser, sekretarisOnly, updateUser);
userRoute.put('/users/ubah-password/:uuid', verifyUser, changePassword);
userRoute.post("/users/reset-password", resetPassword);
userRoute.delete('/users/:uuid', verifyUser, sekretarisOnly, deleteUser);

module.exports = userRoute;
