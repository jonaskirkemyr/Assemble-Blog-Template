/**
 * Usage example
 * {{link programming hello-world}}
 */
var config = require("../../../config.json");

module.exports.register = function (Handlebars, options) {
    'use strict';
    
    /**
     * Retrieve a uri link to a post given its category and basename
     * @param {string} category which the post resides in
     * @param {string} basename if the file to link to   
     * @returns {string} link to post   
     */
    Handlebars.registerHelper('link', function (category, basename, options) {

        return config.path.baseurl + "/posts/" + category + "/" + basename + ".html";
    });
};