const mongoose = require("mongoose");

const SachSchema = new mongoose.Schema({
    MaSach: {
        type: String,
        required: true,
        unique: true
    },
    HinhAnh: {
        type: [String],
        required: true,
    },
    TenSach: {
        type: String,
        required: true,
        trim: true
    },
    DonGia: {
        type: Number,
        required: true,
        min: 0 //Đơn giá phải lớn hơn 0
    },
    SoQuyen: {
        type: Number,
        required: true,
        min: 0
    },
    TenLoaiSach: {
        type: String,
        required: true,
    },
    MoTaSach: {
        type: String,
        required: true,
    },
    NamXuatBan: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v >= 0 && v <= new Date().getFullYear(); //Phải là năm hợp lệ
            },
            message: props => `${props.value} is not a valid publication year!`
        }
    },
    MaNXB: {
        type: String,
        required: true
    },
    TacGia: {
        type: String,
        required: true,
        trim: true
    },
    LaiSuat: {
        type: Number,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Sach", SachSchema, "Sach");