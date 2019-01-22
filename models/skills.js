'use strict';
module.exports = (sequelize, DataTypes) => {
    const Skills = sequelize.define('Skills', {
        name: DataTypes.STRING,
        keywords: DataTypes.STRING,
        comment: DataTypes.STRING,
        status: DataTypes.ENUM('waiting', 'valid', 'deleted')
    }, {});
    Skills.associate = function (models) {
        // associations can be defined here
        Skills.hasMany(models.Trainer)
    };
    return Skills;
};