import abstractController from './abstract-controller';

const findByParam = model => async (req, res, next, id) => {
  try {
    const doc = await abstractController.getOne(model, id);

    if (doc == null) {
      throw new Error('Not Found');
    }

    req.docFromId = doc;
    next();
  } catch (e) {
    next(e);
  }
};

const getAll = model => async (req, res, next) => {
  try {
    const allDocs = await abstractController.getAll(model);
    res.status(200).json(allDocs);
  } catch (e) {
    next(e);
  }
};

const getOne = model => async (req, res, next) => {
  try {
    res.status(200).json(req.docFromId);
  } catch (e) {
    next(e);
  }
};

const deleteOne = model => async (req, res, next) => {
  try {
    const doc = await abstractController.deleteOne(req.docFromId);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

const updateOne = model => async (req, res, next) => {
  try {
    const docToUpdate = req.docFromId;
    const update = req.body;

    const doc = await abstractController.updateOne(docToUpdate, update);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

const createOne = model => async (req, res, next) => {
  try {
    const doc = await abstractController.createOne(model, req.body);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  };

  return { ...defaults, ...overrides };
};
