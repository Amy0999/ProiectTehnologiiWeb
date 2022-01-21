import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Livrabil = db.define("Livrabil", {

    LivrabilId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    LivrabilName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    LivrabilDeadline: {
        type: Sequelize.DATE,
        allowNull: true
    },

    LivrabilLink: {
        type: Sequelize.STRING,
        allowNull: true
    },

    ProiectId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Livrabil;