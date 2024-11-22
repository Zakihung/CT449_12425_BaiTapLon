const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const TaiKhoanSchema = new mongoose.Schema({
    MaDocGia: {
        type: String, //Kiểu chuỗi
        unique: true //Khóa chính
    },
    TenTaiKhoan: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    MatKhau: {
      type: String,
      required: true,
      // minlength: 6
    },
    DienThoai: {
      type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} không phải là số điện thoại hợp lệ!`
        }
    },
    IsNhanVien: {
      type: Boolean,
      default: false,
    },
},  {
    timestamps: true,
});

TaiKhoanSchema.pre('save', async function(next) {
  try {
    if (this.isModified('MatKhau') || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.MatKhau = await bcrypt.hash(this.MatKhau, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("TaiKhoan", TaiKhoanSchema, "TaiKhoan");