import HTTPStatus from 'http-status';
import ApiError from '@/utils/api-error';
import { apiConfig } from '@/api/config';

export class ProjectClass {
  static get(id, fields) {
    return this.findById(id, fields)
      .exec()
      .then((project) => {
        if (project) {
          return project;
        }

        const err = new ApiError('Project not found!', HTTPStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  }

  static list({ skip = 0, limit = apiConfig.limit } = {}) {
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

  static async getTasks(id) {
    const project = await this.findById(id, { tasks: 1, _id: 0 })
      .populate('tasks')
      .exec();
    return project.tasks;
  }
}
