module Post {
    export class PostRoute extends Spa.Route {
        /**
        * @param  {string} route the url which the route should be made accessible
        */
        constructor(route: string) {
            super(route);
            this.setRouteTitle("My Posts");
        }
        
        /**
         * Initalizes routes for post
         */
        initRoutes() {
            var parent = this;

            super.addRoute("/:{sort}:", function(sort: Post.PostSelect) {
                console.log(sort);
                parent.setRouteTitle("This is still my post");
                parent.render("postIndex");

                PostController.loadPosts(null, function() {
                    PostController.initPage(1, sort);
                });

            });

            super.addRoute("/tag/{name}/:{page}:", function(name: string, page: number = 1) {
                console.log("TAG", name, page);
                parent.render("postIndex");
                PostController.loadPosts(PostSelect.Tag, function() {
                    PostController.setParam(name);
                    PostController.initPage(page);
                });
            });

            super.addRoute("/category/{name}/:{page}:", function(name: string, page: number = 1) {
                console.log("CATEGORY", name, page);
                parent.render("postIndex");
                PostController.loadPosts(PostSelect.Category, function() {
                    PostController.setParam(name);
                    PostController.initPage(page);
                });
            });

            super.addRoute("/page/{page}", function(page: number) {
                console.log("PAGE", page);
                console.log("page triggered");
                parent.setRouteTitle("This is still my post");
                parent.render("postIndex");

                PostController.loadPosts(null, function() {
                    PostController.initPage(page);
                });

                //PostController.initPage(page > 1 ? page - 1 : 0);//page 0 do not exists for the client (start page is 1)
            });
        }
    }
}