'use strict';
module.exports = (sequelize, DataTypes) => {
    const Trainer = sequelize.define('Trainer', {
        level: DataTypes.ENUM('bronze', 'silver', 'gold', 'greylist', 'blacklist')
    }, {});
    Trainer.associate = function (models) {
        // associations can be defined here

        Trainer.belongsTo(models.User);
    };
    return Trainer;
};