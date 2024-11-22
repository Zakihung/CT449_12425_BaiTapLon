const express = require("express");
const LS = require("../controllers/LoaiSach.controller");

const router = express.Router();

router.route("/")
    .post(LS.create)
    .get(LS.findAll)
    .delete(LS.deleteAll)

router.route("/:id")
    .get(LS.findOne)
    .put(LS.update)
    .delete(LS.delete)

module.exports = router;