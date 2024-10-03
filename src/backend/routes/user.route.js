const {getAllUsers,findUser,isClient,addClient,addEmployee,editUser,removeUser,checkLogin,login} = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/",getAllUsers);
router.post("/",addClient);
router.put("/:id",editUser);
router.delete("/:id",removeUser);
router.post("/secret",addEmployee);
router.post("/user/login",checkLogin);
router.get("/:id",findUser);
router.get("/:id/client",isClient);

router.put("/",login);

module.exports = router;