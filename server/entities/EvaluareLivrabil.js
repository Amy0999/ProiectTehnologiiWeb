import Sequelize from 'sequelize';
import db from '../dbConfig.js';

const EvaluareLivrabil = db.define("EvaluareLivrabil", {

    EvaluareId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    StudentId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    EvaluareLivrabilNota: {
        type: Sequelize.DOUBLE(4,2),
        allowNull: false
    },

    LivrabilId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default EvaluareLivrabil;