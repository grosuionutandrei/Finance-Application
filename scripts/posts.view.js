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
      link.href = `postDetails.html?postId=${post.id}`;
      link.innerText = post.title;
      title.append(link);
      const author = document.createElement('dd');
      author.innerText = `Author: ${post.user.name}`;

      this.listOutputElem.append(title, author);
    }
  }

  populatePostDetails(post) {
    const titleElem = document.querySelector('[data-post-title]');
    const contentElem = document.querySelector('[data-post-content]');
    const authorElem = document.querySelector('[data-post-author]');

    titleElem.innerText = post.title;
    contentElem.innerText = post.body;
    authorElem.innerHTML = '&mdash; by ' + post.user.name;
  }
}
