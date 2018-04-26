import mongoose from 'mongoose';
import { app } from '<configs>';

mongoose.Promise = global.Promise;

export const removeModel = (modelName) => {
  const model = mongoose.model(modelName);
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve();
    }
    model.remove((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const dropDb = async () =>
  mongoose
    .connect(app.dbConnectionURL)
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)));
