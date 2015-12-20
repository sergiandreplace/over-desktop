// As electron loads all the js includes in modules instead of window, we must
// create the alias manually. Dirty, but works.
var $ = jQuery = require("./bower_components/jquery/dist/jquery.min.js");
