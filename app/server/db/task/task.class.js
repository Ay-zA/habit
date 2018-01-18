export class TaskClass {
  static get(id) {
    return this.findById(id)
      .exec()
      .then((task) => {
        if (task) {
          return task;
        }

        const err = new Error('Task not found!');
        return Promise.reject(err);
      });
  }

  static list({ skip = 0, limit = 100 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }

  static remove(id) {
    return this.get(id)
      .then(project => project.remove())
      .catch(e => Promise.reject(e));
  }
}
