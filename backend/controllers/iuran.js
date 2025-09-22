const db = require("../models");
const Iuran = db.Iuran

exports.getIuran = async(req, res) => {
    try {
        const iuran = await Iuran.findAll()
        res.status(200).json(iuran)
    } catch (error) {
        console.log(error)
    }
}

exports.getIuranById = async(req, res) => {
    try {
        const iuran = await Iuran.findOne({
            where: {
                duesId: req.params.id
            }
        })
        res.status(200).json(iuran)
    } catch (error) {
        console.log(error)
    }
}

exports.createIuran = async(req, res) => {
    try {
        const { userId, month, year, amount, status, paidAt  } = req.body
        const iuran = await Iuran.create({
            userId,
            month,
            year,
            amount,
            status,
            paidAt
        })
        res.status(200).json(iuran)
    } catch (error) {
        console.log(error)
    }
}

exports.editIuran = async(req, res) => {
    const iuran = await Iuran.findOne({
        where: {
            duesId: req.params.id
        }
    })
    try {
        const { userId, month, year, amount, status, paidAt  } = req.body
        await iuranIuran.update({
            userId,
            month,
            year,
            amount,
            status,
            paidAt
        })
        res.status(200).json(iuran)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteIuran = async(req, res) => {
    try {
        const iuran = await Iuran.findOne({
            where: {
                duesId: req.params.id
            }
        })
        await iuran.destroy()
        res.status(200).json("Iuran Deleted")
    } catch (error) {
        console.log(error)
    }
}
