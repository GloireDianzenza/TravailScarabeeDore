const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function getAllUsers(req,res,next){
    try{
        const users = await User.findAll({attributes:{exclude:["motdepasse"]}});
        let result = [];
        for(const u of users){
            result.push(u.dataValues);
        }
        res.status(200).json(result);
    }catch(error){
        res.status(404).json(error);
    }
}

async function findUser(req,res,next){
    try{
        const user = await User.findByPk(req.params.id,{attributes:{exclude:["motdepasse"]}});
        if(user === null)throw {error:"User not found"};
        res.status(200).json(user.dataValues);
    }catch(error){
        res.status(404).json(error);
    }
}

async function isClient(req,res,next){
    try{
        const user = await User.findByPk(req.params.id,{attributes:{exclude:["motdepasse"]}});
        if(user === null)throw {error:"User not found"};
        res.status(200).json({result:user.dataValues.employee});
    }catch(error){
        res.status(404).json(error);
    }
}

async function addClient(req,res,next){
    try{
        req.body.employee = 0;
        const user = await User.create({...req.body});
        res.status(201).json({message:"Utilisateur ajouté",id:user.dataValues.id});
    }catch(error){
        res.status(404).json(error);
    }
}

async function addEmployee(req,res,next){
    try{
        req.body.employee = 1;
        const user = await User.create({...req.body});
        res.status(201).json({message:"Utilisateur de l'entreprise ajouté"});
    }catch(error){
        res.status(404).json(error);
    }
}

async function editUser(req,res,next){
    try{
        const user = await User.findByPk(req.params.id);
        if(user === null)throw {error:"Utilisateur non existant"};
        const keys = Object.keys(User.getAttributes());
        const idx = keys.indexOf("employee");
        keys.splice(idx,1);
        for(const k of keys){
            if(req.body[k]){
                user[k] = req.body[k];
            }
        }
        user.save();
        res.status(201).json({message:"Utilisateur modifié"});
    }catch(error){
        res.status(404).json(error);
    }
}

async function removeUser(req,res,next){
    try{
        const user = await User.findByPk(req.params.id);
        if(user === null)throw {error:"Utilisateur non existant"};
        user.destroy();
        res.status(201).json({message:"Utilisateur supprimé"});
    }catch(error){
        res.status(404).json(error);
    }
}

async function checkLogin(req,res,next){
    try{
        const user = await User.findOne({where:{...req.body}});
        if(user===null)throw {error:"Utilisateur invalide"};
        res.status(202).json({message:"Logged in",id:user.dataValues.id});
    }catch(error){
        res.status(404).json(error);
    }
}

async function login(req,res,next){
    try{
        const user = req.body;
        if(user.error)throw {error:"An error occured"};
        const token = jwt.sign({_id:user.id},process.env.REACT_APP_SECRET_KEY,{expiresIn:"2 days"})
        res.status(200).json({token,user});
    }catch(error){
        res.status(404).json(error);
    }
}

module.exports = {getAllUsers,findUser,isClient,addClient,addEmployee,editUser,removeUser,checkLogin,login};