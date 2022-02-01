// API interaction
class PostsModel {
  baseUrl = apiBaseUrl + '/posts';

  findAll() {
    return fetch(this.baseUrl).then((res) => res.json());
  }

  findOne(id) {
    return fetch(`${this.baseUrl}/${id}`).then((res) => res.json());
  }

  create(data) {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
}
