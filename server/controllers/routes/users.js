const express =require("express")
const router=express.Router();

const usercon=require("../userController");

//View All records
router.get("/",usercon.view);

//Add New Records
router.get("/adduser",usercon.adduser);
router.post("/adduser",usercon.save);

//Update Records
router.get("/editUser/:id",usercon.edituser);
router.post("/editUser/:id",usercon.edit);

//Delete Records
router.get("/deleteUser/:id",usercon.delete);




 module.exports=router;
