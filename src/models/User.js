import JwtDecode from 'jwt-decode';

export default class User {
  static from(token) {
    try {
      // eslint-disable-next-line
      let obj = JwtDecode(token);
      return new User(obj);
    } catch (_) {
      return null;
    }
  }

  constructor({
    user_id, // eslint-disable-line camelcase
    admin,
    email,
  }) {
    this.id = user_id; // eslint-disable-line camelcase
    this.admin = admin;
    this.email = email;
  }

  get isAdmin() {
    return this.admin;
  }
}
