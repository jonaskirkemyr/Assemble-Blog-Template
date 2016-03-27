module Post {

    export enum PostSelect { Date, Category, Author, Tag };
    /**
     * Controller for loading/showing posts
     * 
     * @export
     * @class PostController
     */
    export class PostController {

        /**
         * Variable holding post data loaded from json file
         * 
         * @static
         * @type {JSON}
         */
        static posts: Array<Object>;

        static numbPerPage = 1;

        static sortBy: PostSelect = null;
        static selectedPosts: PostSelect = null;
        static selectedParam: string = null;//param used when selecting posts (author name, tag name, category name)


        /**
         * Initializes the post page and load posts
         */
        static initPage(page: number, sortBy: PostSelect = PostSelect.Date) {
            if (this.posts.length >= page && page > 0) {
                this.sortPosts(sortBy);
                this.renderPosts(page - 1);
            }
        }

        static setParam(param: string) {

            if (this.selectedParam == param)
                return;

            switch (this.selectedPosts) {
                case PostSelect.Tag:
                    this.selectTag(param);
                    break;

                case PostSelect.Category:
                    this.selectPosts("category", param);
                    break;

                case PostSelect.Author:
                    this.selectPosts("author", param);
                    break;

                default:
                    this.selectedPosts = null;
                    param = null;
                    break;
            }

            this.selectedParam = param;
        }


        static loadPosts(postSelector: PostSelect, func: Function) {
            if (this.posts == null || postSelector != this.selectedPosts) {
                this.loadJson(function(response) {
                    console.log("loading posts");
                    PostController.posts = JSON.parse(response);
                    PostController.selectedPosts = postSelector;
                    PostController.sortBy = null;
                    func();
                });
            }
            else
                func();
        }

        static selectTag(tag: string) {
            for (var i = 0; i < this.posts.length; ++i) {
                var found = false;//state whether the searching tag is found or not
                for (var j = 0; j < this.posts[i]["tags"].length; ++j) {//loop over all tags for the current post
                    if (this.posts[i]["tags"][j] == tag) {//tag exists in post
                        found = true;//change the state proving that the tag was found for the state
                        break;//no need to keep searching once found
                    }
                }

                if (!found) {
                    this.posts.splice(i);
                }
            }
        }

        private static selectPosts(selectBy: string, search: string) {
            for (var i = 0; i < this.posts.length; ++i) {
                if (this.posts[i][selectBy] != search) {
                    this.posts.splice(i, 1);
                }
            }
        }

        static sortPosts(sortBy: PostSelect = PostSelect.Date) {
            if (this.sortBy != sortBy) {
                switch (sortBy) {

                    default:
                    case PostSelect.Date:
                        this.sortByDate();
                        this.sortBy = PostSelect.Date;
                        break;

                    case PostSelect.Category:
                        this.sortByCategory();
                        this.sortBy = PostSelect.Category;
                        break;

                    case PostSelect.Author:
                        this.sortByAuthor();
                        this.sortBy = PostSelect.Author;
                        break;
                }
            }
        }


        /**
         * Renders posts loaded
         * 
         * @static
         */
        static renderPosts(page: number) {
            var html = "";
            for (var i = page, numb = 0; i < this.posts.length && numb < this.numbPerPage; ++i, ++numb) {
                html += Spa.App.namespace['postListMd'](this.posts[i]);
            }

            document.getElementById("posts").innerHTML = html;
            //TODO: pagination setup
        }


        static sortByDate() {
            this.posts.sort(function(a: Object, b: Object) {
                var momentA = moment(a["created"], "DD.MM.YYYY");
                var momentB = moment(b["created"], "DD.MM.YYYY");
                return momentB.diff(momentA);
            });
        }

        static sortByCategory() {
            this.posts.sort(function(a: Object, b: Object) {
                return a["category"].localeCompare(b["category"]);
            });
        }

        static sortByAuthor() {
            this.posts.sort(function(a: Object, b: Object) {
                return a["author"].localeCompare(b["author"]);
            });
        }


        /**
         * Load the posts.json data generated by m2j
         * @src http://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
         * 
         * @static
         * @param callback which retrieve the returned data
         */
        static loadJson(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', 'posts.json', true);
            /**
             * Function to run when data is returned successfully
             */
            xobj.onreadystatechange = function() {
                if (xobj.readyState == 4 && xobj.status == 200) {

                    callback(xobj.responseText);
                }
            };
            xobj.send(null);
        }
    }
}