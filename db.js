const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("testedb", "root", "testedb", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const Profissao = sequelize.define("profissao", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Usuario = sequelize.define("usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Profissao.hasMany(Usuario, {
  constraints: true,
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

sequelize
  .sync()
  .then(() => {
    console.log("tables created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = { sequelize, Profissao, Usuario };
