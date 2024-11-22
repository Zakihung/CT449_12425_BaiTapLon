const TK = require("../models/TaiKhoan.model");
const DG = require("../models/DocGia.model");
const ApiError = require("../api-error");
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
    try {
        const { HoLot, Ten, TenTaiKhoan, DienThoai, MatKhau } = req.body;
        const IsNhanVien = false;
        const userExists = await TK.findOne({ $or: [{ TenTaiKhoan }, { DienThoai }] });
        if (userExists) {
            return res.status(400).json({ message: "Tên tài khoản hoặc số điện thoại đã tồn tại" });
        }
        const dg = new DG({ HoLot, Ten, DienThoai });
        await dg.save();
        const tk = new TK({ TenTaiKhoan, DienThoai, MatKhau, IsNhanVien, MaDocGia: dg.MaDocGia});
        await tk.save();
        res.status(201).json(tk);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể đăng ký tài khoản.")
        );
    }
}

exports.login = async (req, res, next) => {
    try {
        const { TenTaiKhoan, MatKhau } = req.body;

        const user = await TK.findOne({ TenTaiKhoan });
        if (!user) {
            return res.status(400).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
        }
        const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);
        
        if (!isMatch) {
            return res.status(400).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
        }

        res.status(200).json(user);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể đăng nhập tài khoản.")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name } = req.query;
        if (name) {
            documents = await TK.find({ TenTaiKhoan: new RegExp(name, 'i') });
        }
        else {
            documents = await TK.find();
        } 
        res.status(200).json(documents);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm thấy tài khoản")
        );
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const tk = await TK.findById(req.params.id);
        if (!tk) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).json(tk);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể lấy tài khoản")
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const tk = await TK.findByIdAndDelete(req.params.id);
        if (!tk) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).send({ message: "Đã xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa tài khoản")
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        await TK.deleteMany({});
        res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa tất cả tất cả tài khoản")
        );
    }
}

exports.findByMaDocGia = async (req, res, next) => {
    try {
        const { MaDocGia } = req.params;
        const tk= await TK.findOne({ MaDocGia });

        if (!tk) {
            return next(new ApiError(404, "Không tìm thấy tài khoản"));
        }

        res.status(200).json(tk);
    } catch (error) {
        return next(new ApiError(500, "Lỗi! Không thể tìm kiếm tài khoản"));
    }
};

exports.findByTenTK = async (req, res, next) => {
    try {
        const { TenTaiKhoan } = req.params;
        const tk= await TK.findOne({ TenTaiKhoan });

        if (!tk) {
            return next(new ApiError(404, "Không tìm thấy tài khoản"));
        }

        res.status(200).json(tk);
    } catch (error) {
        return next(new ApiError(500, "Lỗi! Không thể tìm kiếm tài khoản"));
    }
};

