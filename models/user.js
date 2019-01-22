'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        address: DataTypes.STRING,
        latitude: DataTypes.INTEGER,
        longitude: DataTypes.INTEGER,
        mobile_phone: DataTypes.STRING,
        nomCV: DataTypes.BLOB,
        phone_number: DataTypes.STRING,
        password: DataTypes.STRING,
        picture: DataTypes.BLOB,
        type: DataTypes.ENUM('boss', 'worker', 'trainer', 'customer'),
        status: DataTypes.ENUM('waiting', 'active', 'deleted'),
        lastlongin_at: DataTypes.DATE,
        remember_token: DataTypes.TEXT,
        role_id: DataTypes.INTEGER
    }, {
        validate: {
            bothCoordsOrNone: function () {
                if ((this.latitude === null) !== (this.longitude === null)) {
                    throw new Error('Require les Coordonnées Latitude est Longitude !');
                }
            }
        },
        tableName: 'Users',
        timestamps: false,
        schema: 'public'
    });

    User.associate = function (models) {
        // associations can be defined here

        User.hasOne(models.Trainer, {
            foreignKey: 'trainer_id'
        });
    };

    console.log(User.rawAttributes.values);

    return User;
};