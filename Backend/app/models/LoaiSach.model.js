const mongoose = require("mongoose");

const LoaiSachSchema = new mongoose.Schema({
    TenLoaiSach: {
        type: String,
        required: true,
    },
},  {
    timestamps: true,
});

module.exports = mongoose.model("LoaiSach", LoaiSachSchema, "LoaiSach");