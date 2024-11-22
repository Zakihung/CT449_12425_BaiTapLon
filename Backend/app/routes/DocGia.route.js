const express = require("express");
const DG = require("../controllers/DocGia.controller");

const router = express.Router();

router.route("/")
    .get(DG.findAll)
    .delete(DG.deleteAll)
    .put(DG.update)

router.route("/update/:MaDocGia")
    .put(DG.updateMaDocGia)

router.route("/:id")
    .get(DG.findOne)
    .delete(DG.delete)

router.route("/findByMaDocGia/:MaDocGia") 
    .get(DG.findByMaDocGia)


module.exports = router;