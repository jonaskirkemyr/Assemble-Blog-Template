# Assemble-Blog-Template

Blog template built with Assemble.

__NOTE: This repo is under development__

For a live demo of the template, visit my website [jonastn.com](http://www.jonastn.com).

## <a name="setup"></a>Setup

In order to build Assemble-Blog-Template, ensure that you have [Node.js](https://nodejs.org/), [Bower](http://bower.io/), and [Grunt](http://gruntjs.com/) installed.

* Install dependencies
```sh
npm install
bower install
```

## Building

The build tool used is Grunt, a dependency that already should be installed locally on your system (if you read the [setup](#setup) section).

There are two different tasks registered with grunt:

* `build` task creates a json file from all posts that exists in the folder `src/views/posts/`, and run assemble to create the distributed `.html` files from `.hbs` templates.
* `rebuild`, as the name implies, rebuilds the project. All dependency files needed for distribution is copied, all `js` files is minified, `sass` files compiled, `css` files minified, and `html` files created.

A successful build will create two folder: `build/` and `dist/`, as described in [the various directories](#directories)


## Run

Before being able to run this project, the task `rebuild` needs to be run.

```sh
grunt rebuild
```

This task will create a new folder: `dist/` within the root of the project folder (This is the folder which should be made accessible/copied over to a webserver, to make it available over the Internet).

To test this project locally, and make the files in `dist/` available to a web-browser:

```sh
grunt connect
```

Navigate your web-browser to [localhost:8080](http://localhost:8080/).

### NPM

Another opportunity is to use `npm` to install dependencies, rebuild and start running this project.

* `start` - deletes the `dist/` folder, and run the `rebuild` and `connect` task using `grunt`
* `init` - install all dependencies, and start the `npm run` task

start any of these scripts:

```sh
npm run <taskName>
```

where taskName is one of the available npm scripts mention above.


## <a name="directories"></a>The various directories

* `src`: contains the source code of the project
    * `js`: JavaScript code needed by the generated web-pages
        * `helpers`: Handlebars helpers made accessible within Handlebars files in `views`.
    * `scss`: sass style defined for the project (HTML5-up)
    * `views`: handlebars layouts/pages used by `Assemble.io`.
        * `layouts`: Base layouts for the website. One for standard pages, and a layout used by a blog-post
        * `pages`: building on the `base.hbs` layout file
        * `partials`: hbs snippets accessible to other `.hbs` layout/pages files
        * `posts`: The blog-post markdown files
* `build`: files that are compiled from the `src` folder
* `dist`: production ready code, created from the `build` folder

### Dist

When packaged, the Assemble-Blog-Template consist of a `index.html` page, the main page for the blog. All posts are located within the directory `dist/posts/`.

All dependencies are located in `dist/asset/`, where both `.css` and `.js` files are located. Packages from `bower` and `npm` are located under `packages/` folders.



## Dependencies

Assemble-Blog-Template is built with multiple libraries.

* [Assemble](http://assemble.io/) - Static compilation of Handlebars template 
* [Handlebars](http://handlebarsjs.com/) - extension of the Mustache templating language, a logicless templating language

Other dependencies can be found in `bower.json`and package.json`.

The theme used for this template is `Future Imperfect`, and downloaded from [HTML5UP](http://html5up.net/). Thanks to [N33](https://github.com/n33) for generating awesome HTML5 templates!

## License

Assemble-Blog-Template is released under the MIT license. See [LICENSE](LICENSE) for more information.