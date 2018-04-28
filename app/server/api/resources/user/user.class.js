import { hashSync, compareSync, genSaltSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { tomorrow } from '<utils>/date.helper';

export class UserClass {
  static async authenticate(email, password) {
    if (!email || !password) {
      throw new Error('You need a username and password');
    }

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
    const salt = genSaltSync(10);

    return hashSync(password, salt);
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
