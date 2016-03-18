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
                parent.render("postIndex");
                PostController.initPage(0);
            });

            super.addRoute("/page/{page}", function(page) {
                parent.setRouteTitle("This is still my post");
                parent.render("postIndex");
                PostController.initPage(page);
            });
        }
    }
}