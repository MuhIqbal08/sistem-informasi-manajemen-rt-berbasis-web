const db = require("../models");
const SuratTtd = db.SuratTtd

exports.getSuratTtdById = async (req, res) => {
    try {
        const suratTtd = await SuratTtd.findOne({
            where: {
                suratId: req.params.suratId,
            },
        });
        res.status(200).json(suratTtd);
    } catch (error) {
        console.log(error);
    }
};