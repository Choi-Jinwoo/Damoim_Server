const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = require('../config/database');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: 'mysql',
  logging: false,

  define: {
    timestamps: false,
  },
});

const models = {};

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const extName = path.extname(path.join(__dirname, file));
    const baseName = path.basename(path.join(__dirname, file), extName);
    const model = sequelize.import(path.join(__dirname, file));
    models[baseName] = model;
  });

sequelize.sync().then(() => {
  console.log('[Model] Databases sync');
}).catch((err) => {
  console.log(err.message);
});

models.sequelize = sequelize;
models.Sequelize = sequelize;

module.exports = models;
