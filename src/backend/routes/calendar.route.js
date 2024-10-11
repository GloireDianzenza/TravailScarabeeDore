const {getAllAgendas,checkLogin} = require("../controllers/calendar.controller");
const express = require("express");
const router = express.Router();

router.get("/",getAllAgendas);
router.post("/",checkLogin);

module.exports = router;