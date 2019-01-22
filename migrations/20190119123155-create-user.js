'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true
            },
            latitude: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: null,
                validate: {min: -90, max: 90}
            },
            longitude: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: null,
                validate: {min: -180, max: 180}
            },
            mobile_phone: {
                type: Sequelize.STRING,
                allowNull: true
            },
            nomCV: {
                type: Sequelize.BLOB,
                allowNull: true
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true
            },
            picture: {
                type: Sequelize.BLOB,
                allowNull: true
            },
            type: {
                type: Sequelize.ENUM,
                values: ['boss', 'worker', 'trainer', 'customer'],
                allowNull: true
            },
            status: {
                type: Sequelize.ENUM,
                values: ['waiting', 'active', 'deleted'],
                allowNull: true
            },
            lastlongin_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            remember_token: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            createdAt: {
                allowNull: true,           // false by default
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            trainerId:{
                type: Sequelize.INTEGER
            }
        });
    },
    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('Users', _.clone);
    }
};