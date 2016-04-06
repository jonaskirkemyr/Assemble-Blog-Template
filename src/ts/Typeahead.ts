module Post {
    /*  export var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
          'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
          'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
          'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
          'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
          'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
          'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
          'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
          'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ];*/
    export var states: any = [
        {
            name: "alabama"
        },
        {
            name: "alaska"
        }
    ];

    /**
     * Example 
     */
    export class Typeahead {
        static keywords: Object = { "cat": "category", "author": "author", "tag": "tags" };

        static substrMatch(data: Array<Object>) {
            console.log("SUBMATCH", data);
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
                            matches.push({keyword:key,title:":"+key});
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

        static init() {
            console.log($("form.search input"));
            console.log($(".search input"));

            PostController.loadJson(function(response) {
                var data = JSON.parse(response);

                $('.search input').typeahead<Object>({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                    {
                        limit: 10,
                        display: function(data):string{return data["title"];},
                        name: 'states',
                        source: Typeahead.substrMatch(data),
                        templates: {
                            notFound: [
                                '<div class="empty-message">',
                                'No post found',
                                '</div>'
                            ].join('\n'),
                            suggestion: function(data): string {
                                console.log("DATA",data);
                                return Spa.App.namespace["postSuggestion"](data);
                            }

                        }
                    });
            });

        }
    }
}