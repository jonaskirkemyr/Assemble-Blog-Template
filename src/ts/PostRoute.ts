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

            super.addRoute("/", function() {
                parent.setRouteTitle("This is still my post");
                parent.renderPage(null, 1, "#/page");
            });

            super.addRoute("/tag/{name}/:{page}:", function(name: string, page: number = 1) {
                parent.setRouteTitle("Tag page");
                parent.renderPage(PostSelect.Tag, page, "#/tag/" + name, name);
            });

            super.addRoute("/category/{name}/:{page}:", function(name: string, page: number = 1) {
                parent.setRouteTitle("Categories");
                parent.renderPage(PostSelect.Category, page, "#/category/" + name, name);
            });

            super.addRoute("/page/{page}", function(page: number) {

                parent.setRouteTitle("This is still my post");
                parent.renderPage(null, page, "#/page");
            });
        }


        /**
         * Common function for rendering post page. Each route
         * calls this function to decide which posts should be
         * loaded, current page which should be rendered, and
         * the href to both next/prev buttons
         * 
         * @private
         * @param {PostSelect} selectPosts which posts should be selected
         * @param {number} [page=1] the page number to render
         * @param {string} href the parent link to be used with Pagination class
         * @param {string} [param=null] if a param should be set for the loaded posts
         */
        private renderPage(selectPosts: PostSelect, page: number = 1, href: string, param: string = null) {
            this.render("postIndex");

            PostController.loadPosts(selectPosts, function() {
                Pagination.setHrefPage(href);

                if (param != null)
                    PostController.setParam(param);

                if (!PostController.initPage(page))
                    Spa.App.renderErrorPage();
            });
        }
    }
}