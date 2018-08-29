import _ from "lodash";
import "./style.css";
import printMe from './print.js';
import { cube } from './math';

/* eslint-disable-next-line no-undef */
let str = `Looks like we are in ${process.env.NODE_ENV} mode!`;
console.log(str);

function component() {
    let element = document.createElement('div');
    let btn = document.createElement('button');

    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;

    element.innerHTML = _.join(['Hello', 'Webpack'], ' ');
    element.innerHTML = '5 cubed is equal to ' + cube(5);
    element.classList.add('hello');

    element.appendChild(btn);
    return element;
}

document.body.appendChild(component());

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('Accepting the updated printMe module!');
//         printMe();
//     });
// }
