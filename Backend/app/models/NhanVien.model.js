const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema({
    MSNV: {
        type: String,
        // required: true,
        unique: true
    },
    HoTenNV: {
        type: String,
        // required: true,
        trim: true
    },
    ChucVu: {
        type: String,
        // required: true
    },
    DiaChi: {
        type: String,
        // required: true,
        trim: true
    },
    DienThoai: {
        type: String,
        // required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} không phải là số điện thoại hợp lệ!`
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("NhanVien", NhanVienSchema, "NhanVien");