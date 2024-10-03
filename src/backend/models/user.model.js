const {sequelize,DataTypes} = require("../init");

const User = sequelize.define("User",{
    id:{type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
    nom:{type:DataTypes.STRING,allowNull:false},
    prenom:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false,validate:{
        isEmail:true
    }},
    motdepasse:{type:DataTypes.STRING,allowNull:true,defaultValue:""},
    telephone:{type:DataTypes.STRING,allowNull:false,validate:{
        len:[10,12],
    }},
    employee:{type:DataTypes.TINYINT,allowNull:false,defaultValue:0}
});

module.exports = User;