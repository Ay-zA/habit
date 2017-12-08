export default class ProjectClass {
  static toJSON() {
    return {
      _id: this._id,
      title: this.title
    };
  }
}
