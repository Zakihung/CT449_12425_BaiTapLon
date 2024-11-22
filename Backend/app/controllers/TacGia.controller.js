const TG = require("../models/TacGia.model");

const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const tg = new TG(req.body);
        console.log(tg);
        await tg.save();
        res.status(201).send(tg);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tạo loại tác giả.")
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const tg = await TG.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true, runValidators: true 
            });
        if (!tg) {
            return next(new ApiError(404, "Tài nguyên không tìm thấy"));
        }
        res.status(200).json(tg);
    } catch (error) {
        return next(
            new ApiError(400, "Lỗi! Không thể cập nhật loại tác giả")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name } = req.query;
        if (name) {
            documents = await TG.find({ TenTacGia: new RegExp(name, 'i') });
        }
        else {
            documents = await TG.find();
        } 
        res.status(200).json(documents);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm tác giả")
        );
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const tg = await TG.findById(req.params.id);
        if (!tg) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).json(tg);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể lấy loại tác giả")
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const tg = await TG.findByIdAndDelete(req.params.id);
        if (!tg) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).send({ message: "Đã xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa loại tác giả")
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        await TG.deleteMany({});
        res.status(200).json({ message: "Xóa thành công tất cả loại tác giả" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa tất cả loại tác giả")
        );
    }
}

