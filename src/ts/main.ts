//declares the namespace which Handlebars templates is stored
declare var JST: any;

Spa.App.namespace = JST; //set the namespace variable to Spa.App
Spa.App.container = "content"; //dom id which should be replaced with dynamic content
var app = new Spa.App();

//initalizes post routes. Defines the hash value which the post route should be made available
new Post.PostRoute("").initRoutes();

window.onload = function() {
    app.init();//start application, and listening for hash change
}