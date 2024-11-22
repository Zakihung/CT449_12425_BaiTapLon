const mongoose = require("mongoose");

const TacGiaSchema = new mongoose.Schema({
    TenTacGia: {
        type: String,
        required: true,
    },
},  {
    timestamps: true,
});

module.exports = mongoose.model("TacGia", TacGiaSchema, "TacGia");