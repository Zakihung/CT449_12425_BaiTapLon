const express = require("express");
const NV = require("../controllers/NhanVien.controller");

const router = express.Router();

router.route("/")
    .post(NV.create)
    .get(NV.findAll)
    .delete(NV.deleteAll)

router.route("/:id")
    .get(NV.findOne)
    .put(NV.update)
    .delete(NV.delete)

module.exports = router;