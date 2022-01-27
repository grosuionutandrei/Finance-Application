// DOM Interaction
class PostsView {
  listOutputElem = document.querySelector('[data-posts-list]');

  renderPostsList(posts) {
    // For each post, create the following structure:
    // <dt><a href="postDetails.html">Title ........</a></dt>
    // <dd>Author: FistName LastName</dd>
    // and append this to the listOutputElem
    for (const post of posts) {
      const title = document.createElement('dt');
      const link = document.createElement('a');
      link.href = 'postDetails.html';
      link.innerText = post.title;
      title.append(link);
      const author = document.createElement('dd');
      author.innerText = post.userId;

      this.listOutputElem.append(title, author);
    }
  }
}
