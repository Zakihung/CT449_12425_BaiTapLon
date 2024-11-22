const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema({
    MaDocGia: {
        type: String,
        required: true
    },
    MaSach: {
        type: String,
        required: true
    },
    SoNgayMuon: {
        type: Number,
        required: true,
        min: 1
    },
    SoLuong: {
        type: Number,
        required: true,
        min: 1
    },
    GiaSauMuon: {
        type: Number,
    },
    NgayThanhToan: {
        type: Date,
    },
    NgayTra: {
        type: Date,
    },
    TrangThaiTT: {
        type: Boolean,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema, "TheoDoiMuonSach");