const TDMS = require("../models/TheoDoiMuonSach.model");
const S = require("../models/Sach.model")

const ApiError = require("../api-error");

exports.loan = async (req, res, next) => {
    try {
        const { MaDocGia, MaSach, SoNgayMuon, SoLuong } = req.body;
        const s = await S.findOne({ MaSach }); 
        
        
        if (!s) {
            return res.status(400).json({ message: "Không tìm thấy sách" }); 
        }
        const LaiSuat = s.LaiSuat;
        if (s.SoQuyen < SoLuong) {
            return res.status(400).json({ message: "Không đủ số lượng quyển để mượn" });
        }
        function roundToThousands(number) {
            return Math.round(number / 1000) * 1000; 
        }

        let GiaSauMuon;
        const originalPrice = s.DonGia;
        if (SoNgayMuon<=7) {
            GiaSauMuon = originalPrice;
        }
        else {
            const temp = SoNgayMuon - 7;
            GiaSauMuon = (originalPrice*Math.pow((1 + LaiSuat/100), temp))*SoLuong;
            GiaSauMuon = roundToThousands(GiaSauMuon);
        }
        const TrangThaiTT = false;
        const tdms = new TDMS({ MaDocGia, MaSach, SoNgayMuon, SoLuong, GiaSauMuon, TrangThaiTT });
        await tdms.save();
        res.status(201).json(tdms);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể thực hiện.")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name } = req.query;
        if (name) {
            documents = await TDMS.find({ TenNXB: new RegExp(name, 'i') });
        }
        else {
            documents = await TDMS.find();
        } 
        res.status(200).json(documents);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể tìm")
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        await TDMS.deleteMany({});
        res.status(200).json({ message: "Xóa thành công tất cả" });
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể xóa tất cả")
        );
    }
}

exports.pay = async (req, res, next) => {
    const { MaDocGia, MaSach } = req.body;
    try {
        const NgayHienTai = new Date();
        const NgayTra = new Date(NgayHienTai);
        const tdms = await TDMS.find({ MaDocGia: MaDocGia, MaSach: MaSach });
        NgayTra.setDate(NgayTra.getDate() + tdms.SoNgayMuon);
        const TrangThaiTT = true;
        console.log(MaDocGia, MaSach);
        const td = await TDMS.findOneAndUpdate({MaDocGia: MaDocGia, MaSach: MaSach}, { TrangThaiTT: TrangThaiTT, NgayThanhToan: NgayHienTai, NgayTra: NgayTra }, { new: true }, );
        if (!td) {
            return next(
                new ApiError(404, "Lỗi! Không tìm thấy thông tin mượn sách.")
            );
        }
        console.log("thanh toan dc")
        res.status(201).json(td);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi! Không thể thực hiện.")
        );
    }
}

exports.getDataLoanWithIDUser = async (req, res) => {
    const id_user = req.params.id;
    try {
      const dataOrder = await TDMS.find({ MaDocGia: id_user, TrangThaiTT: "true" });
      res.status(200).json(dataOrder);
    } catch (err) {
      console.log(err);
      res.status(501).json(err);
    }
}

exports.getDataLoanWithMaDocGia = async (req, res) => {
    const mdg = req.params.MaDocGia;
    try {
      const dataLoan = await TDMS.find({ MaDocGia: mdg, TrangThaiTT: "true"});
      res.status(200).json(dataLoan);
    } catch (err) {
      console.log(err);
      res.status(501).json(err);
    }
}

exports.getDataLoan = async (req, res) => {
    const { MaDocGia, MaSach } = req.body;
    try {
        const dataLoan = await TDMS.find({ MaDocGia: MaDocGia, MaSach: MaSach });
        res.status(200).json(dataLoan);
    } catch (err) {
        console.log(err);
        res.status(501).json(err);
    }
}

exports.delete = async (req, res, next) => {
    const { MaDocGia, MaSach } = req.body;
    try {
        const dataLoan = await TDMS.deleteOne({ MaDocGia: MaDocGia, MaSach: MaSach });
        if (!dataLoan) { 
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

exports.update = async (req, res, next) => {
    try {
        const { MaDocGia, MaSach, SoNgayMuon, SoLuong, GiaSauMuon, TrangThaiTT } = req.body;
        const data = await TDMS.findOneAndUpdate(
            {
                MaDocGia: MaDocGia,
                MaSach: MaSach
            }, 
            {
                SoNgayMuon: SoNgayMuon,
                SoLuong: SoLuong,
                GiaSauMuon: GiaSauMuon,
                TrangThaiTT: TrangThaiTT
            });
        if (!data) {
            return next(new ApiError(404, "Tài nguyên không tìm thấy"));
        }
        res.status(200).json(data);
    } catch (error) {
        return next(
            new ApiError(400, "Lỗi! Không thể cập nhật")
        );
    }
}