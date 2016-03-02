/**
 * Usage example
 * {{headerImg image}}
 * where `image` is a image residing in the given
 * path defined in config.path.featureImg
 */
var config = require("../../../config.json");

module.exports.register = function (Handlebars, options) {
    'use strict';
    
    /**
     * Retrieve a url for a header image
     * @param {string} img name of picture to return path to
     * @returns {string} uri for header image
     */
    Handlebars.registerHelper('headerImg', function (img, options) {
        var size = (options.hash !== undefined && options.hash.size !== undefined) ? options.hash.size : "";

        return config.path.baseurl + config.path.featureImg + "/" + img + size + ".jpg";
    });
};