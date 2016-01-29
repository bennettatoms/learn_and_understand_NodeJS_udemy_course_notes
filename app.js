// var a = 1;
// var b = 2;
// var c = a + b;

// console.log(c);

// function greet() {
//   console.log('Hi');
// }

// greet(); // invoke or call it

// function logGreeting(fn) {
//   fn();
// }

// logGreeting(greet); // call the logGreeting function and pass it the parameter of the greet function

// var greetMe = function() {
//   console.log('Hi Bennett');
// }

// greetMe();

// logGreeting(greetMe);

// logGreeting(function() {
//   console.log('Hello Bennett');
// });

// function change(b) {
//   b = 2;
// }

// var a = 1;
// change(a);
// console.log(a); // 1

// function changeObj(d) {
//   d.prop1 = function () {};
//   d.prop2 = {};
// }

// var c = {};
// c.prop1 = {};
// changeObj(c);
// console.log(c); //{ prop1: [Function], prop2: {} }

// var util = require('util');

// var name = 'Bennett';
// var age = 35;
// var greeting = util.format('Hello, %s, I am %d years old', name, age);

// util.log(greeting);

// var arr = [];

// arr.push(function() {
//   console.log('Hello world 1');
// });
// arr.push(function() {
//   console.log('Hello world 2');
// });
// arr.push(function() {
//   console.log('Hello world 3');
// });

// arr.forEach(function(item) {
//   item();
// })
//

// var EventEmitter = require('events');
// var util = require('util');

// function Greetr() {
//   this.greeting = 'Hello world!';
// }

// util.inherits(Greetr, EventEmitter);

// Greetr.prototype.greet = function(data) {
//   console.log(this.greeting + ': ' + data);
//   this.emit('greet', data);
// };

// var greeter1 = new Greetr();

// greeter1.on('greet', function(data) {
//   console.log('someone greeted: ' + data);
// });

// greeter1.greet('Bennett');
// ==> Hello world!: Bennett
// ==> someone greeted: Bennett


// New feature: template literals
// var name = 'John Doe';
// var greet = 'Hello, ' + name;
// var greet2 = `Hello, ${ name }`;

// console.log('ES5: ' + greet);     // ES5: Hello, John Doe
// console.log(`ES6: ${ greet2 }`);  // ES6: Hello, John Doe

// var obj = {
//   name: 'John Doe',
//   greet: function() {
//     console.log(`Hello, ${ this.name }`);
//   }
// };

// obj.greet(); // ==>  Hello, John Doe
// obj.greet.call({ name: 'Jane Doe' });   // ==>  Hello, Jane Doe
// obj.greet.apply({ name: 'Jane Doe' });  // ==>  Hello, Jane Doe


// Inheritance with .call(this)

// var util = require('util');

// function Person() {
//   this.firstname = 'John';
//   this.lastname = 'Doe';
// }

// Person.prototype.greet = function() {
//   console.log('Hello, ' + this.firstname + ' ' + this.lastname);
// }

// function Policeman() {
//   Person.call(this);
//   this.badgenumber = '1234';
// }

// util.inherits(Policeman, Person);

// var officer = new Policeman();
// officer.greet(); // Hello, undefined undefined
// 'use strict';

// class Person {
//   constructor(firstname, lastname) {
//     this.firstname = firstname;
//     this.lastname = lastname;
//   }

//   greet() {
//     console.log(`Hello, ${ this.firstname } ${ this.lastname }`);
//   }
// }

// var john = new Person('John', 'Doe');
// john.greet();

// var jane = new Person('Jane', 'Doe');
// jane.greet();

// console.log(john.__proto__);
// console.log(jane.__proto__);
// console.log(john.__proto__ === jane.__proto__);

// 'use strict';

// var Greetr = require('./greet');

// var greeter1 = new Greetr();

// greeter1.on('greet', function(data) {
//   console.log('someone greeted: ' + data);
// });

// greeter1.greet('Bennett');

// var buf = new Buffer('Hello', 'utf8');

// console.log(buf); // ==> <Buffer 48 65 6c 6c 6f>
// console.log(buf.toString()); // ==> Hello
// console.log(buf.toJSON()); // ==> { type: 'Buffer', data: [ 72, 101, 108, 108, 111 ] }

// console.log(buf[2]); // ==> 108

// buf.write('wo');
// console.log(buf.toString()); // ==> wollo

// var buffer = new ArrayBuffer(8); // 8 bytes, or 64 bits -- this is a feature within the V8 JS engine, not Node
// // How to deal with data -- create a view that deals with the data as an array -- if we change the array, we change the buffer
// var view = new Int32Array(buffer); // a typed array converts a buffer into whatever structure we indicate, an integer stored with 32 0s and 1s, but we can only store two numbers in the array
// view[0] = 5;
// view[1] = 15;
// view[2] = 30; // this will not exist in the buffer because we only allocate for two spots in 
// console.log(view); // ==> Int32Array { '0': 5, '1': 15 }

