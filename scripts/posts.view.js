// DOM Interaction
class PostsView {
  listOutputElem = document.querySelector('[data-posts-list]');

  renderPostsList(posts) {
    // For each post, create the following structure:
    // <dt><a href="postDetails.html">Title ........</a></dt>
    // <dd>Author: FistName LastName</dd>
    // and append this to the listOutputElem
    const fragment = document.createDocumentFragment();
    for (const post of posts) {
      fragment.append(this.createPostElement(post));
    }

    this.listOutputElem.append(fragment);
  }

  appendNewPostToList(post) {
    this.listOutputElem.prepend(this.createPostElement(post));
  }

  createPostElement(post) {
    const fragment = document.createDocumentFragment();

    const title = document.createElement('dt');
    const link = document.createElement('a');
    link.href = `postDetails.html?postId=${post.id}`;
    link.innerText = post.title;
    title.append(link);
    const author = document.createElement('dd');
    author.innerText = `Author: ${post.user.name}`;

    fragment.append(title, author);

    return fragment;
  }

  populatePostDetails(post) {
    const titleElem = document.querySelector('[data-post-title]');
    const contentElem = document.querySelector('[data-post-content]');
    const authorElem = document.querySelector('[data-post-author]');
    const editLinkElem = document.querySelector('[data-edit-link]');

    editLinkElem.href = `${editLinkElem.href}?postId=${post.id}`;

    titleElem.innerText = post.title;
    contentElem.innerText = post.body;
    authorElem.innerHTML = '&mdash; by ' + post.user.name;
  }

  initUpdateForm(post, cb) {
    document.querySelector('[data-post-title]').innerHTML = post.title;

    const form = document.querySelector('[data-update-form]');
    // const data = new FormData(form);

    // data.set('title', post.title);
    // data.set('body', post.body);

    form.elements.title.value = post.title;
    form.elements.body.value = post.body;

    form.addEventListener('submit', (e) => this.handleUpdateFormSubmit(e, cb));
  }

  handleUpdateFormSubmit(e, cb) {
    e.preventDefault();

    const data = new FormData(e.target);
    const title = data.get('title');
    const body = data.get('body');

    cb({ title, body });
  }

  initAddForm(cb) {
    const addForm = document.querySelector('[data-add-post-form]');
    addForm.addEventListener('submit', (e) => this.handleAddFormSubmit(e, cb));
  }

  handleAddFormSubmit(e, cb) {
    e.preventDefault();

    // destructuring assignment
    // const {
    //   title: { value: titlu },
    //   body: { value: corp },
    // } = e.target.elements;

    // console.log(titlu, corp);

    const data = new FormData(e.target);
    // const [title, body] = [data.get('title'), data.get('body')];
    const title = data.get('title');
    const body = data.get('body');
    const userId = 1;

    cb({ title, body, userId });
  }
}
