///<reference path="../js.d.ts"/>
module Post {
    var templates = window[Data.config.namespace];


    /**
     * Class for initializing typeahead to 
     * input dom objects on format:
     * <form class="search">
     * <input..>
     * 
     * @export
     * @class Typeahead
     */
    export class Typeahead {
        static keywords: Object = { "cat": "category", "author": "author", "tag": "tags" };


        /**
         * Function for looking for matches for
         * the loaded posts. Matched results are
         * returned to the callback function
         * 
         * @static
         * @param {Array<Object>} data the loaded posts
         */
        static substrMatch(data: Array<Object>) {
            return function findMatches(q: string, cb: Function) {
                var matches: Array<any> = [];
                // regex used to determine if a string contains the substring `q`
                var substringRegex = null;

                var keyword = null;
                var query = null;

                if (q[0] == ":") {//check whether query starts with a keyword

                    substringRegex = new RegExp(q.substr(1), 'i');//create a regex without keyword sign `:`
                    for (var key in Typeahead.keywords) {//loop through every keyword registered..
                        if (substringRegex.test(key))//.. to check whether a match is found
                            matches.push({ keyword: Typeahead.keywords[key], title: ":" + key });//add data to render on match
                    }

                    var splitQuery: Array<string> = q.split(" ");//split query on space, which should be the search query for the input keyword

                    if (splitQuery.length > 1) {
                        query = splitQuery[1];//search for string given after keyword
                        matches = [];

                        if (Typeahead.keywords[splitQuery[0].substr(1)] != undefined)//verify keyword
                            keyword = splitQuery[0].substr(1);
                        else
                            return cb(matches);//return on invalid keyword
                    }
                    else
                        return cb(matches);//as long a keyword is not split up, do not query other data
                }
                else
                    query = q;
                substringRegex = new RegExp(query, 'i');

                //loop through data to check whether input query is matched with data
                $.each(data, function(i, str) {

                    var match: string = null;

                    switch (keyword) {
                        case "cat":
                            match = str["category"];
                            break;
                        case "author":
                            match = str["author"];
                            break;
                        case "tag":
                            match = str["tags"];
                            break;
                        default:
                            match = str["title"];
                            break;
                    }

                    if (substringRegex.test(match)) {//when a match is found
                        matches.push(str);
                    }
                });

                cb(matches);
            };

        }
        
        /**
         * Initializes typeahead and load posts
         * 
         * @static
         */
        static init() {
            loadJson('posts.json', function(response) {
                var data = JSON.parse(response);

                var typeaheads = $('.search input');

                typeaheads.typeahead<Object>({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                    {
                        limit: 10,
                        display: function(data: iSuggestion): string { return data.title; },
                        name: 'states',
                        source: Typeahead.substrMatch(data),
                        templates: {
                            notFound: [
                                '<div class="empty-message">',
                                'No post found.<br>Start typing <code>:</code> for a list of keywords',
                                '</div>'
                            ].join('\n'),
                            suggestion: function(data: iSuggestion): string {
                                console.log("DATA", data);
                                return templates["postSuggestion"](data);
                            }

                        }
                    });

                /**
                 * Function to run when an item is selected from the typeahead dropdown
                 * Will redirect to user to the selected post
                 */
                typeaheads.on('typeahead:select', function(ev: EventTarget, suggestion: iSuggestion) {
                    if (suggestion.keyword == undefined)
                        window.location.href = JsHelpers.link(suggestion.category, suggestion.basename);

                });
            });

        }
    }
}