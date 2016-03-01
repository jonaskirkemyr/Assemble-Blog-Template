/**
 * Usage example
 * {{ago "01/02/03" format="DD/MM/YY" checkDate="01/02/04"}}
 * where `format` and `checkDate` are optional parameters
 */
var moment = require("moment");

module.exports.register = function (Handlebars, options) {
    'use strict';
    
    /**
     * Print how long time ago an input date is from/until now or a given input date
     * @param {string} date to check against
     * @param {boolean}
     */
    Handlebars.registerHelper('ago', function (date, options) {
        
        //the format of the input date variable, with date.month.year as standard
        var inputFormat = (options.hash !== undefined && options.hash.format !== undefined) ? options.hash.format : "DD.MM.YYYY";

        //date to check input date against
        var checkDate = null;
        
        //check if a checkDate is set..
        if (options.hash !== undefined && options.hash.checkDate !== undefined)
            checkDate = moment(options.hash.checkDate, inputFormat);//use input date to compare against input date
        else
            checkDate = moment();//.. or use today as compare date

        var output = moment(date, inputFormat);

        return output.from(checkDate);
    });
};