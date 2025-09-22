const { where } = require("sequelize");
const db = require("../models");
const Pengumuman = db.Pengumuman;

exports.createPengumuman = async(req, res) => {
    try {
        const { judul, deskripsi, userId } = req.body;
        const pengumuman = await Pengumuman.create({
            userId,
            judul,
            deskripsi,
        });
        res.status(200).json(pengumuman);
    } catch (error) {
        console.log(error);
    }
}

exports.getPengumuman = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const sortOrder = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        try {
            const { count, rows } = await Pengumuman.findAndCountAll({
                limit: limit,
                offset: offset,
                order: [['createdAt', sortOrder]],
            });
    
            res.status(200).json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                pengumuman: rows,
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getPengumumanById = async(req, res) => {
    try {
        const pengumuman = await Pengumuman.findOne({
            where: {
                uuid: req.params.uuid
            }
        })
        res.status(200).json(pengumuman)
    } catch (error) {
        console.log(error)
    }
}

exports.updatePengumuman = async(req, res) => {
    try {
        const { judul, deskripsi } = req.body;
        const pengumuman = await Pengumuman.findOne({
            where: {
                uuid: req.params.uuid
            }
        });
        await Pengumuman.update({
            judul,
            deskripsi,
        }, {
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(200).json(pengumuman);
    } catch (error) {
        console.log(error);
    }
}

exports.deletePengumuman = async(req, res) => {
    try {
        const pengumuman = await Pengumuman.findOne({
            where: {
                uuid: req.params.uuid
            }
        });
        await pengumuman.destroy();
        res.status(200).json("Pengumuman Deleted");
    } catch (error) {
        console.log(error);
    }
}