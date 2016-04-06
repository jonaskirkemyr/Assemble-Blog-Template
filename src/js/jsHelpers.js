var JsHelpers = JsHelpers || {};

JsHelpers = {
    link: function(category, basename) {
        return Data.config.path.baseurl + "/posts/" + category + "/" + basename + ".html";
    }
};

