const DG = require("../models/DocGia.model");

const ApiError = require("../api-error");

//update theo mã đọc giả (MaDocGia)
exports.updateMaDocGia = async (req, res, next) => {
    try {
        const { MaDocGia } = req.params;
        const updates = req.body;

        const updatedDocGia = await DG.findOneAndUpdate({ MaDocGia }, updates, { new: true, runValidators: true });
        if (!updatedDocGia) {
            return res.status(404).json({ message: "Không tìm thấy độc giả" });
        }

        res.status(200).json(updatedDocGia);
    } catch (error) {
        return next(
            new ApiError(400, "Lỗi! Không thể thực hiện.")
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const updatedDocGia = await DG.findOneAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!updatedDocGia) {
            return res.status(404).json({ message: "Không tìm thấy độc giả" });
        }

        res.status(200).json(updatedDocGia);
    } catch (error) {
        return next(
            new ApiError(400, "Lỗi! Không thể thực hiện.")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { HoLot, Ten } = req.query;
        if (HoLot || Ten) {
            if (HoLot) {
                documents.HoLot = await DG.find({ HoLot: new RegExp(HoLot, 'i') });
            }
            if (Ten) {
                documents.Ten = await DG.find({ Ten: new RegExp(Ten, 'i') });
            }
        }
        else {
            documents = await DG.find();
        } 
        res.status(200).json(documents);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm tất cả độc giả")
        );
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const dg = await DG.findById(req.params.id);
        if (!dg) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).json(dg);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm độc giả")
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const dg = await DG.findByIdAndDelete(req.params.id);
        if (!dg) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).send({ message: "Đã xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa độc giả")
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        await DG.deleteMany({});
        res.status(200).json({ message: "Xóa thành công tất cả nhà xuất bản" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa tất cả nhà xuất bản")
        );
    }
}

exports.findByMaDocGia = async (req, res, next) => {
    try {
        const { MaDocGia } = req.params;
        const dg = await DG.findOne({ MaDocGia });

        if (!dg) {
            return next(new ApiError(404, "Không tìm thấy độc giả"));
        }

        res.status(200).json(dg);
    } catch (error) {
        return next(new ApiError(500, "Lỗi! Không thể tìm kiếm độc giả"));
    }
};