class UsersModel {
  baseUrl = apiBaseUrl + '/users';

  findOne(id) {
    return fetch(`${this.baseUrl}/${id}`).then((res) => res.json());
  }
}
