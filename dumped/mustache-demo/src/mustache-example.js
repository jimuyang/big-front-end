const Mustache = require('mustache')

var view = {
    title: "Joe",
    calc: function () {
        return 2 + 4;
    }
}

var output = Mustache.render("{{title}} spend: {{calc}}", view);
console.log(output);

