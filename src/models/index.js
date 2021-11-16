import fs from 'fs';
import path from 'path';

let models = {};

export const registerModels = (sequelize) => {
  const thisFile = path.basename(__filename); // index.js
  const modelFiles = fs.readdirSync(__dirname); // /models
  const filteredModelFiles = modelFiles.filter(
    (file) => file !== thisFile && file.slice(-3) === '.js'
  );

  filteredModelFiles.forEach((file) => {
    const model = require(path.join(__dirname, file)).default(sequelize);
    models[model.name] = model;
  });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  models.sequelize = sequelize;
};

export default models;
