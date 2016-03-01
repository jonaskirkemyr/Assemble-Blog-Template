//@src http://webercoder.com/journal/2015/05/12/building-an-assembleio-blog-part-2.html
var moment = require("moment");

module.exports.register = function (Handlebars, options) {
    'use strict';

    /**
     * Get the first enabled item of a list..
     * @param items An array of items.
     * @return A subset of items.
     */
    Handlebars.registerHelper('getLatestEntries', function (items, sortBy, limit, options) {

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
        
        console.log("OPT",options.fn);
        console.log("limit",limit);
        console.log("size",sortedItems.length);

        // Pull out the most recent
        for (var i = 0; i < sortedItems.length && count++ < limit; i++) {
            if ("exclude" in sortedItems[i] && sortedItems[i].exclude === true) {
                continue;
            }
            console.log("I",i,sortedItems[i]);
            rv += options.fn(sortedItems[i]);
            count++;
        }

        return rv;

    });

};