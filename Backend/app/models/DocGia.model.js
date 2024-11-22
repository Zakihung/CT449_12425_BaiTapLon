const mongoose = require("mongoose");
const CounterDG = require("./CounterDG.model");

const DocGiaSchema = new mongoose.Schema({
    MaDocGia: {
        type: String, //Kiểu chuỗi
        unique: true //Khóa chính
    },
    HoLot: {
        type: String,
        required: true,
        trim: true //Xóa khoảng trắng dư
    },
    Ten: {
        type: String,
        required: true,
        trim: true
    },
    NgaySinh: {
        type: Date,
        // required: true
    },
    Phai: {
        type: String,
        enum: ['Nam', 'Nữ'],
        // required: true
    },
    DiaChi: {
        type: String,
        // required: true,
        trim: true
    },
    DienThoai: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); //độ dài phải là 10 ký tự
            },
            message: props => `${props.value} không phải là số điện thoại hợp lệ!`
        }
    }
}, {
    timestamps: true //thêm 2 trường createAt và updateAt vào csdl
});

DocGiaSchema.pre('save', async function(next) {
    const counter = await CounterDG.findByIdAndUpdate( 
        { _id: 'nxbid' }, 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true } 
    );
    this.MaDocGia = `DG${counter.seq.toString().padStart(7, '0')}`;
    next(); 
});

module.exports = mongoose.model("DocGia", DocGiaSchema, "DocGia");