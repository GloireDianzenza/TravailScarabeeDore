const {getAllAgendas} = require("../controllers/calendar.controller");
const express = require("express");
const router = express.Router();

router.get("/",getAllAgendas);

module.exports = router;