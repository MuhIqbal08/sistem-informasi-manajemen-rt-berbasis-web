const express = require('express');

const { createGaleri, getAllGaleri, getGaleriById, getGambarById, updateGaleri, deleteGaleri } = require('../controllers/galeri.js');
const upload = require('../middleware/upload.js');
const { verifyUser, pengurusOnly } = require('../middleware/authUser.js');

const galeriRouter = express.Router();

galeriRouter.post('/galeri', verifyUser, pengurusOnly, upload.array('images'), createGaleri);
galeriRouter.get('/galeri', getAllGaleri);
galeriRouter.get('/galeri/:uuid',  getGaleriById);
galeriRouter.get('/galeri/gambar/:uuid', getGambarById);
galeriRouter.put('/galeri/:uuid', verifyUser, pengurusOnly, updateGaleri);
galeriRouter.delete('/galeri/:uuid', verifyUser, pengurusOnly, deleteGaleri);

module.exports = galeriRouter;
