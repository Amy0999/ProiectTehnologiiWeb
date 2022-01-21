import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const Student = db.define("Student", {

    StudentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    StudentFirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    StudentLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    StudentPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },

    ProiectId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Student;