const express = require("express");
const NXB = require("../controllers/NhaXuatBan.controller");

const router = express.Router();

router.route("/")
    .post(NXB.create)
    .get(NXB.findAll)
    .delete(NXB.deleteAll)

router.route("/:id")
    .get(NXB.findOne)
    .put(NXB.update)
    .delete(NXB.delete)



module.exports = router;