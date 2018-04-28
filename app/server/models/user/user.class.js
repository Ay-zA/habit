import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { tomorrow } from '<utils>/date.helper';
import { hashPassword } from '<utils>/enc.helper';

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

  hashPassword() {
    this.password = hashPassword(this.password);
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
        name: this.name,
      },
    };
  }

  createToken() {
    return jwt.sign({ id: this._id, exp: tomorrow }, process.env.JWT_SECRET);
  }

  toJSON() {
    return {
      id: this._id,
      email: this.email,
      name: this.name,
    };
  }
}
