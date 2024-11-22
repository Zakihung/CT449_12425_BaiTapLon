const NXB = require("../models/NhaXuatBan.model");

const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const nxb = new NXB(req.body);
        await nxb.save();
        res.status(201).send(nxb);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tạo nhà xuất bản.")
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const nxb = await NXB.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true, runValidators: true 
            });
        if (!nxb) {
            return next(new ApiError(404, "Tài nguyên không tìm thấy"));
        }
        res.status(200).json(nxb);
    } catch (error) {
        return next(
            new ApiError(400, "Lỗi! Không thể cập nhật nhà xuất bản")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name } = req.query;
        if (name) {
            documents = await NXB.find({ TenNXB: new RegExp(name, 'i') });
        }
        else {
            documents = await NXB.find();
        } 
        res.status(200).json(documents);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm nhà xuất bản")
        );
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const nxb = await NXB.findById(req.params.id);
        if (!nxb) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).json(nxb);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể lấy nhà xuất bản")
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const nxb = await NXB.findByIdAndDelete(req.params.id);
        if (!nxb) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).send({ message: "Đã xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa nhà xuất bản")
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        await NXB.deleteMany({});
        res.status(200).json({ message: "Xóa thành công tất cả nhà xuất bản" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa tất cả nhà xuất bản")
        );
    }
}

