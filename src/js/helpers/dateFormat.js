/**
 * Usage example
 * {{dateFormat "01/02/03" "DD.MM.YYYY" format="DD/MM/YY"}}
 * where `format` is an optional parameter
 */
var moment = require("moment");

module.exports.register = function (Handlebars, options) {
    'use strict';
    
    /**
     * Retrieve a date string on the given output format
     * @param {string} date string to format
     * @param {string} outputFormat the format which the output date should be converted to   
     * @returns {string} output string   
     */
    Handlebars.registerHelper('dateFormat', function (date, outputFormat, options) {
        
        //the format of the input date variable, with date.month.year as standard
        var inputFormat = (options.hash !== undefined && options.hash.format !== undefined) ? options.hash.format : "DD.MM.YYYY";
        var output = moment(date, inputFormat);

        return output.format(outputFormat);
    });
};