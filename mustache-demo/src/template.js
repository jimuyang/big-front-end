// const mustache = require('mustache');
// const $ = require("jquery");

function loadUser() {
    var template = $('#template').html();
    Mustache.parse(template);   // optional, speeds up future uses
    var rendered = Mustache.render(template, { name: "Luke" });
    $('#target').html(rendered);
}

$(function () {
    var view = {
        "name": "Chris",
        "company": "<b>GitHub</b>"
    };
    var template = $('#test-tmpl').html();
    var rendered = Mustache.render(template, view);
    console.log(rendered);
    $('#test').html(rendered);

    var view = {
        name: {
            first: "Yang",
            last: "Fan"
        },
        age: 18
    };
    var template = $('#test1-tmpl').html();
    var rendered = Mustache.render(template, view);
    console.log(rendered);
    $('#test1').html(rendered);

    var data = {
        beatles: [
            {
                first: "John",
                last: "Lennon"
            },
            {
                first: "Paul",
                last: "McCartney"
            },
            {
                first: "George",
                last: "Harrison"
            },
            {
                first: "Ringo",
                last: "Starr"
            }
        ],
        name: function () {
            return this.first + " " + this.last;
        }
    };
    var template = $('#test-list-tmpl').html();
    var rendered = Mustache.render(template, data);
    console.log(rendered);
    $('#test-list').html(rendered);

    // test Function
    var view = {
        name: "Tater",
        bold: function () {
            return function (text, render) {
                console.log(text);
                return "<b>" + render(text) + "</b>";
            }
        }
    };
    var template = "{{#bold}}Hi {{name}}.{{/bold}}";
    var rendered = Mustache.render(template, view);
    console.log(rendered);
    $('#test-list').append(rendered); 

    // Partials :like {{> box}}



});
