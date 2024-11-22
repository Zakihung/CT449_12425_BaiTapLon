const NV = require("../models/NhanVien.model");
const TK = require("../models/TaiKhoan.model")

const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const { MSNV, HoTenNV, ChucVu, DienThoai, DiaChi, MatKhau } = req.body;
        const TenTaiKhoan = MSNV;
        const IsNhanVien = true;
        const tk = new TK({ TenTaiKhoan, DienThoai, MatKhau, IsNhanVien });
        await tk.save();
        const nv = new NV({ MSNV, HoTenNV, ChucVu, DienThoai, DiaChi });
        await nv.save();
        res.status(201).send(nv);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tạo nhân viên.")
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const nv = await NV.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true, runValidators: true 
            });
        if (!nv) {
            return next(new ApiError(404, "Tài nguyên không tìm thấy"));
        }
        res.status(200).json(nv);
    } catch (error) {
        return next(
            new ApiError(400, "Lỗi! Không thể cập nhật nhân viên")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name } = req.query;
        if (name) {
            documents = await NV.find({ HotenNV: new RegExp(name, 'i') });
        }
        else {
            documents = await NV.find();
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
        const nv = await NV.findById(req.params.id);
        if (!nv) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).json(nv);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm nhân viên")
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const nv = await NV.findByIdAndDelete(req.params.id);
        if (!nv) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).send({ message: "Đã xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa nhân viên")
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        await NV.deleteMany({});
        res.status(200).json({ message: "Xóa thành công tất cả nhân viên" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa tất cả nhân viên")
        );
    }
}

