const Agenda = require("../models/calendar.model");

async function getAllAgendas(req,res,next){
    try{
        const users = await Agenda.findAll();
        let result = [];
        for(const u of users){
            result.push(u.dataValues);
        }
        res.status(200).json(result);
    }catch(error){
        res.status(404).json(error);
    }
}

async function checkLogin(req,res,next){
    try{
        res.status(200).json({});
    }catch(error){
        res.status(404).json(error);
    }
}

module.exports = {getAllAgendas,checkLogin};