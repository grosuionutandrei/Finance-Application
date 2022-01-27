class CommentsView {
  renderComments(comments) {
    for (const comment of comments) {
      const commentItem = document.createElement('li');
      commentItem.innerText = comment.body;
      document.querySelector('[data-post-comments]').append(commentItem);
    }
  }
}
