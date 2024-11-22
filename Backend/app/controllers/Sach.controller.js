const S = require("../models/Sach.model");
const LS = require("../models/LoaiSach.model");
const NXB = require("../models/NhaXuatBan.model")

const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const { MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia, TenLoaiSach, HinhAnh, MoTaSach, LaiSuat } = req.body;

        const newSach = new S({ MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia, TenLoaiSach, HinhAnh, MoTaSach, LaiSuat });
        await newSach.save();
        res.status(201).json(newSach);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tạo sách.")
        );
    }
}

exports.updateSoQuyen = async (req, res, next) => {
    try {
        const { MaSach, SoQuyen } = req.body;

        const s = await S.findOneAndUpdate({ MaSach }, { SoQuyen }, { new: true, runValidators: true });
        if (!s) {
            return res.status(404).json({ message: "Không tìm thấy sách" });
        }

        res.status(200).json(s);
    } catch (error) {
        return next(
            new ApiError(400, "Lỗi! Không thể thực hiện.")
        );
    }

}

exports.update = async (req, res, next) => {
    try {
        const s = await S.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true, runValidators: true 
            });
        if (!s) {
            return next(new ApiError(404, "Tài nguyên không tìm thấy"));
        }
        res.status(200).json(s);
    } catch (error) {
        return next(
            new ApiError(400, "Lỗi! Không thể cập nhật sách")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name } = req.query;
        if (name) {
            documents = await S.find({ TenSach: new RegExp(name, 'i') });
        }
        else {
            documents = await S.find();
        } 
        res.status(200).json(documents);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm thấy sách")
        );
    }
}

exports.findName = async (req, res, next) => {
    try {
        const name = await req.params.name;
        const s = await S.find({
            $or: [
            { TenSach: { $regex: new RegExp(name, 'i') } },
            { MoTaSach: { $regex: new RegExp(name, 'i') } },
            ],
        });
        res.status(201).json(s);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm thấy sách")
        );
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const s = await S.findById(req.params.id);
        if (!s) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).json(s);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể lấy sách")
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const s = await S.findByIdAndDelete(req.params.id);
        if (!s) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).send({ message: "Đã xóa thành công" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa sách")
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        await S.deleteMany({});
        res.status(200).json({ message: "Xóa thành công tất cả sách" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa tất cả sách")
        );
    }
}

exports.getLimit = async (req, res, next) => {
    try {
        const s = await S.find().limit(6);
        if (!s) { 
            return next(
                new ApiError(404, "Tài nguyên không tìm thấy")
            );
        }
        res.status(200).json(s);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể lấy sách")
        );
    }
}

exports.getCategoryBook = async (req, res, next) => {
    try {
        var arrayProduct;
        const nxb = await NXB.findOne({TenNXB: req.params.name});
        if (nxb) {
            arrayProduct = await S.find({MaNXB: nxb.MaNXB});
        }
        else {
            if (req.params.name === "Tất Cả Sách") {
                arrayProduct = await S.find({});
            } 
            else {
                const ls = await LS.findOne({TenLoaiSach: req.params.name});
                if (ls) {
                    arrayProduct = await S.find({ TenLoaiSach: req.params.name });
                }
                else {
                    arrayProduct = await S.find({TacGia: req.params.name});
                }
            }
        }
        

        res.status(200).json(arrayProduct);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể lấy sách")
        );
    }
}

exports.findByMaSach = async (req, res, next) => {
    try {
        const { MaSach } = req.params;
        const sach = await S.findOne({ MaSach });

        if (!sach) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }

        res.status(200).json(sach);
    } catch (error) {
        return next(new ApiError(500, "Lỗi! Không thể tìm kiếm sách"));
    }
};



