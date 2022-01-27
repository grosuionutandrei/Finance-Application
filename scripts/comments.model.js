class CommentsModel {
  baseUrl = apiBaseUrl + '/comments';

  findForPost(postId) {
    return fetch(`${this.baseUrl}?postId=${postId}`).then((res) => res.json());
  }
}
