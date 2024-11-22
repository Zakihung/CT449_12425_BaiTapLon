const express = require("express");
const TG = require("../controllers/TacGia.controller");

const router = express.Router();

router.route("/")
    .post(TG.create)
    .get(TG.findAll)
    .delete(TG.deleteAll)

router.route("/:id")
    .get(TG.findOne)
    .put(TG.update)
    .delete(TG.delete)

module.exports = router;