// quick section on callbacks and passing data to them
// function greet(callback) {
//   console.log('Hello!');
//   var data = {
//     name: 'John Doe'
//   }
//   callback(data);
// }

// greet(function(data) {
//   console.log(data)
// });

// greet(function(data) {
//   console.log('A different callback was invoked.')
//   console.log(data.name);
// });

// fs file system module, buffers, streams

// var fs = require('fs');

// var greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');

// console.log(greet); // ==> Hello world!

// var greet2 = fs.readFile(__dirname + '/greet.txt', 'utf8', function(err, data) {
//   if (err) {
//     throw err;
//   }
//   console.log(data); // ==> <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64 21>, 
// //   unless we include the encoding as the second function parameter
// });

// console.log('Done!');

//==> Hello world!
//==> Done! 
//==> Hello world!

// Final console.log runs before the asynchronous call to read the file -- V8 moves on until async callback is ready to be invoked)

//Use readable and writable streams to copy file contents from one file to another


// var fs = require('fs');

// var readable = fs.createReadStream(__dirname + '/greet.txt', { encoding: 'utf8' , highWaterMark: 16 * 1024 });

// //Look at the documentation for all the events emitted by the ReadStream

// var writable = fs.createWriteStream(__dirname + '/greet.txt');

// readable.on('data', function(chunk) {
//   console.log(chunk); // reads entire file to console
//   writable.write(chunk); // write the data chunk to the greetcopy.txt file
// });

//Using the concept of pipes to accomplish the same thing
// var fs = require('fs');
// var zlib = require('zlib');

// var readable = fs.createReadStream(__dirname + '/greet.txt');
// var writable = fs.createWriteStream(__dirname + '/greet.txt');

// var compressed = fs.createWriteStream(__dirname + '/greet.txt.gz');

// var gzip = zlib.createGzip(); // this creates a Tranform stream that takes in chunks of data and alters them before sending out

// readable.pipe(writable);

// readable.pipe(gzip).pipe(compressed);
//This will create a readable stream from greet.txt, and on every chunk of data, compress the chunk using gzip, then pipe the compressed result to the compressed write stream to the greet.txt.gz file.

// Creating a web server with Node
// var http = require('http');

// http.createServer(function(req, res) {
//   // event listener -- when the server emits a 'request' event, it also passes along two objects, req (the request) and res (an object that represents the stream of data to be sent in response)

//   // a response begins with what's in the head
//   res.writeHead(200, { 'Content-Type': 'text/plain' })

//   // the end method tells the server that this is the last thing you are sending, to end the response after it's sent
//   res.end('Hello world\n');

// }).listen(1337, '127.0.0.1');

// Now we'll use web server to send files to browser in response
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res) {
 
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   // get the contents of the file and read it synchronously into a string
//   var html = fs.readFileSync(__dirname + '/index.htm', 'utf8');
//   // send the string and end the response
//   res.end(html);

// }).listen(1337, '127.0.0.1');

// And now we'll address templating, dynamically adding values in our server-side code that will be rendered in the html
// We have replaced 'Hello World' with { Message } in our index.htm
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res) {
 
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   // we need to tell the file system what character encoding we want to use
//   var html = fs.readFileSync(__dirname + '/index.htm', 'utf8');
//   // tell Node to look for a particular pattern, in this case what's marked off by {}, and replace it with our variable
//   var message = 'Hello world...'
//   html = html.replace( '{ Message }', message);
//   // send the string and end the response
//   res.end(html);

// }).listen(1337, '127.0.0.1');

// Rather than synchronously reading the file, let's create a stream and pipe the file data instead
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res) {
 
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   fs.createReadStream(__dirname + '/index.htm').pipe(res);

// }).listen(1337, '127.0.0.1');

// Now we'll return data in response as JSON
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res) {
 
//   res.writeHead(200, { 'Content-Type': 'application/json' })
//   var obj = {
//       firstname: 'John', 
//       lastname: 'Doe'
//   };
  
//   // if we were just to res.end(obj), the browser would just get a string representation
//   // of the object, i.e. [object Object], so we can instead convert the object into a 
//   // string with JSON.stringify
//   res.end(JSON.stringify(obj));

// }).listen(1337, '127.0.0.1');

// Now we'll address handling requests to specific URL endpoints and add in some error handling

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
   
  if (req.url === '/') {
    fs.createReadStream(__dirname + '/index.htm').pipe(res);
  }
  
  else if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var obj = {
        firstname: 'John', 
    lastname: 'Doe'
    };    
    res.end(JSON.stringify(obj));
  }
  
  // if a URL that doesn't exist is requested, send 404 status and send no data
  else {
    res.writeHead(404);
    res.end();
  }

}).listen(1337, '127.0.0.1');
















