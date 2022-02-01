/* 
  GET catre server ca sa luam articolele
    fetch()

  Articolele trebuie afisate
    for prin toata lista de articole
      createElement()
        innerText pe elementul creat cu titlul
      append()
 */
class PostsController {
  postsModel = new PostsModel();
  postsView = new PostsView();
  usersModel = new UsersModel();

  async postsList() {
    const posts = await this.postsModel.findAll();

    /*
      Shape
      {
        1: {id: 1, name: 'bla' ...},
        2: {},
        <userId>: <UserObject>
      }
    */
    const usersCache = {};

    for (const post of posts) {
      if (usersCache[post.userId] !== undefined) {
        post.user = usersCache[post.userId];
        // continue;
      } else {
        const user = await this.usersModel.findOne(post.userId);
        usersCache[post.userId] = user;
        post.user = user;
      }
    }

    this.postsView.renderPostsList(posts);
  }

  async postDetails() {
    const postId = this.getUrlParam('postId');
    const post = await this.postsModel.findOne(postId);

    const author = await this.usersModel.findOne(post.userId);
    post.user = author;

    const commentsModel = new CommentsModel();
    const commentsView = new CommentsView();

    const comments = await commentsModel.findForPost(post.id);
    this.postsView.populatePostDetails(post);
    commentsView.renderComments(comments);
  }

  getUrlParam(paramName) {
    const params = new URLSearchParams(location.search);
    return params.get(paramName);
  }

  createPost(data) {
    this.postsModel.create(data);
  }

  initPostList() {
    this.postsList();
    this.postsView.initAddForm(this.createPost.bind(this));
  }
}
