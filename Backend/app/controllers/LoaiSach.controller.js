const LS = require("../models/LoaiSach.model");

const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const ls = new LS(req.body);
        console.log(ls);
        await ls.save();
        res.status(201).send(ls);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tạo loại sách.")
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const ls = await LS.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true, runValidators: true 
            });
        if (!ls) {
            return next(new ApiError(404, "Tài nguyên không tìm thấy"));
        }
        res.status(200).json(ls);
    } catch (error) {
        return next(
            new ApiError(400, "Lỗi! Không thể cập nhật loại sách")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name } = req.query;
        if (name) {
            documents = await LS.find({ TenLoaiSach: new RegExp(name, 'i') });
        }
        else {
            documents = await LS.find();
        } 
        res.status(200).json(documents);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm nhân viên")
        );
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const ls = await LS.findById(req.params.id);
        if (!ls) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).json(ls);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể lấy loại sách")
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const ls = await LS.findByIdAndDelete(req.params.id);
        if (!ls) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).send({ message: "Đã xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa loại sách")
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        await LS.deleteMany({});
        res.status(200).json({ message: "Xóa thành công tất cả loại sách" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa tất cả loại sách")
        );
    }
}

