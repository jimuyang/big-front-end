var nools = require('./source/nools.min.js')
// import nools from "./source/nools.min.js";

var Message = function(message) {
    this.text = message;
}

// var flow = nools.flow("Hello World", function(flow) {
//     // find any message that start with hello 
//     flow.rule("Hello", [Message, "m", "m.text =~ /^hello\\sworld$/"], function (facts) {
//         facts.m.text = facts.m.text + " goodbye";
//         this.modify(facts.m)
//     });

//     // find all messages then end in goodbye
//     flow.rule("Goodbye", [Message, "m", "m.text =~ /.*goodbye$/"], function(facts) {
//         console.log(facts.m.text)
//     })

// })
var Person = function(name) {
    this.name = name;
}
var noolsSource = "rule 'person name is bob' {"
    + "   when {"
    + "     p : Person p.name == 'bob';"
    + "   }"
    + "   then {"
    + "       logger.info('Found person with name of bob');"
    + "       retract(p);"
    + "   }"
    + "}";

var flow = nools.compile(noolsSource, {
    define: {
        //The person class the flow should use
        Person: Person
    },
    name: 'person name is bob'
});

var session = flow.getSession();

session.assert(new Message("hello"))
session.assert(new Message("hello world"))
session.assert(new Message("goodbye"))
