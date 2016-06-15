/**
 * Handlebars helpers ready to be used both on client&server side
 * @src http://www.codyrushing.com/using-handlebars-helpers-on-both-client-and-server/
 */
var register = function (Handlebars, isClient) {


    var helpers = {

        /**
         * Print how long time ago an input date is from/until now or a given input date
         * @param {string} date to check against
         * @param {boolean}
         * 
         * Usage example
         * {{ago "01/02/03" format="DD/MM/YY" checkDate="01/02/04"}}
         * where `format` and `checkDate` are optional parameters
         */
        ago: function (date, options) {

            //the format of the input date variable, with date.month.year as standard
            var inputFormat = (options.hash !== undefined && options.hash.format !== undefined) ? options.hash.format : "DD.MM.YYYY";

            //date to check input date against
            var checkDate = null;

            //check if a checkDate is set..
            if (options.hash !== undefined && options.hash.checkDate !== undefined)
                checkDate = moment(options.hash.checkDate, inputFormat); //use input date to compare against input date
            else
                checkDate = moment(); //.. or use today as compare date

            var output = moment(date, inputFormat);

            return output.from(checkDate);
        },


        /**
         * Retrieve a date string on the given output format
         * @param {string} date string to format
         * @param {string} outputFormat the format which the output date should be converted to   
         * @returns {string} output string
         *
         * Usage example
         * {{dateFormat "01/02/03" "DD.MM.YYYY" format="DD/MM/YY"}}
         * where `format` is an optional parameter 
         */
        dateFormat: function (date, outputFormat, options) {

            //the format of the input date variable, with date.month.year as standard
            var inputFormat = (options.hash !== undefined && options.hash.format !== undefined) ? options.hash.format : "DD.MM.YYYY";
            var output = moment(date, inputFormat);

            return output.format(outputFormat);
        },

        /**
         * Retrieve a url for a header image
         * @param {string} img name of picture to return path to
         * @returns {string} uri for header image
         * 
         *  Usage example
         * {{headerImg image}}
         * where `image` is a image residing in the given
         * path defined in config.path.featureImg
         */
        headerImg: function (img, options) {
            var size = (options.hash !== undefined && options.hash.size !== undefined) ? options.hash.size : "";

            return config.path.baseurl + config.path.featureImg + "/" + img + size + ".jpg";
        },

        /**
         * Get the first enabled item of a list..
         * @param items An array of items.
         * @return A subset of items.
         * @src http://webercoder.com/journal/2015/05/12/building-an-assembleio-blog-part-2.html
         */
        getLatestEntries: function (items, sortBy, limit, options) {
            var rv = "";
            var count = 0;

            //the format of the input date variable, with date.month.year as standard
            var inputFormat = (options.hash !== undefined && options.hash.format !== undefined) ? options.hash.format : "DD.MM.YYYY";

            // Sort items by date
            var sortedItems = items.sort(function (a, b) {
                var momentA = moment(a[sortBy], inputFormat);
                var momentB = moment(b[sortBy], inputFormat);
                return momentB.diff(momentA);
            });

            if (!limit) {
                limit = 10;
            }
            // Pull out the most recent
            for (var i = 0; i < sortedItems.length && count++ < limit; i++) {
                if ("exclude" in sortedItems[i] && sortedItems[i].exclude === true) {
                    continue;
                }
                rv += options.fn(sortedItems[i]);
            }

            return rv;
        },


        /**
         * Retrieve a uri link to a post given its category and basename
         * @param {string} category which the post resides in
         * @param {string} basename if the file to link to   
         * @returns {string} link to post   
         * 
         *  Usage example
         * {{link programming hello-world}}
         */
        link: function (category, basename, options) {
            return config.path.baseurl + "/posts/" + category + "/" + basename + ".html";
        },

        /**
         * 
         */
        categoryList: function (pages, options) {
            if (isClient === true)
                return;

            var obj = {};

            pages.forEach(function (page, index) {
                var value = page.category;
                if (value !== undefined && obj[value]===undefined)
                    obj[value]={category:value,link:config.path.baseurl+value}
            });

            return obj;
        },

        /**
         * Generates a text-cloud on all categories. The input should be
         * a collection of pages which has a category attribute. Each
         * category is counted and stored into an object, which is 
         * later used for generating the npm text-cloud.
         * @param {array} pages the pages to retrieve category from
         * @returns {string} generated html code of tag cloud
         * 
         * Usage example
         * {{{categoryCloud posts}}}
         * Note: need three brackets to output html successfully
         */
        categoryCloud: function (pages, options) {
            if (isClient === true)
                return;

            var obj = {};
            var total = 0;

            pages.forEach(function (page, index) {

                var value = page.category;

                if (value !== undefined) {
                    ++total;
                    if (obj[value] === undefined)
                        obj[value] = 1;
                    else
                        obj[value]++;
                }
            });

            var words = [];

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {

                    words.push({
                        tagName: key,
                        count: obj[key],
                        //weight: (10 / (100 / ((obj[key] / total) * 100))),
                        href: "http://vg.no"
                    });

                }
            }
            var html = null;
            tagCloud.tagCloud(words, function (err, data) {
                html = data;
            }, {
                    additionalAttributes: {
                        href: 'http://google.com?q={{tag}}'
                    },
                    htmlTag: 'a',
                    randomize: true
                });

            return html;
        },

        /**
         * Generates a text-cloud on all categories. The input should be
         * a collection of pages which has a category attribute. Each
         * category is counted and stored into an object, which is 
         * later used for generating the npm text-cloud.
         * @param {array} pages the pages to retrieve category from
         * @returns {string} generated html code of tag cloud
         * 
         * Usage example
         * {{{categoryCloud posts}}}
         * Note: need three brackets to output html successfully
         */
        tagCloud: function (pages, options) {
            if (isClient === true)
                return;

            var obj = {};
            var total = 0;

            //retrieve all tags from each page to create an object
            //with a count for each tag occurent
            pages.forEach(function (page, i) {

                var tags = page.tags;
                console.log(tags);

                tags.forEach(function (tag, j) {
                    ++total;
                    if (obj[tag] === undefined)
                        obj[tag] = 1;
                    else
                        obj[tag]++;
                });
            });
            console.log(obj);

            var tags = [];
            for (var tag in obj) {
                if (obj.hasOwnProperty(tag)) {
                    tags.push({
                        tagName: tag,
                        count: obj[tag],
                        href: "http://jonastn.com"
                    });
                }
            }

            console.log(tags);

            var html = null;
            tagCloud.tagCloud(tags, function (error, data) {
                html = data;
            }, {
                    additionalAttributes: {
                        href: config.path.baseurl + "tags/{{tag}}"
                    },
                    htmlTag: 'a',
                    randomize: true,
                    classPrefix: "tag"
                });

            return html;
        }

    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

// client
if (typeof window !== "undefined") {
    var config = Data.config;
    register(Handlebars, true);
}
// server
else {
    var moment = require("moment");
    var config = require("../../../config.json");
    var tagCloud = require('tag-cloud');
    module.exports.register = register;
    module.exports.helpers = register(null, false);
}