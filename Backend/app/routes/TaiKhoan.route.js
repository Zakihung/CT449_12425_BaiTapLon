const express = require("express");
const TK = require("../controllers/TaiKhoan.controller");

const router = express.Router();

router.route("/register")
    .post(TK.register)

router.route("/login")
    .post(TK.login)

router.route("/")
    .get(TK.findAll)
    .delete(TK.deleteAll)

router.route("/:id")
    .get(TK.findOne)
    .delete(TK.delete)

router.route("/findByMaDocGia/:MaDocGia")
    .get(TK.findByMaDocGia)

router.route("/findByTenTK/:TenTaiKhoan")
    .get(TK.findByTenTK)

module.exports = router;