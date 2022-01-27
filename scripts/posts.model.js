// API interaction
class PostsModel {
  baseUrl = apiBaseUrl + '/posts';

  findAll() {
    return fetch(this.baseUrl).then((res) => res.json());
  }

  findOne(id) {
    return fetch(`${this.baseUrl}/${id}`).then((res) => res.json());
  }
}
