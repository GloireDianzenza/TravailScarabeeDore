const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('scarabeedore', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql",define:{timestamps:false}});
const sequelize2 = new Sequelize('scarabeedorecalendar', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql",define:{timestamps:false}});


module.exports = {sequelize,sequelize2,DataTypes};