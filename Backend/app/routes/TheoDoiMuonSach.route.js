const express = require("express");
const TDMS = require("../controllers/TheoDoiMuonSach.controller");

const router = express.Router();

router.route("/")
    .get(TDMS.findAll)
    .put(TDMS.update)
    .delete(TDMS.deleteAll)

router.route("/deleteOne")
    .delete(TDMS.delete)

router.route("/loan")
    .post(TDMS.loan)

router.route("/pay")
    .post(TDMS.pay)

router.route("/:MaDocGia")
    .get(TDMS.getDataLoanWithMaDocGia)

router.route("/infoUser/:id")
    .get(TDMS.getDataLoanWithIDUser)

router.route("/getDataLoan")
    .get(TDMS.getDataLoan)

module.exports = router;