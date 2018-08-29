const fs = require('fs');
const $ = require('jquery');
const Mustache = require('mustache');

const view  = {
    "name": "Chris",
    "company": "<b>GitHub</b>"
}

function loadMustache() {
    var template = fs.readFileSync('mst/base.mustache').toString();
    console.log(template);
    var rendered = Mustache.render(template, view);
    console.log('The rendered result: -----------');
    console.log(rendered);
    // $.get('mst/base.mustache', function (template) {
        
    // })
}

loadMustache();


