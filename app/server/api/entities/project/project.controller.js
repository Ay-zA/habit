import Project from './project.model';

export const getProjects = async (req, res, next) => {
  try {
    const todos = await Project.find();
    res.json(todos);
  } catch (e) {
    res.status(500);
    next(e);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const todo = await Project.findById(req.params.id);
    if (todo == null) {
      res.status(404).send({message: "not found"});
    } else {
      res.json(todo);
    }
  } catch (e) {
    res.status(500);
    next(e);
  }
};

export const addProject = async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (e) {
    res.status(500);
    next(e);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndRemove(req.params.id);
    res.json({ message: 'deleted' });
  } catch (e) {
    res.status(500);
  }
};
