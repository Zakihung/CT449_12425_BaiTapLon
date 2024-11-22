const express = require("express");
const S = require("../controllers/Sach.controller");

const router = express.Router();

router.route("/")
    .post(S.create)
    .get(S.findAll)
    .delete(S.deleteAll)

router.route("/limit")
    .get(S.getLimit)

router.route("/categoryBook/:name")
    .get(S.getCategoryBook)

router.route("/updateSoQuyen")
    .put(S.updateSoQuyen)

router.route("/findName/:name")
    .get(S.findName)

router.route("/findByMaSach/:MaSach") 
    .get(S.findByMaSach)

router.route("/:id")
    .get(S.findOne)
    .put(S.update)
    .delete(S.delete)



module.exports = router;