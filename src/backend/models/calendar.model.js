const {sequelize2,DataTypes} = require("../init");

const Agenda = sequelize2.define("Agenda",{
    id:{type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true}
});

module.exports = Agenda;