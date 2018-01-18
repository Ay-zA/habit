import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

export class UserClass {
  static get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new Error('User not found!');
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

  static async authenticate(email, password) {
    const user = await this.findOne({ email: email.toLowerCase() });

    if (!user) {
      return null;
    }

    const isAuthenticated = user.authenticate(password);
    return isAuthenticated ? user : null;
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
      token: `Bearer ${this.createToken()}`,
      user: {
        id: this._id,
        email: this.email,
        name: this.name
      }
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
