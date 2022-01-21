import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Proiect = db.define("Proiect", {

    ProiectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    ProiectName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Proiect;