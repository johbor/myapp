'use strict';
console.log("test");
var arr = [];
var arr2 = ["johan", "Tineke"];
var arr3 = [{brand : 'BMW', color : 'red' }, {brand : 'VW', color : 'blue' }];
var car1 = {brand : 'BMW', color : 'red' };
arr.push(car1);
var car2 = {brand : 'VW', color : 'blue' }
arr.push(car2);
var car3 = {brand : 'AUDI', color : 'red' };
arr.push(car3);
//var arr = [{brand : 'BMW', color : 'red' }, {brand : 'VW', color : 'blue' }, {brand : 'AUDI', color : 'red' }];
//arr.foo = 'hello';

arr.forEach(element => console.log(element.brand + ' ' + element.color));

//for (var i in arr) {
//   console.log(i.brand + ' ' + i.color); // logs "0", "1", "2", "foo"
//}

var a = 1;
var b = 2;

if (a === b) {
    console.log('pop');
}


var c = function () {
    console.log("saddsa")
    return 1
}

c()

class Polygon {
    constructor(height, width) {
        this.name = 'Polygon';
        this.height = height;
        this.width = width;
    }
}

let p1 = new Polygon(10,20)
let p2 = new Polygon(10,30)

console.log(p1.name + ' hoogte:' + p1.height + ', breedte: ' + p1.width)
console.log(p2.name + ' hoogte:' + p2.height + ', breedte: ' + p2.width)
