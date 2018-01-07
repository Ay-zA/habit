import { hashSync, compareSync } from 'bcrypt-nodejs';
import HTTPStatus from 'http-status';
import jwt from 'jsonwebtoken';
import ApiError from '@/utils/api-error';
import { apiConfig } from '@/api/config';

export class UserClass {
  static get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new ApiError('User not found!', HTTPStatus.NOT_FOUND);
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

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // eslint-disable-next-line class-methods-use-this
  _hashPassword(password) {
    return hashSync(password);
  }

  authenticate(password) {
    return compareSync(password, this.password);
  }

  toAuthJSON() {
    return {
      id: this._id,
      email: this.email,
      name: this.name,
      token: `Bearer ${this.createToken()}`
    };
  }

  createToken() {
    const tomorrow = Number(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    return jwt.sign({ id: this._id, exp: tomorrow }, process.env.JWT_SECRET);
  }

  toJSON() {
    return {
      id: this._id,
      email: this.email,
      name: this.name
    };
  }
}
