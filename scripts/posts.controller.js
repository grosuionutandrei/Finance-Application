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

  async postsList() {
    const posts = await this.postsModel.findAll();
    this.postsView.renderPostsList(posts);
  }
}
