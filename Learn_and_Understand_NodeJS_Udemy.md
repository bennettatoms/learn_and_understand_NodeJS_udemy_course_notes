# Learn and Understand NodeJS
Highly recommended [Udemy course](https://www.udemy.com/understand-nodejs/#/) by Antony Alicea

The course is peppered with *conceptual asides* that add context to the course instruction.
Conceptual Aside - an idea we need to understand in order to better understand NodeJS

#### The Command Line Interface (CLI)
A utility to type commands to your computer rather than clicking

Bash on Linux, Terminal on Mac, Command Prompt on Windows

Arguments -- values you give your program that affect how it runs (essentially passing parameters to a function)

## V8: The JavaScript Engine

### JavaScript Aside: Understanding Processors, Machine Code, and C++

*Microprocessor* - a very small machine that works in tandem with electircal inputs to do a job.

Each microprocessor generally speaks a given language: IA32, ARM, MIPS, etc. Accepts instructions in this language and carries them out.

*Machine code* - instructions given directly to a machine. Every program run on a computer has been converted (or compiled) into machine code, because a machine is what has to carry out the job

Why don't we write machine code directly? Tends to be pretty difficult to understand and extremely low level (e.g. how to handle given bits of memory)

            JavaScript (higher level of abstraction)

                \/

               C/C++

                \/

        Assembly Language

                \/

          Machine Language (lowest level of abstraction)


Node is written in C++. Node programs are written in JS, but Node itself is written in C++, because google's JS engine, V8, is also written in C++.

*ECMAScript* is the standard that JS is based on -- to try to standardize between different browsers running different JS engines

JavaScript is the actual language, ECMAScript is the standard/specification for how the language works, though they're often used interchangeably.

A *JavaScript engine* is a program than converts JS code into something that a computer processor can understand, and it should follow the ECMAScript standard on how the language should work and what features it should have.

### V8 under the hood

Google's V8 engine is open source to look at, use, even change for your own purposes -- [source](https://github.com/v8/v8/wiki)

Highly performant and really useful

### Adding features to JavaScript

V8 can run standalone, or it can be embedded into any C++ application
	--> there's a guide to embedding V8 in your program
	--> there are hooks that we can use in a C++ program to add features to JS (write C++ code in your own program and make it available to JavaScript).

This is powerful because C++ has many more features as a language than JavaScript, which was designed for high-level operations within the browser.
Not dealing with files and folders sitting on a hard drive, or connecting directly to a database.

Review: Node is a C++ program with V8 embedded that has added features to JS to make it a server-appropriate technology

## The Node Core

### Servers and Clients

The *Client-Server Model of Computing*

Server performs services requested of it (sends responses)

Client asks for services (sends requests)

*Responses* and *Requests* are in some standard format

*Web Server* - a computer connected to the internet accepting requests for data or work

*Browser* - usually the client, communicating with server

The *standard internet format for requests and responses is HTTP*.

JavaScript is the language of the browser, but...
If you have used jQuery to manipulate the DOM (seize and manipulate HTML elements after they've been made available to memory), or made XmlHTTPRequests (XHR), you've done things that exist outside of the ECMAScript standard.

These are functionalities that have been added in the C++ programs that are browser engines.

(One of) the goal(s) with Node is to write JavaScript on the server, so you can write the full stack in a single language.

### What does JS need to manage a server

	1) Better ways to organize our code into reusable pieces
	2) Ways to deal with files
	3) Ways to deal with databases
	4) The ability to communicate over the internet
	5) The ability to accept requests and send 	responses
	6) A Way to deal with work that takes a long time

#### The C++ Core

A core of features/utilities written in C++ and made available to JS via the hooks in the V8 engine.

There's also JavaScript in the node source (`/lib`) code. A lot of it wraps C++ objects/functionalities to JS functions/libraries.

Node is basically like the shell script in the example, where you can pass valid JavaScript into it, and it will run it through the V8 engine, along with any other C++ functionalities that have been added to it, and it will execute it.

In windows, if you add node to your PATH variable, it is available wherever you are via the command line.

### Letting Node process a file

#### Aside
Node was invented within Joyent, but it wasn't being updated as often as V8 was updated, so io.js started a separate stream to maintain their own version of Node.

So the Joyent versions of Node ran up to 0.12.7+, while io.js released 1.0, 2.0, 3.0.
When it came time to form the Node Foundation to settle on standards for Node, the Joyent and io.js crowds came together and released 4.0.

Node provides the console.log functionality that exists in the browser to so the same thing CLI node execution.

Visual studio is nice for developing in Node, because they have a debugging functionality that generates a settings script for node development.
This will run .js files in node, then listens for changes, can set breakpoints, etc.

*Breakpoint* - a spot in our code where we tell a debugging tool to pause the execution of our code so we can figure out what's going on.
Can then step through the code, line by line, to make sure that the code works properly incrementally through the whole program.

### Modules, Exports, and Require

####Aside
*Module* - a reusable block of code whose existence does not accidentally impact other code (JavaScript didn't have this before)

So, Node implemented *commonJS* modules, an agreed-upon standard for how code modules should be structured.

####Aside: First-class Functions and Function Expressions

*First-class functions* - everything you can do with other data types, strings, integers, arrays, etc., you can do with functions.
So, you can pass them around, set variables equal to them, put them in arrays, et al.

*Function Expression* - a block of code that results in a value -- function expressons are possible in JS because functions are first-class objects

*Invoke* - run the function (or call)

	// function statement
	function greet() {
  		console.log('Hi');
	}

	greet(); // invoke or call it

	// functions are first class
	function logGreeting(fn) {
 		fn();
	}

	logGreeting(greet); // call the logGreeting 							function and pass it the 							parameter of the greet 							function

	// function expression -- set variable greetMe equal to anonymous function
	var greetMe = function() {
  		console.log('Hi Bennett');
	}

	greetMe();

	//it's still first classs
	logGreeting(greetMe);

	//use a function expression on the fly
	logGreeting(function() {
  		console.log('Hello Bennett');
	});

### Let's Build a Module

the *require()* function takes a string argument, which is the location of the module you require to execute a given set of code (doesn't need the .js extension).

In order to call a function that exists inside an external module, you have to *export* it from the module.
This keeps the global namespace clean.

module.exports --> a special object where you store things you want to make available for use outside the module

greet.js:

  var greet = function() {
    console.log('Hello!');
  }
  module.exports = greet;

  another file.js (at the same directory level):
  var greet = require('./greet');

  greet(); // would have gotten a reference error if the greet() function had not been exported

objects that come with node out of the box:

this (keyword specified by ECMAScript, so included in V8 engine)

the rest are specific to node:
__dirname
__filename
exports
require

### Objects and Object Literals in JavaScript

Simplest definition, a collection of name-value pairs -- a name which maps to a value

An object sits in memory and points at other objects or other values that pair with its own properties

Primitive 'property' -- numbers and strings

Object 'property'

Function 'property' - called a method when the value of an object property is a function

Object literal -- name/value pairs separated by a colon, pairs separated by commas, and the entire set of name/value pairs set of with curly braces

Can access properties of an object with dot notation or brackets, and if brackets, you refer to the property as a string (without quotes, it looks for a variable), e.g.:

  var person = {
    firstname: 'John',
    lastname: 'Doe',
    greet: function() {
      console.log('Hello, ' + this.firstname + ' ' + lastname);
    }
  }

  person.greet() ==> 'Hello, John Doe'
  person.['greet'] ==> 'Hello, John Doe'


### JavaScript Aside: Protoypal Inheritance and Function Constructors

Inheritance -- one object gets access to the properties and methods of another object

Every object has a property that points to another object (the prototype property).

Prototype chain -- have a sequence of objects tied together that can access properties of any other in the chain

Other objects can point to the same prototype -- so how do we manage building this prototype chain?

In ES6, there is a new **class** keyword

Function constructors -- a normal function that is used to construct objects -- **new** keyword -- use capital letter to designate constructor


  function Person(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  var john = new Person('John' 'Doe');
  console.log(john.firstname); ==> 'John'

The 'this' variable points a new empty object, and that object is returned from the function automatically

How do we access the prototype, the thing that 'this' inherits from?

The prototype is just an object to which we can attach properties and methods accessible by all other objects in the prototype chain.

  Person.prototype.greet = function () {
    console.log('Hello ' + this.firstname + ' ' + this.lastname);
  };

Now any object created from the function contructor, it's prototype will point to the prototype property of the function that you used to construct the object.

Can now say `john.greet();` ==> 'Hello, John Doe'

Note: this is discouraged, but you can actually access the prototype property of a given object with the __proto__ property.
So for example above, could put console.log(john.__proto__);
==> greet: [Function] // would refer back to the prototype that has the greet method

Can check if two objects have the same prototype with ===:

  var john = new Person('John' 'Doe');
  var jane = new Person('Jane' 'Doe');
  john.__proto__ === jane.__proto__ // true


### Pass By Reference and By Value

Primitive -- a type of data that represents a single value like a number or a string (basically not an object)

Example: passing a value to a function as a parameter

say we have a variable a that points to a primitive value somewhere in memory (a particular memory address)


and we have a function that takes a parameter b (or same thing if we set variable b = a):
  function doSomething(b) {
    console.log(b);
  }

and we pass that function variable a as a parameter:

  doSomething(a);

A copy of variable a's primitive value is created in memory, so that b points to a new location in memory that holds the copied value.
This is called 'by value', passing by value.

But something different happens with objects

If a instead pointed to an object, a collection of name-value pairs, that also sits at a particular location in memory, and we set b = a (or pass a to a function), b now points to the same location in memory that our original variable does.

This is called pass 'by reference', so when you change one, you change the other as well.

Example:

  function change(b) {
    b = 2;
  }

  var a = 1;
  change(a);
  console.log(a); // 1


  function changeObj(d) {
    d.prop1 = function () {};
    d.prop2 = {};
  }

  var c = {};
  c.prop1 = {};
  changeObj(c);
  console.log(c); //{ prop1: [Function], prop2: {} }

NodeJS takes advantage of pass by reference with object in regards to how modules and require works.


### Immediately Invoked Function Expressions (IIFEs)

A fundamental aspect of how modules work

Code that is protected -- code written inside a module doesn't affect any of the code throughout the rest of the software

Scope -- where in code you have access to a particular variable or function

IIFEs -- similar to how you can write a string or a number, then a dot, and immediately have access to all the methods that work on strings/number ('John'.length)

  (function() {
    var firstname = 'John';
    console.log(firstname);
  })();

Wrapping the function in parentheses tells the JS engine that the above is a function expression rather than a function statement.

Any variables or functions you create within the function are scoped to/only accessible within that function.

This is the basis of the module pattern JS developers use to prevent unintended collisions of variables outside of the current module.

One other note -- you can pass parameters to the IIFE just like you normally would, within the parentheses that invoke the function:

  (function(lastname) {
   console.log(lastname);
  })('Doe');

So, how do modules in NodeJS (and require) actually work?

## module.exports and require

if you debug the require function as it runs, you can follow the code path Node takes to make one file's code available to another

module.js -- makes sure the require function's parameter is a string, and assumes the extension is .js (have to specify if not .js)

Module.prototype.require -- a wrapper for a load function -- sets up an object with some properties you can use, like filename and dirname

  var module = new Module(filename, parent); // creates a new Module object representing our file

this new module object natively has a number of properties: id, filename, parent, children, and exports (empty until you specify module.exports = ...)

Then node actually loads the contents of the file -- node will support loading files with extensions .js, .json, .node, and each module object also has a ._extensions property that has .js, .json, and .node properties of its own, each of which is a function that tells node how to handle a given file type.

Reads (with fs.readFileSync) and compiles (sends through the V8 engine) the code.

Then node creates a wrapper function that takes our JS content and wraps it in some other code that makes the compiler work.

  NativeModule.wrap = function(script) {
    return NativeModule.wrapper[0] + script +  NativeModule.wrapper[1];
  }

In the above function, the script is our code, and Node concatenates it with the NativeModule.wrapper elements at indices 0 and 1, which are stringified code.

  NativeModule.wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
  ];

Everything we write in Node is wrapped by the above expression and run accordingly in V8.

When the function is invoked by the following:
    ...
    var args = [self.exports, require, self, filename, dirname];
    return compiledWrapper.apply(self.exports, args);
  }

Aside about apply() -- the first parameter of apply tells you what the this keyword should refer to, and the second is an array-like object of arguments that should be provided to the function

As it is compiled, it runs through our code, so our module.exports object or function is essentially overwriting the exports object on the new instance of Module that has just been created.

At the end of the chain, it returns module.exports, so when we set:

  var greet = require('./greet');

... greet is now a variable that refers to the module.exports object property (passed by reference).

This is why our scope is protected -- the module object is passed by reference, so when we change the module.exports, we are changing the object in its memory location, which then changes it for all references to it as well.


To summarize:

1) require is a function, that you pass a 'path' to
2) module.exports is what the require function returns
3) This works because **your code is actually wrapped in a function** that is given these things as function parameters


### More on require()

If node doesn't find a given filename with the .js extension, it will then look for a folder by the same name, and look for index.js inside of that.

<em>greet/english.js:</em>

  var greet = function() {
    console.log('Hello');
  };

  module.exports = greet;

<em>greet/spanish.js:</em>

  var greet = function() {
    console.log('Hola');
  };

  module.exports = greet;

<em>greet/index.js</em>

  var english = require('./english');
  var spanish = require('./spanish');

  module.exports = {
    english: english,
    spanish: spanish
  };

^^^ an object with two methods on it

so we can require greet elsewhere, like so:

  var greet = require('./greet');
    // now greet is the exported object in the index.js file above

  greet.english(); // logs 'Hello'
  greet.spanish(); // logs 'Hola'

We'll add one more feature to use node's ability to process a .json file:

<em>greetings.json</em>

  {
    "en": "Hello",
    "es": "Hola"
  }

Node/Js can read the json and convert it into an object.

We can go back to <em>greet/english.js</em>:

  var greetings = require('./greetings.json');

  var greet = function() {
    console.log(greetings.en)
  };

  module.exports = greet;

and in <em>greet/spanish.js</em>:

  var greetings = require('./greetings.json');

  var greet = function() {
    console.log(greetings.es)
  };

  module.exports = greet;

## Module Patterns

A few different ways to structure our modules in nodeJS


#### Example one
<em>greet1.js:</em>

  module.exports = function() {
    console.log('Hello world')
  };

^^^ module.exports is an empty object when we get it, so we are basically replacing exports with a function

<em>app.js:</em>
  var greet1 = require('./greet1');

  greet1();


#### Example two
<em>greet2.js:</em>

  module.exports.greet = function() {
    console.log('Hello world')
  };

^^^ module.exports is an empty object when we get it, but now we've added a method to the exports object

<em>app.js:</em>
  var greet2 = require('./greet2');
  greet2.greet(); // greet2 represents the module.exports object

--OR--

  var greet2 = require('./greet2').greet;
  greet2();


#### Example three

<em>greet3.js:</em>

Use a function constructor:

  function Greetr() {
    this.greeting = 'Hello world!!';
    this.greet = function() {
      console.log(this.greeting);
    };
  }
  module.exports = new Greetr();

<em>app.js:</em>
  var greet3 = require('./greet3');
  greet3.greet();
    // greet3 represents the module.exports object, a new instance of the Greetr object

So, what happens when we require the exact same file over again, e.g.:
var greet3b = require('./greet3');

It's actually the same object called again, so if the object changes, the second invocation pertains to the changed object.

So if we did:
  var greet3 = require('./greet3');
  greet3.greet(); // 'Hello world!!'
  greet3.greeting = 'Changed hello world.'

  var greet3b = require('./greet3');
  greet3b.greet(); // 'Changed hello world.'

It's because node looks for a cached module with the given filename, so subsequent invocations refer back to the original cached module.
Even though the module.exports line calls new Greetr(), it is only ever run one time.
Makes things very efficient, and allows you to create objects you can use and reuse across your application.


#### Example four

<em>greet4.js:</em>

Use a function constructor again...

  function Greetr() {
    this.greeting = 'Hello world!!!';
    this.greet = function() {
      console.log(this.greeting);
    };
  }
  module.exports = Greetr;

^^^ ...but instead of creating a new Greetr on the exports object, we give the exports object the ability to create new instances

<em>app.js:</em>
  var Greet4 = require('./greet4');
  var grtr = new Greet4(); // invoke the constructor function (used capital letters for clarity)

  grtr.greet();

#### Example five

<em>greet3.js:</em>
*Revealing Module Pattern* - exposing only the properties and methods you want via a returned object -- helpful to protect code within a module.

Very common JavaScript design pattern -- only expose the function, not the variable, so will not have access to the greeting variable outside the module:

  var greeting  = 'Hello world!!!!';

  function greet() {
    console.log(greeting);
  }

  module.exports = {
    greet: greet
  }

<em>app.js:</em>
  var greet5 = require('./greet5').greet;
  greet5(); // logs 'Hello world!!!!'


## Exports vs. Module.Exports

remember that our code in node is wrapped in the following function:

  (function(exports, require, module, __filename, __dirname) {
    //code
  })

  fn(module.exports, require, module, filename, dirname);

  return module.exports;

What is the first parameter, exports? It's a shorthand to module.exports -- points to the same object in memory.

The exports object does not work for all of the patterns we just looked at.


<em>greet.js:</em>

  exports = function() {
    console.log('Hello');
  }

  console.log(exports);
  console.log(module.exports);

<em>app.js:</em>

  var greet = require('./greet');

  ==> [Function]
  ==> {}

module.exports points to an object in a particular location in memory, but exports is actually set = the value of the object, so a new location in memory is apportioned to store the new object.

If you tried to run greet() in app.js as a function, you would get a TypeError, object is not a function, because greet points to module.exports (because that's what is returned from the function wrapper), not exports.

So we cannot overwrite exports, but we can mutate it (add property to it):

<em>greet2.js:</em>

  exports.greet = function() {
    console.log('Hello');
  };

  console.log(exports);
  console.log(module.exports);

<em>app.js:</em>

  var greet = require('./greet');

  ==> { greet: [Function] }
  ==> { greet: [Function] }

**Just use module.exports, so you don't have to keep the quirk in mind.**

## Requiring Native (Core) Modules

see https://nodejs.org/api for documentation on how to use core modules and what they do

ex. `var util = require('util');`
// if the string in quotes with no file directory location reference matches a core module (NativeModule.exists(module)), that's what node will export for use in your module

For example, node's util module has a bunch of utility functions, e.g.:
  var name = 'Bennett';
  var greeting = util.format('Hello, %s', name); // 'Hello, Bennett'

util uses replace codes like '%s' to replace strings, etc., in the order they appear in the first argument.

  var name = 'Bennett';
  var age = 35;
  var greeting = util.format('Hello, %s, I am %d years old', name, age);

If you name your own module the same as a core module, that's ok, though not recommended, because you'll still have to specify a location to require your custom module.

## Modules and ES6

ES6 modules are already being integrated into/supported by browser JS engines, so more and more we'll be using ES6 modules rather than node modules.
Node modules won't be going away, though.

The new syntax for ES6 modules is as follows, in greet.js:
  export function greet() {
    console.log('Hello');
  }

in app.js:
  import * as greetr from 'greet';
  greetr.greet();

## Web server checklist progress
  * Better ways to organize our code into reusable pieces
    √ modules, exports, and require
  * Ways to deal with files
  * Ways to deal with databases
  * The ability to communicate over the internet
  * The ability to accept requests and send responses
  * A Way to deal with work that takes a long time

## Events and the Event Emitter

Events are a foundational aspect of NodeJS

What do we mean when we talk about events?
Something that has happened in our app that we can respond to
Actually, there are two different kinds of events in NodeJS -- potentially tied in together, but they don't have to be.

1) System events -- from the C++ core (libuv), events coming from the computer system -- like 'finished reading file' or 'data transmission complete'

2) Custom events -- inside the JavaScript core (event emitter), and we can create them for ourselves

The system events do generate event emitter-emitted events as well, which is why it's easy to lump them together.

The JavaScript event emitter is really a hack, because there is no native concept of 'events' in JS.


### JavaScript aside (object properties, first-class functions, and arrays)

  // object properties and methods
  var obj = {
    greet: 'Hello'
  }

  console.log(obj.greet);
  console.log(obj['greet']);
  var prop = 'greet'
  console.log(obj[prop]);

  // functions and arrays

  var arr = [];

  arr.push(function() {
    console.log('Hello world 1');
  });
  arr.push(function() {
    console.log('Hello world 2');
  });
  arr.push(function() {
    console.log('Hello world 3');
  });

  arr.forEach(function(item) {
    item();
  })

Important concepts to keep in mind illustrated above:

1) That we can use bracket notation to dynamically grab/set object properties via variables

2) Because functions are first-class objects in JS, we can put functions into an array, loop through that array, and invoke all functions within it

## The Node Event Emitter -- Part 1

Important concept: event listener -- the code that responds to an event (which, in JavaScript, will be a function)

We'll create our oown emitter module, emitter.js:

  function Emitter() {
    this.events = {};
  }

  Emitter.prototype.on = function(type, listener) {
    // if the property already exists, great, but if not,
    // make it an array
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  };

  Emitter.prototype.emit = function(type) {
    if (this.events[type]) {
      // if I have that property on the object, I'll loop over
      // all the event listeners in the array, and I'll execute
      // each of them
      this.events[type].forEach(function(listener) {
        listener();
      });
    }
  };

  module.exports = Emitter;

for example, if we have a 'file was saved' event that takes place, and we look to see if there is a 'file was saved' property on the object, all associated event listeners in the array that is that property's value will be executed.

If we were listening for the 'file was saved' event, we would have added the object.on event listeners with the type 'file was saved' as a string, and the 'file was saved' property value an array into which we push our listener functions

app.js:

  var Emitter = require('./emitter');

  var emtr = new Emitter();

  // Side note: keep the names of the events you want to listen
  // for short and sweet, because they're actually property
  // names on the object you're modifying

  emtr.on('greet', function() {
    console.log('Someone, somewhere said hello.');
  });
  // 'greet' is the type, the function is the listener

  emtr.on('greet', function() {
    console.log('A greeting occurred.');
  });
  // 'greet' is the type, the function is the listener

  console.log('Hello!');
  emtr.emit('greet');

  // 'Hello!'
  // 'Someone, somewhere said hello.'
  // 'A greeting occurred.'

The above two functions will run as a result of emitting the 'greet' event.


## The Node Event Emitter -- Part 2

see https://nodejs.org/api/events.html

source code `/lib/events.js`:

  EventEmitter.prototype.addListener = function(type, listener) {
    // creates this._events[type] as {} if doesn't exist
    // if only one listener, sets the value to the listener function
    // if more, sets value data type to array and pushes in additional listener functions
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener

  EventEmitter.prototype.emit = function(type) {
    // uses this._events[type].call() to execute functions if there are a small number, loops through and invokes functions via apply() if large number
  };

Now, to use the native events module rather than our custom one from the above example, we would just change

  var Emitter = require('./emitter');

--to--

  var Emitter = require('events');
  var emtr = new Emitter();

One problem with the event emitter from our example -- it relies on 'magic strings'.
A magic string is a string that has some special meaning in our code -- this makes it easy for a typo to cause a bug, and it's hard for tools to help us find it.

Here's a good design pattern to reduce the likelihood of such a bug:
We can create a config file, with different configuration values, config.js:

  module.exports = {
    events: {
      GREET: 'greet'
    }
  }

and back in app.js:

  var Emitter = require('events');
  var eventConfig = require('./config').events;

  var emtr = new Emitter();

  emtr.on(eventConfig.GREET, function() {
    console.log('Someone, somewhere said hello.');
  });

  emtr.on(eventConfig.GREET, function() {
    console.log('A greeting occurred.');
  });

  console.log('Hello!');
  emtr.emit(eventConfig.GREET);

### JavaScript Aside (Object.create and prototypes)

Remember that every object may have its own properties and methods, but it also has a protoytype object that it points to, which may have other properties and methods attached.
The first object can also access any of the properties of prototype objects, and another object can also point to the same prototype object and access the same properties.

There are a number of ways to set up the prototype chain, to set up objects and what they inherit from:
1) constructor functions
2) there are classes in ES6 -- has a keyword 'extends' that accomplishes this
3) and the folllowing very simple way -- Object.create

  var person = {
    firstname: '',
    lastname: '',
    greet: function() {
      return this.firstname + ' ' + this.lastname;
    }
  }

  var john = Object.create(person);
  john.firstname = 'John'; // overwrite or block proptype property values
  john.lastname = 'Doe';

Now, if we call john.firstname, the JavaScript engine doesn't have to go far down the prototype chain to find that property because we've set it directly on the john object.
But if we call john.greet(), the engine has to go down the protoype chain to the person object to access its greet method.

  var jane = Object.create(person);
  jane.firstname = 'Jane';
  jane.lastname = 'Doe';

  console.log(john.greet()); // 'John Doe'
  console.log(jane.greet()); // 'Jane Doe'

Understanding the Object.create function is key to understanding the way by which the event emitter becomes a fundamental building block upon which a number of NodeJS's core modules are constructed.


## Inheriting from the Event Emitter

There is a util.js (in node source) method called 'inherits' that takes two constructors as arguments (ctor and superCtor), first the constructor that you want add properties and methods to be created with it, and the constructor where the properties and methods you want added are currently sitting.

  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

Example:
There is `obj2` that has properties 1 and 2, and `obj1` that has property 3. You want to give `obj1` access to properties 1 and 2.

What the inherits method does is place a new, empty prototype object between `obj1` and `obj2` to create a new protoype chain linking the two,

Now `obj1` has access to all properies (1-3).

example app.js:

  var EventEmitter = require('events'); // function contructor
  var util = require('util'); // util library

  function Greetr() {
    this.greeting = 'Hello world!';
  }

  util.inherits(Greetr, EventEmitter); // any objects created from Greetr should also have access to EventEmitter methods and properties

  Greetr.prototype.greet = function() {
    console.log(this.greeting);
    this.emit('greet'); // use emit method on Greetr/EventEmitter common prototype object (from EventEmitter superConstructor)
  };

  var greeter1 = new Greetr();

  greeter1.on('greet', function() {
    console.log('someone greeted');
  });

  greeter1.greet();
  // ==> Hello world!
  // ==> someone greeted

What if we wanted to pass some data to a prototype function?

  Greetr.prototype.greet = function(data) {
    console.log(this.greeting + ': ' + data);
    this.emit('greet', data); // emit the event, but also give it data
  };

  ...

  greeter1.on('greet', function(data) {
    console.log('someone greeted: ' + data);
  });

  greeter1.greet('Bennett');
  // ==> Hello world!: Bennett
  // ==> someone greeted: Bennett

Many objects in node inherit from (or are a type of) EventEmitter, they emit events, and you can listen for them and run code when the event happens


### JavaScript Aside: ES6 (ECMAScript 2015) and Template Literals

The latest versions of node have the latest version of V8 embedded inside it, and the latest versions of V8 have introduced support for more and more features of ES6.

So, you can write ES6 in node and take advantage of new features of the language standard, but not all users will be using browsers that support ES6.
Also, you may not have the lucury of having the latest version of node running on the server that you're pushing code to.

Can use babel to retrofit your new ES6 code to older versions of JavaScript run in older browsers.

New feature: `jsconfig.json` file
  {
    "compilerOptions": {
      "target": "ES6"
    }
  }

New feature: template literals
A way to concatenate strings in JavaScript (ES6) -- easier to work with than a bunch of strings concatenated with '+'

old:
  var name = 'John Doe';
  var greet = 'Hello, ' + name;

new (uses back tick to indicate template literal):
  var greet2 = `Hello, ${ name }`;

  console.log('ES5: ' + greet);    // ==> ES5: Hello, John Doe
  console.log(`ES6: ${ greet2 }`); // ==> ES6: Hello, John Doe


### JavaScript Aside: call() and apply() for invoking functions

  var obj = {
    name: 'John Doe',
    greet: function() {
      console.log(`Hello, ${ this.name }`);
    }
  }

  obj.greet(); // ==> Hello, John Doe

Using `call()`, you can overwrite what the <em>this</em> keyword points to:

  obj.greet.call({ name: 'Jane Doe' });   // ==>  Hello, Jane Doe

And can do the same with `apply()`;
  obj.greet.apply({ name: 'Jane Doe' });  // ==>  Hello, Jane Doe

The only difference between `call` and `apply` is that, for any parameters passed into the protoype greet function, you would pass parameters sepearated by commas:

  object.greet.call({ name: 'Jane Doe'}, param1, param2);

With `apply`, it's similar, except you pass the params as an array:

  object.greet.apply({ name: 'Jane Doe'}, [param1, param2]);


## Inheriting from the EventEmitter -- part two
Add one more piece, just one more line of code to make sure that our pattern for inheriting from the event emitter is complete

Code from above:
  var EventEmitter = require('events');
  var util = require('util');

  function Greetr() {
    // ADD THIS: EventEmitter.call(this);
    this.greeting = 'Hello world!';
  }

  util.inherits(Greetr, EventEmitter);

  Greetr.prototype.greet = function(data) {
    console.log(this.greeting + ': ' + data);
    this.emit('greet', data);
  };

  var greeter1 = new Greetr();

  greeter1.on('greet', function(data) {
    console.log('someone greeted: ' + data);
  });

  greeter1.greet('Bennett');

In our Greetr function contructor we add properties and methods directly on to the object being created (which is referenced by the <em>this</em> keyword), as opposed to properties and methods on the prototype.
But what if EventEmitter (or whatever else I'm inheriting from) adds properties to the new object, not necessarily the prototype. We are not including those.

So we add:

  function Greetr() {
    ** EventEmitter.call(this); **
    this.greeting = 'Hello world!';
  }

Since EventEmitter is a function constructor, invoking it with the <em>new</em> keyword creates an empty object and adds on its properties and methods.

But `EventEmitter.call(this)` overwrites the empty object with the object (referenced by <em>this</em>) that has been created by the Greetr function constructor. Can also use .apply().

Example:
  var util = require('util');

  function Person() {
    this.firstname = 'John';
    this.lastname = 'Doe';
  }

  Person.prototype.greet = function() {
    console.log('Hello, ' + this.firstname + ' ' + this.lastname);
  }

  function Policeman() {
    this.badgenumber = '1234';
  }

  util.inherits(Policeman, Person);

  var officer = new Policeman();
  officer.greet(); // Hello, undefined undefined

Why did firstname and lastname come up undefined, but the greet function was still available to the officer object?
Because the util.inherits function just connected the prototypes of Person and Policeman, but the actual Person function contructor itself, which directly attach properties and methods onto new objects they construct (here, the firstname and lastname), never gets run.
So you have to add `Person.call(this);` to run the Person constructor and give the new Policeman object Person's properties.

  function Policeman() {
    Person.call(this);
    this.badgenumber = '1234';
  }

The above is a pattern you see a lot when objects are created that inherit from other objects, but ES6 allows another way to accomplish the same thing...

### JavaScript Aside: ES6 Classes

A new way to write code in ES6, though it doesn't really change anything under the hood of the language

Syntactic sugar -- a feature that only changes how you type something, but nothing really changes under the hood

Important to understand, so we don't make decisions based on flawed assumptions .

We can take the earlier Person example and modify it to include the concept of ES6 classes:

  'use strict'; // have to have this in order to  be able to write ES6 in some versions of node

  class Person {
    constructor(firstname, lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
    }

    greet() {
      console.log(`Hello, ${ this.firstname } ${ this.lastname }`);
    }
  }

  var john = new Person('John', 'Doe');
  john.greet(); // ==> 'Hello, John Doe'

  var jane = new Person('Jane', 'Doe');
  jane.greet(); // ==> 'Hello, John Doe'

  console.log(john.__proto__); // ==> Person {}
  console.log(jane.__proto__); // ==> Person {}
  console.log(john.__proto__ === jane.__proto__); // ==> true



Anything you add to the class inside the constructor works like a function constructor (creates new empty object <em>this</em> with properties and methods on it).

Any other methods added inside the class are put on the prototype of the object.

The idea of classes exists in other languages, so developers coming from other languages may have some misconceptions about what classes are actually doing in JavaScript -- really just taking advantage of the prototype chain under the hood.


## Inheriting from the EventEmitter -- part three

Updating our previous inheritance with ES6 classes:

  'use strict';

  var EventEmitter = require('events');
  // var util = require('util'); -- don't need this anymore

  class Greetr extends EventEmitter {
    constructor() {
      super(); // this serves the same purpose as EventEmitter.call(this)
      this.greeting = 'Hello world!';
    }

    greet(data) {
      console.log(`${ this.greeting }: ${ data }`);
      this.emit('greet', data);
    }

    // EventEmitter.call(this); -- get rid of this
  }

  // util.inherits(Greetr, EventEmitter); -- get rid of this

  // Greetr.prototype.greet = function(data) {
  //   console.log(this.greeting + ': ' + data);
  //   this.emit('greet', data);
  // }; -->

  var greeter1 = new Greetr();

  greeter1.on('greet', function(data) {
    console.log('someone greeted: ' + data);
  });

  greeter1.greet('Bennett');


How to use the class concept in node? example greet.js:
Just export the class and set it equal to a variable in a different module, then call new -variable name-();

  'use strict';

  var EventEmitter = require('events');

  module.exports = class Greetr extends EventEmitter {
    constructor() {
      super(); // this serves the same purpose as EventEmitter.call(this)
      this.greeting = 'Hello world!';
    }

    greet(data) {
      console.log(`${ this.greeting }: ${ data }`);
      this.emit('greet', data);
    }
  };

app.js:
  'use strict';

  var Greetr = require('./greet');

  var greeter1 = new Greetr();

  greeter1.on('greet', function(data) {
    console.log('someone greeted: ' + data);
  });

  greeter1.greet('Bennett');


## Asynchronous Code, Libuv, the Event Loop, Streams, and More

### JavaScript Aside: JavaScript Is Synchronous

Asynchronous -- More than one process is running simultaneously
Synchronous -- One process executes at a time

JavaScript is designed to be run one line of code at a time.
However, while V8 is running and converting JavaScript code, node or the browser is free to be doingand responding to other things.

### Conceptual Aside: Callbacks

A callback is a function passed to another function, which we assume will be invoked at some point.
The outer function 'calls back', invoking the inner function you gave it when it's done doing its work.
Callbacks as a concept exist in many languages, in Libux we'll see them in a C/C++ context.

### Libuv, the Event Loop, and Non-blocking Asynchronous Code

Remember that there are two different, but often conflated types of events:

  1) System events -- handled by the C++ core (actually handled by a C library called libuv within C++) -- events that come from the operating system, closer to the machine

  2) Custom events -- handled by the JavaScript core and the Event Emitter

libuv connects by requesting something from the operating system (open a file, send out something over the internet, etc.), and when the OS finishes, it puts a sort-of "DONE" message in the event queue.
libuv has an event loop that is constantly checking which events have completed before firing off new requests to the OS.
When it sees that something is "DONE", libuv sends a callback to V8 to let it know it's done.
V8 will wait to run this callback code until it finishes with its current code operation.

Though V8 runs synchronously, one line of code at a time, the overall process of events management by libuv interacting with V8 is asynchronous, non-blocking.
V8 is allowed to finish what it's doing before handling the libuv-issued callback.

### Conceptual aside: Non-blocking
Non-blocking means doing other things without stopping your program from running.
This is made possible by Node doing things asynchronously.

A blocking process would be, for example, telling the OS to go get a file and read it into memory for use by the program, and the entire program would hang up until the entire file was loaded into memory.
This may not be noticeably slow for one user, but with many concurrent users, it could slow things down terribly.

The system events handled by libuv are typically also related by the Event Emitter on the JavaScript side so that we can write and run custom functions when those events occur.

The idea of having multiple sets of code running simultaneously is difficult to wrap one's head around, so Node allows us to write JavaScript that is synchronous as if it were asynchronous.

[libuv documentation](libuv.org) -- can look in core.c file to see how the event loop works (it's actually a while loop in c)

### Conceptual Aside: Streams and Buffers

Buffer -- a temporary holding spot for data being mopved from one place to another -- literally just a spot in memory to allow us to gather some data and move it along -- will have a limited size, and is generally  moving through a stream

Stream -- a sequence of data made available over time -- pieces of data that eventually combine into a whole

e.g. streaming a movie, you're actually watching a video as it is being downloaded

Sometimes we refer to the same things with the terms stream and buffer -- e.g. watching a video, buffering is gathering enough data from the stream to go ahead and process it (watch some portion of the video)

### Conceptual Aside: Binary Data, Character Sets, and Encoding

Binary Data -- data stored in binary, 0s and 1s -- the core of the math that computers are based on -- data is stored in bits (binary digits) -- also known as Base 2...

    0      1     0      1
   2^3    2^2   2^1    2^0
   (8)    (4)   (2)    (1)

So, 0101 ==> 5

Binary only needs two digits to represent numbers, so perfect for computers.
With DVDs and CDs, the laser scans the disc as it spins, there are tiny bumps that represent 1s and flat places representing 0s.
Light switches in houses have transistors that are either switched on (1) or off (0).

Character Set -- a representation of characters as numbers -- UniCode, ASCII -- all characters have a number assigned to them

   h      e     l     l     o
  104    101   108   108   111 (Unicode)

Character Encoding -- how characters are stored in binary

     h           e           l           l           o
    104         101         108         108         111 (Unicode)

  ==> character encoding (e.g. UTF-8)

  01101000    02200101    01101100    01101100    01101111 (UTF-8)

When dealing with a server, you need to be able to deal with character encoding -- JavaScript traditionally doesn't have a robust mechanism to deal with binary data -- Node improved JavaScript's ability to deal with it


## Buffers
[Buffers](https://nodejs.org/api/buffer.html) are how Node deals with binary data.

"Prior to the introduction of TypedArray in ECMAScript 2015 (ES6), the JavaScript language had no mechanism for reading or manipulating streams of binary data.
The Buffer class was introduced as part of the Node.js API to make it possible to interact with octet streams in the context of things like TCP streams and file system operations."

The buffer is created on the C++ side of the source code and converted to objects that JavaScript can interpret.

"Instances of the Buffer class are similar to arrays of integers but correspond to fixed-sized, raw memory allocations outside the V8 heap.
The size of the Buffer is established when it is created and cannot be resized.

The Buffer class is a global within Node.js, making it unlikely that one would need to ever use require('buffer')."
We do have to give it some data and specify the encoding (defaults to utf-8 if we leave it off).

"Buffers are commonly used to represent sequences of encoded characters such as UTF8, UCS2, Base64 or even Hex-encoded data.
It is possible to convert back and forth between Buffers and ordinary JavaScript string objects by using an explicit encoding method.""

Can use utf-8, hex, utf161e, ucs2, etc.

app.js:

  var buf = new Buffer();

  var buf = new Buffer('Hello', 'utf8');

  console.log(buf); // ==> <Buffer 48 65 6c 6c 6f>
  console.log(buf.toString()); // ==> Hello
  console.log(buf.toJSON()); // ==> { type: 'Buffer', data: [ 72, 101, 108, 108, 111 ] }

The buffer behaves somewhat like an array, so can grab a particular piece of data within a buffer with brackets.
console.log(buf[2]); // ==> 108

Can overwrite certain pieces of data:
  buf.write('wo');
  console.log(buf.toString()); // ==> wollo

Buffer is set up to hold five characters, so writing 'wo' overwrote the first two.


### JavaScript Aside: ES6 Typed Arrays

Won't be using these in the course, but good to know about.
Allows JavaScript to deal with binary data.

Byte -- 8 bits


  var buffer = new ArrayBuffer(8); // 8 bytes, or 64 bits -- this is a feature within the V8 JS engine, not Node
  // How to deal with data -- create a view that deals with the data as an array -- if we change the array, we change the buffer
  var view = new Int32Array(buffer); // a typed array converts a buffer into whatever structure we indicate, an integer stored with 32 0s and 1s, but we can only store two numbers in the array
  view[0] = 5;
  view[1] = 15;
  view[2] = 30; // this will not exist in the buffer because we only allocate for two spots in
  console.log(view); // ==> Int32Array { '0': 5, '1': 15 }


### JavaScript Aside: Callbacks

app.js:

  function greet(callback) {
    console.log('Hello!');
    var data = {
      name: 'John Doe'
    }
    callback(data);
  }

  greet(function(data) {
    console.log(data)
  });

  greet(function(data) {
    console.log('A different callback was invoked.')
    console.log(data.name);
  });

Callback -- pass a function to another function to be invoked later -- can pass the callback function data that is created or accessed in the outer function -- e.g. pull document from database and have the callback do something with the data


## Files and fs

Tie together buffers, libuv, streams with the file system module that's built into node (C++ code)

  var fs = require('fs');

  // we'll be dealing with binary data in reading the file, so we need to provision for that -- first we'll use readFileSync, which takes two parameters, first the location of the file, and second (optionally) the character encoding

  var greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8') // in the same directory we're in -- remember dirname is a property on the object created by Node

  // Looking at the Node source for fs.readSync method, it takes buffer as a parameter because it needs to load the data in the file into a buffer to deal with the binary nature of it.

  console.log(greet);

This is a synchronous method of reading a file -- Node will wait until the read is complete before running any other code.
There are valid use cases where you'd want to use synchronous reading, like when reading a configuration file before proceeding.
But in most cases, the most performant option will be to read files asynchronously.
You could have many simultaneous users requesting the same code to be run, and the app will slow down, especially if the file is very large.

  var greet2 = fs.readFile(__dirname + '/greet.txt', function(err, data) {
    if (err) {
      throw err;
    }
    console.log(data); // ==> <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64 21>
  });

  console.log('Done!');

  // When the event is complete -- libuv gets notification that the operating system is finished -- then it will run the callback.

What comes back by default is a buffer -- which we can convert using `buffer.toString()`, or we can include the encoding parameter in the function arguments so that Node will interpret the buffer for us.

### Error-first Callback
Callback that takes an error object as its first parameter -- will be null if there is no error, otherwise will contain an object defining the error.
This is a standard so we know in what order to place our parameters for our callbacks.

The above functions return when run:
  //==> Hello world!
  //==> Done!
  //==> Hello world!

The final console.log runs before the asynchronous call to read the file -- V8 moves on until async callback is ready to be invoked

The idea of asynchronous code can be difficult, but you should always lean in the async direction because it will make your application much more performant.

**One problem with the above code:**
All the data returned from the file is sitting in a buffer, and if many users are requesting large files that get converted into buffers, you'll have a bunch of buffers clogging up your available memory.

This could end up being a huge problem when you put your app out into the real world, so how to minimize the amount of data sitting in buffers at any given time?
...Streams

## Streams

How does Node deal with streams, a sequence of pieces of data (broken up into chunks)

### Chunk
A piece of data being sent through a stream.

Helpful to look at the stream.js file inside the Node source code.

The Stream() constructor is what is exported from the module, and Streams extend EventEmitter -- so any streams that are created have access to methods like 'on' and 'emit'.

There are a variety of types of streams:
  1) Readable
  2) Writable
  3) Duplex -- can read and write
  4) Transform -- written to the stream, transformed, and different when read
  5) PassThrough

And each type of stream inherits from Stream, which in turn inherits from EventEmitter.
Streams are merely a base or abstract class:

### Abstract (base) class -- a type of constructor you never work directly with, but inherit from.
We create new custom objects which inherit from the abstract base class.

The Stream prototype chain looks like:
EventEmitter.prototype <-- Stream.prototype <-- Stream.Readable.prototype <-- Custom stream

There is documentation in the Node API about how to create your own stream to suit your needs.

Readable vs. Writable (from Node's perspective)
If readable, then Node can read from the stream of data
If writable, then Node can send information to the stream
If duplex, Node can do either.
If transform, Node can change the data along the way.

e.g. take the browser-server relationship:

the browser sends a request to Node, which to Node is only readable.
In response, Node sends data, which to Node is writable

We never work directly with the stream, but take a look at the fs.js module to see a hard example of how to utilize streams.

  fs.createReadStream = function(path, options) {
    return new ReadStream(path, options);
  };

ReadStream inherits from Stream.Readable

In the example, he generates a 61 kB file of lorem ipsum text and saves as greet.txt, then in app.js:

  var fs = require('fs');

  var readable = fs.createReadStream(__dirname + '/greet.txt', { encoding: 'utf8' , highWaterMark: 16 * 1024 });

  //Look at the documentation for all the events emitted by the ReadStream

  readable.on('data', function(chunk) {
    console.log(chunk); // reads entire file to console
    console.log(chunk.length); // 61608
  });

The stream will fill a buffer -- if the content of the stream are the same size or smaller than the buffer, we'll just get all the data on the data event.
But if the file size is larger than the buffer, we'll just get the first chunk.

Every time the ReadStream emits an event on data event, it will pass the data into the callback functions.

We can pass another parameter into the options object called `highWaterMark`, which is the size of the buffer we want to use to host the data.
A kilobyte is 1024 bytes, so we can set a `highWaterMark` of 32 * 1024 (32 kB), and the data will be broken into two chunks.


greetcopy.txt:
we'll use `fs.createWriteStream` to write the greet.txt stream to the copy file...

  var writable = fs.createWriteStream(__dirname + '/greet.txt');

  readable.on('data', function(chunk) {
    console.log(chunk); // reads entire file to console
    writable.write(chunk); // write the data chunk to the greetcopy.txt file
  });

We copy the files by listening for the data event and sending to the new file when the chunks come in -- this minimizes the amount of memory in use at any given instant to hold buffer data on the server.

There's an even faster and better way to read and write streams in Node...

## Pipes

A pipe is how you connect two strams by writing to one stream what is being read from another -- in Node you pipe a readable stream to a writable stream.

If the writable stream is also readable, we can then pipe the data on to another stream, and so on piping and piping wherever the data needs to go.

Pipes can be chained or connected, as long as you start with a stream that's readable and pipe to streams that are writable and readable.


The method called pipe is available on all readable streams.

  Readable.prototype.pipe = function (...) {}

Looks for data event on readable, then runs a function that is the listener, then pipes the data to a specified destination.

Finally, the pipe function returns a value, which is the destination.
It gives us the destination back, which allows us to write cleaner code.

  var readable = fs.createReadStream(__dirname + '/greet.txt');
  var writable = fs.createWriteStream(__dirname + '/greet.txt');

  readable.pipe(writable);
  // This sets our origin stream, our destination stream, the event listeners emission of 'data' to send chunks, and it returns or writable object.

If the writable stream is also readable (duplex), then we can just call .pipe() on the return value of the initial stream.

We can stream a chunk of data to anything that is a stream -- could be a file, an internet connection, or in our case, a zlib object.
zlib is a library within the node source that gzips files.
gzip is a very common and particular algorithm for compressing files.

Now we'll copy the file as before, but we'll also create a compressed gzipped version after creating an empty greet.txt.gz file:

  var fs = require('fs');
  var zlib = require('zlib');

  var readable = fs.createReadStream(__dirname + '/greet.txt');
  var writable = fs.createWriteStream(__dirname + '/greet.txt');

  var compressed = fs.createWriteStream(__dirname + '/greet.txt.gz');

  var gzip = zlib.createGzip(); // this creates a Tranform stream that takes in chunks of data and alters them before sending out

  readable.pipe(writable);

  readable.pipe(gzip).pipe(compressed);
  //This will create a readable stream from greet.txt, and on every chunk of data, compress the chunk using gzip, then pipe the compressed result to the compressed write stream to the greet.txt.gz file.

### Method Chaining
Method chaining is when a method returns an object so we can keep calling more methods.
Sometimes it returns the parent object (then it's called 'cascading'), and sometimes another object.

We should always be thinking about where we can use streams, because it reduces the buffer size and thus the demands on memory, and makes the application more performant.

**Always think about how to utilize asynchronous code and streams whenever possible to harness the performance benefits of Node.**


## Web server checklist progress
  * Better ways to organize our code into reusable pieces
    √ modules, exports, and require
  * Ways to deal with files
    √ pull binary data into a buffer to deal with it -- can deal with it synchronously or asynchronously
  * Ways to deal with databases
  * The ability to communicate over the internet
  * The ability to accept requests and send responses
  * A Way to deal with work that takes a long time
    √ use asynchronous code and the event loop to allow Node to operate as actively and responsively as possible


## HTTP and Being a Web Server

### Conceptual Aside: TCP/IP

Protocol -- a set of rules two sides agree on to use when communicating -- both the client and server are programmed to understand and use that particular set of rules, similar to two people from different countries agreeing on a language to speak in


The Client-Server Model of Computing

                      (standard format)
                          REQUEST
  (asks for services)  -------------->  (performs services)
        CLIENT                                SERVER
                       <--------------
                          RESPONSE
                      (standard format)

How do the client and server identify each other?
How is the information actually transferred? That's where TCP and IP come in.

IP -- internet protocol -- we've agreed that the sequences of numbers (the IP address) that identify computers will be how we identify each other

The web server will open a socket to communicate with the browser and send information structured in its own type of protocol.
HTTP for web, FTP for files, SMTP for emails

TCP -- transmission control protocol -- how the information is actually sent (whether structured for HTTP, FTP, SMTP) from computer to computer

TCP says we'll take information, split it into packets, and send them one at a time through the socket to the client.

Node provides the ability to access the TCP/IP features of your operating system, the ability to create a socket, etc.

In Node, we can then define the information we're trying to send.

TCP is the same concept as a stream, and Node treats these packets that are transmitted as a stream.

A separate but related idea -- the websocket -- The idea of websockets is to keep a socket connecting two computers open so that they can send information back and forth constantly.

### Conceptual Aside: How the information actually gets directly to the Node process running on a server

Port -- once a computer receives a packet, how it knows what program to send it to -- when a program is setup on the OS to receive packets from a particular port, it is said the the program is 'listening' on that port.

Browser sends a request to a web server at a particular IP address, which identifies a particular computer that could be running any number of processes (email, FTP, NodeJS), so we assign a particular port on that machine for NodeJS, and this creates a socket address, which is the IP address and the port separated by a colon.

e.g. 78.132.160.4:443 (port 443 is running NodeJS, listening for requests)

Usually we don't deal with this directly, we just have a domain name (www.google.com, for instance) that maps to a particular IP address and port.
Unsecured HTTP requests are typically sent to port 80 of a particular IP address.
NodeJS gives us the ability to declare which port we want to set up for listening for requests.

### Conceptual Aside --HTTP

HTTP -- a set of rules (and a format) for data being transferred on the web -- stands for 'hypertext transfer protocol' -- one format of various defining data being transferred via TCP/IP

Defines the structure -- all the things a message can contain, where you put different pieces of data

The browser and web server have the request and response, the standard format of which is defined by the HTTP protocol.

Responses have a status, headers (name/value pairs separated by colons -- includes the content type (or MIME type)), and a body (whatever data was requested, a JS, CSS, or HTML file typically)

MIME type -- a standard for sepcifying the type of data being sent -- stands for 'mulitpurpose internet mail extensions' -- for example, application/json, text/html, image/jpeg, et al

The browser understands that if the MIME type is an image, it should display it, if the MIME type is text/html, it should render a web page, etc.

When sendng data from Node, we can specify the MIME type, so that we can make sure the browser will interpret it properly.

## HTTP_PARSER

How do we parse HTTP requests and build HTTP responses?
There is an embedded program within Node that handles this
[http-parser documentation](https://github.com/joyent/http-parser)

A bunch of C code that gets wrapped by the JavaScript side of Node's core, and has a number of features added to it.

Can look at the module in the Node source at http.js (and also https.js).
The http module makes use o of a number of different modules embedded within Node (EventEmitter, server, agent, client, etc.), which allow it to not only respond to HTTP requests from the client, but also make requests of other computers/servers on the internet.

_http_server.js has methods like writeHead, which allows us to write our own response headers, which are just strings that get compiled.

http has a method called createServer asks for a requestListener, a function that runs whenever a request is sent, and returns a new Server(requestListener), that can handle requests and respond in the manner you indicate within your requestListener function.


## Let's Build a Web Server in Node

app.js:
  var http = require('http');

  http.createServer(function(req, res) {
    // event listener -- when the server emits a 'request' event, it also passes along two objects, req (the request) and res (an object that represents the stream of data to be sent in response)

    // a response begins with what's in the head
    res.writeHead(200, { 'Content-Type': 'text/plain' })

    // the end method tells the server that this is the last thing you are sending, to end the response after it's sent
    res.end('Hello world\n');

  }).listen(1337, '127.0.0.1'); // listen on port 1337 of the localhost

Node also needs to know which port to listen on, and the createServer method creates an object that has a .listen method to which we pass the port.

Now, when we run node app.js, the server spins up and just runs and runs, waiting for a request, which we can issue from the browser at address 'localhost:1337'.
 ==> Hello world

We can set up a breakpoint at the `res.writeHead` line and run debugger.
When we then issue a request for localhost:1337 in the browser, we pause the node code at that line and we can examine everything that the browser has built into the `req` object -- headers, socket, and so on -- and we can actually grab any of these things programmatically by accessing the properties of the req object:

the user-agent, for example, we get with req.headers.user-agent

There's also a `res` object (ServerResponse) that we can use, with a bunch of properties of its own (_events, _contentLength, _headers, output, socket, et al).

That's all it takes in Node, just a few lines of code, to create a web server that listens for requests from the browser and sends responses back.


## Outputting HTML and Templates

In the last example we got a request from the browser and issued a plaintext string as a response, but what we really want to do is issue the contents of an html file instead.

So we create a very basic index.htm file:

  <html>
    <head>
    </head>
    <body>
        <h1>Hello World</h1>
    </body>
  </html>

And we invoke the fs file system module in our app.js:
  var http = require('http');
  var fs = require('fs');

  http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' })
    // get the contents of the file and read it synchronously into a string
    var html = fs.readFileSync(__dirname + '/index.htm');
    // send the string and end the response
    res.end(html);

  }).listen(1337, '127.0.0.1');

What if we wanted something dynamic in our html, something determined by a variable in our code?

  <html>
    <head>
    </head>
    <body>
        <h1>{ Message }</h1>
    </body>
  </html>

The idea of having content generated by our code is called a template.

Template -- text designed to be the basis (or placeholder) for final text or content after being processed -- there's usually some specific template language, so the template system knows how to replace placeholders with real values.

  var http = require('http');
  var fs = require('fs');

  http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' })
    // we need to tell the file system what character encoding we want to use
    var html = fs.readFileSync(__dirname + '/index.htm', 'utf8');

    var message = 'Hello world...'

    // tell Node to look for a particular pattern, in this case what's marked off by {}, and replace it with our variable
    html = html.replace( '{ Message }', message);

    // send the string and end the response
    res.end(html);

  }).listen(1337, '127.0.0.1');

Template engines are not part of the NodeJS core, but you can pull them in and use them.


## Streams and Performance

Right now our existing server request/response is reading the file synchronously, which could cause performance issues if there were a large number of users requesting the file.

How to we change the existing server request/response to a stream?

Use `fs.createReadStream`:
  var http = require('http');
  var fs = require('fs');

  http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream(__dirname + '/index.htm').pipe(res);

  }).listen(1337, '127.0.0.1');

The TCP/IP protocol is basically a stream anyway, so the browser is used to dealing with data incrementally in chunks.

We can grab full files and pipe them out, or we can take them and manipulate them and then send them out.
It's a good practice to use streams wherever possible for performance benefits.

### Conceptual Aside: APIs and Endpoints

API -- application program interface -- a set of tools for building a software application -- on the web the tools are usually made available via a set of URLs which accept and send only data via HTTP and TCP/IP

Endpoint -- the URL itself -- one URL in a web API -- sometimes that enpoint does multiple things by making choices based on the HTTP request headers

Most commonly data is returned from endpoints in JSON format, which JavaScript is especially equipped to handle (JavaScript Object Notation).

## Outputting JSON

Node can take an object and convert it to JSON -- that is, to serialize it.

Serialize -- translating an object into a format that can be stored or tranferred -- JSON, CSV, XML, and others are popular

Deserialize -- taking a stream of data and converting it back into an object

The browser can then use it's JS engine to deserialize the response data back into an object.

  var http = require('http');
  var fs = require('fs');

  http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-Type': 'application/json' })
    var obj = {
        firstname: 'John',
        lastname: 'Doe'
    };

    // if we were just to res.end(obj), the browser would just get a string representation
    // of the object, i.e. [object Object], so we can instead convert the object into a
    // string with JSON.stringify
    res.end(JSON.stringify(obj));

  }).listen(1337, '127.0.0.1');

We can get JSON-formatted data from an API endpoint, serialize it into a string and send it to the browser, which can then deserialize and do something with the data.

It doesn't have to be a browser that uses the data -- the API can be accessed by another server in php or ASP.NET or RoR, or whatever.


## Routing

Routing -- mapping HTTP requests to content -- whether actual files that exist on the server or not

When a browser issues a request for a certain URL, the url itself is just one piece of data loaded onto the request, so Node can take the url and decide what to do with the request.

In our code thus far, we aren't even looking at the URL -- just that if a request is issued to 127.0.0.1:1337, we respond with html or our json object or whatever.
Currently a request to 127.0.0.1:1337/puppies or 127.0.0.1:1337/what/do/you/want.txt will elicit the exact same response.

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


## Web server checklist progress
  * Better ways to organize our code into reusable pieces
    √ modules, exports, and require
  * Ways to deal with files
    √ pull binary data into a buffer to deal with it -- can deal with it synchronously or asynchronously
  * Ways to deal with databases
  * The ability to communicate over the internet
  * The ability to accept requests and send responses
  * A Way to deal with work that takes a long time
    √ use asynchronous code and the event loop to allow Node to operate as actively and responsively as possible


## NPM and NPM Registry
Node is responsible for the largest explosion of open-source code in history.

NPM -- the Node Package Manager

### Conceptual Aside - Packages and Package Managers

Package -- a collection of code that you can use in your own code, that's managed and maintained in a package management system

Package Management System -- software that automates installing and updating packages -- deals with what version of package you have or need, updating as necessary, and manages dependencies of packages

Dependency -- code that another set of code depends on to function -- if you use that code in your app, it is a dependency, and dependencies can, in turn, have dependencies of their own

### Conceptual Aside -- Semantic Versioning (Semver)

Versioning -- specifying what version of a set of code this is -- so others can track if a new version has come out.
This allows us to watch for new features, or to watch for 'breaking changes'.
The word 'semantic' implied that something conveys meaning.

The basic core of semantic versioning is this:
  Major.Minor.Patch
    1  .  7  .  2

When there are major changes, you increment the first number, and similarly for minor and patch updates.

Patch -- some bug fixes, shouldn't break existing code (backward compatible)
Minor -- some new features were added. existing code should work fine
Major -- big changes, and existing code may break

The numbers mean something, hence the 'semantic' in semantic versioning.
Can find more information on what the semantic versioning means and what rules it follows at [semver.org](http://semver.org).

## NPM
NPM essentially comes along with installation of Node.
Can check npm version with $ npm -v

Where does code come from when you $ npm install a module? The npm registry.

Anyone can put packages on the npm registry, so you have to be judicious in choosing which packages to use in your application.


## Init, Nodemon, and Package.json -- part one

  $ npm init (command line feature to set up the application)

First thing it does is to create package.json, where we'll name the app, the entry point (the JS file that Node will run, usually app.js or server.js), version etc.

We're going to use the moment.js module, a JS library for manipulating and displaying dates.

  $ npm install moment --save

The `--save` flag tells npm to add the module as a dependency in our package.json file.

Adds:
  "dependencies": {
    "moment": "^2.10.6"
  }

The '^' symbol tells npm that if an updated minor or patch version of moment comes out (e.g. 2.11.0), update it in our application.
But will not update if 3.0.0 comes out.

If instead it shows '~2.10.6', npm will only update if the update is a patch change, i.e. '2.10.7'.

Also `--save-dev` flag, which tells npm that the module will be a dependency required in our Node app's development environment

This creates a node_modules folder, which is where all subsequent npm installed modules will be stored.
This is where node will look for modules you require anywhere in your application.

Generally we don't include node_modules directory in code repos because it saves a lot of space just to store our scripts and package.json, and any developer who pulls down code from the repo and rebuild the node_modules directory based on the package.json specifications.

$ npm install
This will look at package.json and install all required dependencies.

app.js:

  var moment = require('moment');

  console.log(moment().format('ddd', 'hA')); // Thu

## Init, Nodemon, and Package.json -- part two

`--save-dev` -- dependencies we need when building, but not necessarily running, the application

  $ npm install jasmine-node --save-dev

`-g` -- install npm module globally, when we might need a module for all of our node applications -- put it in a location in my computer where node/npm can access from any directory

  $ npm install nodemon -g

Nodemon watches files for changes, and in the event of changes, it cancels the node server and restarts, so we don't have to do it manually every time.

To run, just use $ nodemon app.js (or server.js, or injex.js, or whatevs).
We don't really need nodemon for development or to run the application, so we just install it globally so we can use it with any node app we create.

**Note:** if you have issues installing npm modules globally (esp. on Mac/Linux), there are reference docs at npm.org to troubleshoot.

NPM is criticized often because of the fact that each dependency is installed along with its own dependencies, so you can end up with node modules replicated many times over in your application.

Can run `$ npm update`, and will check for newer versions of modules and update as necessary.


**Note:** Obviously importing modules from npm into your app is just using other people's code, so need to be judicious and discriminating with the modules you choose to use.

Indicators:
  Can look at the number of downloads, the number of stars/forks on github, the number of open issues and issue responses, and the number or recency of code commits to gauge how well maintained a module is

Also beware that not everyone adheres to semantic versioning by the letter, so the version number might not necessarily indicate stability or future compatibility

## Installing Express and Making It Easier to Build a Web Server

  $ npm install express --save

app.js:
  var express = require('express');

Express's main exported function is `createApplication`, which returns a function.
It adds request and response as methods that wrap Node's core req and  res objects.
It adds `application`, `router`, `static`, `listen`, and a number of other methods.

To use express then, we need to invoke express:

  var app = express();

The `app.listen` method wraps `http.createServer()` and returns a running web server with whatever port you give it as an argument (they use 3000 in their docs).

  app.listen(3000);

### Aside -- Using Environment Variables

In development we can specify port 3000 or whatever port on our local machine we want to operate as a web server, but in production we might need to have it change as needed.
So we can use environment variables to dynamically configure the web server port.

Environment Variables -- global variables specific to the environment (in this case, the server) that our code is living in -- different servers can have different variable setting,s and we can access those values in code.

We'll use process.env, which node provides, to access our environment.

e.g.:
  var port = process.env.PORT || 3000;

  app.listen(port);

On our local machine, it will default to 3000 because we have not created the environment variable, but the PORT will be configured appropriately on the server where our code is deployed.

What about responding to the url the way we did before with our if statements?

Express has built-in methods that map to different HTTP methods/verbs (GET, POST, DELETE, UPDATE).

HTTP Method -- specifies the type of action the request wishes to make

We want to be able to respond properly to each of the HTTP request methods, and express provides methods that are just lowercase versions of the HTTP verbs.

  app.get('/', function(req, res) {
    doSomething();
  });

  app.post('/', function(req, res) {
    doSomethingElse();
  });

^^^ You can configure Node/Express to respond to requests to the same url differently, depending on the HTTP method of the request.

  var express = require('express');
  var app = express();
  var port = process.env.PORT || 3050;

  app.listen(port);

  app.get('/', function(req, res) {

    var html = '<html><head></head><body><h1>Hello World!!!</h1></body></html>'
    res.send(html);
  });

  app.get('/api', function(req, res) {
    // Node's res object has a .json() method that can serialize JSON objects
    // and add the appropriate content-type (application/json) to the response header
    res.json({ firstname: 'John', lastname: 'Doe' });
  });

## Express and Routing

Check out the excellent express [documentation](http://expressjs.com) for all the different things we can do with routing, including pattern matching.

  app.get('/person/:id', function(req, res) {

    var html = '<html><head></head><body><h1>Person: ' + req.params.id + '</h1></body></html>';
    res.send(html);
  });

The `:id` tells Express to look for a pattern `/person/something`, where we can access whatever 'something' is with req.params.id.

## Static Files and Middleware

Middleware -- code that sits between two layers of software -- in the case of Express, it's the code that sits between the request and the response

A common scenario is handling files that need to be downloaded:
If the browser requests CSS files to know how to render html, I don't want to have to deal with every single file that it might need individually.
I just want to tell Express/Node how to handle all static files the browser may request.

Static -- not dynamic -- in other words, not processed by code in any way -- HTML, CSS, and image files are static

We'll start by adding a new folder to our app for static files, called /public, and inside it a file style.css:

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

Now we want to configure Express/Node to serve the static files in the public directory on request from browser.

Above the other routes we've created, we'll drop in our middleware, which uses express's built-in static method, which takes as a parameter the location of the directory in which to find static assets:

  app.use('/assets', express.static(__dirname + '/public'));

Then we can add a link element in our html string we respond with, and the link stipulates that the href url of the stylesheet begins with /assets:

  res.send('<html><head><link href="assets/style.css" type="text/css" rel="stylesheet" /></head><body><h1>Hello World!!!</h1></body></html>');

The static method handles streaming the files to the browser on request, and it's fairly standard to have these static files sitting in a /public directory.

Now we can put any images, html, css files in our public directory, and Express has the middleware set up to properly handle it.

Additionally, we can make our own middleware.
`app.use()` just takes as parameters a route and a function for how to handle the request and response.
We pass `req`, `res`, and `next` in as parameters to our middleware function, because when the middleware function is done, we have to call next() as the callback for the code to continue running onto the next middleware.

  app.get('/', function(req, res, next) {
    console.log(`Request url: ${ req.url }`);
    next();
  });

^^^ when we hit the localhost:3050/ route, it console.logs 'Request url: /' and then moves on to the next middleware, which in this case is the `app.get('/', function...)` middleware that handles the response.

Can see what kinds of third-party middleware you can use with Express in [the Resources tab of expressjs.com](http://expressjs.com/en/resources/middleware.html)

Can use cookie-parser to deal with cookies, which is a little bit of data stored in your browser (specific to a website) that gets sent along with every request for a given url affiliated with that website.

Other examples are passport for authentication, errorhandler, express-session, and so on.

## Templates and Template Engines

Express touts that it is unopinionated and minimalist, which allows developers to plug in their own template engine of choice.
See the [using a view engine documentation](http://expressjs.com/en/guide/using-template-engines.html)

Have to set the view engine, e.g. with jade:

  $ npm install jade --save

Then:

  app.set('view engine', 'jade');

^^^ the second argument is the file extension that Node/Express will look for when building templates with the jade engine.
Jade uses whitespace/indentation to determine how to build html from .jade files.

Another option is [ejs](http://ejs.co), which is a lot like ruby interpolation, e.g.:

  <% if (user) { %>
    <h2><%= user.name %></h2>
  <% } %>

Install:

  $ npm install ejs --save

Then:

  app.set('view engine', 'ejs');

By default, Node/Express will look for our templates with .ejs extensions in a directory called /views, so we'll create that now.

  $ mkdir views
  $ cd views
  $ touch index.ejs

index.ejs (and btw, since the extension is .ejs, the text editor will likely not have helpers set up to write html, but at least in Visual Code, you can select html from the code type -- currently plain text -- at the bottom right):

  <html>
      <head>
          <link rel="stylesheet" href="assets/style.css" type="text/css" />
      </head>
      <body>
          Hello world!
      </body>
  </html>

And then in our app.js:

  app.get('/', function(req, res) {
    res.render('index');
  });

^^^ Express knows to look in the views directory by default, and it knows to look for the .ejs extension since we set the 'view engine' to 'ejs', so all we have to tell it is to render 'index'

This way, if we ever have to switch view engines, we don't have to find all references to .ejs files and change.

For our person endpoint (/person/:id), we can create a person.ejs:

  <html>
      <head>
          <link rel="stylesheet" href="assets/style.css" type="text/css" />
      </head>
      <body>
          <h1>Person: <%= ID %></h1>
      </body>
  </html>

And we can pass the view whatever data we need in a common JS object in our middleware, so for ID above:

  app.get('/person/:id', function(req, res) {
    res.render('person', { ID: req.params.id });
  });

Note that the stylesheet is not applying to this person.ejs file (because the browser is requesting it at '/person/assets/style.css'), so we have to remember to add a forward slash before assets/style.css so the browser knows that the assets directory is at the root level of the application

We can do whatever JS coding we want within the <% %> in the template -- for loops, methods on the object passed in, whatever, and it gets rendered appropriately as html.


## Querystring and Post Parameters

The querystring is the compiled string of parameters specific to the request, beginning with '?' and each parameter separated by '&'.

When the browser builds the GET request, it loads the querystring into the header of the request, e.g.:

  GET /?id=4&page=3 HTTP/1.1
  Host: www.learnwebdev.net
  Cookie: username=abc;name=Tony


When the browser builds a POST request, as in when a user fills out a form and submits it the browser sets the Content-Type accordingly, e.g.:

  POST / HTTP/1.1
  Host: www.learnwebdev.net
  Content-Type: applicaton/x-www-form-urlencoded
  Cookie: num=4;page=2

  username=Tony&password=pwd

Now the querystring is moved into the body of the request, rather than the header.

When you end up sending JSON from the browser, perhaps using jQuery:

  POST / HTTP/1.1
  Host: www.learnwebdev.net
  Content-Type: applicaton/json
  Cookie: num=4;page=2

  {
    "username":"Tony",
    "password":"pwd"
  }

The Express request object parses out the querystring natively for us -- there is a query object that is a property of the req object -- so very easy to deal with, e.g.:

  app.get('/person/:id', function(req, res) {
    res.render('person', { ID: req.params.id, Qstr: req.query.qstr });
  });

^^^ the query object above will simply be empty if there us no querystring in the request.

Update our person.ejs:

    <body>
        <h1>Person: <%= ID %></h1>
        <h2>Querystring: <%= Qstr  %></h2>
    </body>

So, if we request url `http://localhost:3050/person/25/?qstr=1234`,
the template renders:

  Person: 25
  Querystring: 1234

But if we need to seal with POST data and do something with it, we need to be able to parse the body of the HTTP request.
Express doesn't parse request bodies out of the box, however, so we can go back to our third-party middleware resources and grab body-parser.

  $ npm install body-parser --save

  var bodyParser = require('body-parser')

From the body-parser documentation, since we're only looking to parse the body for POST data currently, we'll add:

  var urlencodedParser = bodyParser.urlencoded({ extended: false });

  //We won't add the following, but these are examples from the docs on how to use urlencodedParser:

    // POST /login gets urlencoded bodies
    app.post('/login', urlencodedParser, function (req, res) {
      if (!req.body) return res.sendStatus(400)
      res.send('welcome, ' + req.body.username)
    })

    // POST /api/users gets JSON bodies
    app.post('/api/users', jsonParser, function (req, res) {
      if (!req.body) return res.sendStatus(400)
      // create user in req.body
    })

Back to our app.js:

  app.post('/person', urlencodedParser, function(req, res) {
    res.send('Thanks!');
    console.log(`First: ${ req.body.firstname }`);
    console.log(`Last: ${ req.body.lastname }`);
  });


And in our index.ejs:

  <h1>Hello world!</h1>
  <form method="POST"
        action="/person">
      First name: <input type="text" id="firstname" name="firstname" />
      <br />
      Last name: <input type="text" id="lastname" name="lastname" />
      <input type="submit" value="Submit" />
  </form>

Now when we hit `http://localhost:3050/`, and we submit a first and last name, it redirects to `/person` and shows 'Thanks!'
And it logs to the console:

  First: Bennett
  Last: Adams

### Now we'll handle JSON data

Again, from the body-parser docs:
  // create application/json parser
  var jsonParser = bodyParser.json()

  app.post('/personjson', jsonParser, function(req, res) {
    res.send('Thanks for the json data!');
    console.log(`First: ${ req.body.firstname }`);
    console.log(`Last: ${ req.body.lastname }`);
  });


and in our index.ejs, using jQuery to easily set up a POST with json data:

  <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  ...
  <form method="POST"
        action="/person">
      First name: <input type="text" id="firstname" name="firstname" />
      <br />
      Last name: <input type="text" id="lastname" name="lastname" />
      <input type="submit" value="Submit" />
  </form>

  <script>
      $.ajax({
          type: 'POST',
          url: '/personjson',
          data: JSON.stringify({
              firstname: 'Jane',
              lastname: 'Doe'
          }),
          dataType: 'json',
          contentType: 'application/json'
      })
  </script>

Node will get the HTTP requst to the /personjson url, grab the body of the request and run it through the jsonParser middleware before sending the 'Thanks for the json data!' response.

## RESTful APIs and JSON

What is REST?
An architectural style for building APIs -- stands for 'respresentational state transfer' -- We decide that the HTTP verbs and URLs mean something, that they match what's actually happening.

Design your API so that it responds to the HTTP verbs in the way that's expected, so rather than putting the HTTP verbs in the url, since they'll be in the header of the request anyway, we can design endpoints like:

  app.get('api/person/:id', function(req, res) {
    // get this person with id === req.params.id
  });

  app.post('api/person', urlencodedParser, function(req, res) {
    // save the person in the req body to the database
  });

  app.delete('api/person/:id', jsonParser, function(req, res) {
    // get this person with id === req.params.id
  });

Typically a RESTful API:
  1) accepts and returns json
  2) uses descriptive urls
  3) deals with requests as one would anticipate.


## Structuring an Application

Can use express-generator that scaffolds out a sample app with a defined structure

  $ npm install -g express-generator

  |-bin
  |-public
  |-routes
  |---index.js
  |---users.js
  |-views
   -app.js
   -package.json

`express.Router()` is router middleware -- can use it to break routing into different modules for applications with a large number of possible routes.

e.g.:

users.js:

  var express = require('express');
  var router = express.Router();

  /* GET users listing */
  /* in this context '/' means '/users/' */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  module.exports = router;

index.js:

  // DEFAULT ROUTING CODE

app.js:

  var routes = require('./routes/index');
  var users = require('./routes/users');

  app.use('/', routes);
  app.use('/users', users);

  ^^^ this means that any requests made whose URL begins with /users will be handles by the router exported by users.js, and any other routes will be handled by the routing in index.js


The above is one way to handle routing, but let's look at another way...

Maybe we want to start separating out our growing app.js into different modules, for instance a module that controls endpoints that will return html and another that controls API endpoints.
We'll create a directory called controllers, with apiiController.js and htmlController.js.

  $ mkdir controllers
  $ touch controllers/apiController.js controllers/htmlController.js

We can take the app object in our app.js and pass it around to the different modules, so that in our apiController.js, we export a function that takes app as a parameter:

apiController.js:

  /* Take the api endpoint functions out of app.js and move them here */
  module.exports = function(app) {
    app.get('api/person/:id', function(req, res) {
      // get this person with id === req.params.id
      res.json({ firstname: 'John', lastname: 'Doe' });
    });

    app.post('api/person', urlencodedParser, function(req, res) {
      // save the person in the req body to the database
    });

    app.delete('api/person/:id', jsonParser, function(req, res) {
      // get this person with id === req.params.id
    });
  };

same for htmlController.js:

  var bodyParser = require('body-parser');
  var urlencodedParser = bodyParser.urlencoded({ extended: false });

  module.exports = function(app) {
    app.get('/', function(req, res) {
      res.render('index');
    });

    app.get('/person/:id', function(req, res) {
      res.render('person', { ID: req.params.id, Qstr: req.query.qstr });
    });

    app.post('/person', urlencodedParser, function(req, res) {
      res.send('Thanks!');
      console.log(`First: ${ req.body.firstname }`);
      console.log(`Last: ${ req.body.lastname }`);
    });
  };

and in our app.js:
  var apiController = require('./controllers/apiController');
  var htmlController = require('./controllers/htmlController');

  apiController(app);
  htmlController(app);


### Conceptual Aside: Relational Databases and SQL

Relational Data -- typically we're talking about tables with columns and rows, connected by some kind of id -- best practice is to break the data down into as many tables as possible with mapping tables between them to connect data points together.

This practice leads to well normalized data, with as little repetition of the same data as possible.

Asking questions about the data takes place in SQL -- structured query language -- which can combine tables and pull information we request

We can think of tables as arrays of JS objects, with each object having properties that are the column headers and values that would populate its row accordingly.

## Node and MySQL

We can use the node-mysql package to interface between Node and MySQL DB.

Install:

  $ npm install mysql --save

Require:

  var mysql = require('mysql');

And we can add it to the middleware in our app.js whenever the browser hits the root path:

  app.use('/', function(req, res, next) {
    console.log(`Request url: ${ req.url }`);

    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'addressbook'
    });

    // Select string appropriate to the data in the test database
    var queryString = 'select ...';

    conn.query(queryString, function(err, rows) {
      if (err) {
        throw err;
      }
      console.log(rows);
    });

    next();
  });

The `rows` object that comes back is just an array of JSON objects.
The mysql package also has the ability to stream rows back as the database response, which we could then pipe to the HTTP response.

Of course there are ways of manipulating data, deleting it, etc., but the important concept to remember is that any good Node package that interfaces with a relational database just returns plain JavaScript objects, which we know what to do with.

### NoSQL

NoSQL is a variety of technologies that are alternatives to tables and SQL -- one of those types is a document database (MongoDB, for example)

Document-based databases basically store JavaScript objects directly -- that's essentially what documents are.
Historically SQL/relational databases were the preference because minimizing the amount of repeated data meant minimizing the amount of hard drive space the DB took up.
Document databases tend to repeat data and therefore take up more memory, but memory is less and less of a constraint as technology improves.

What is more expensive that hard drive space now is the difficulty of adding fields or changing the structure of exising data in a relational database.
Document databases are extremely flexible to changes over time.

## MongoDB and Mongoose

Mongoose is the most powerful and most popular (by far) NPM module with which to interface between Node and MongoDB.

Install:

  $ npm install mongoose --save

Then you set up a schema, basically determining what your objects (documents) will look like.

Mongo stores documents in a format called BSON (Binary JSON), so very natural fit with Node.

example, saving a person document:
  mongoose.connect(uri);

  var Schema = mongoose.Schema;

  // Notice the similarity in structure to a function constructor
  var personSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String
  });

  var Person = mongoose.model('Person', personSchema);

  var john = Person({
    firstname: 'John',
    lastname: 'Doe',
    address: '155 Main Street'
  });

  john.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('person saved!');
  });

  var jane = Person({
    firstname: 'Jane',
    lastname: 'Doe',
    address: '155 Main Street'
  });

  jane.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('person saved!');
  });

And in our middleware, we dropped in the mongo query to find John and Jane Doe:

  app.use('/', function(req, res, next) {
    console.log(`Request url: ${ req.url }`);

    // get all the users
    Person.find({}, function(err, users) {
      if (err) {
        throw err;
      }
      // object of all the users
      console.log(users);
    });

    next();
  });


## Web server checklist progress
  * Better ways to organize our code into reusable pieces
    √ modules, exports, and require
  * Ways to deal with files
    √ pull binary data into a buffer to deal with it -- can deal with it synchronously or asynchronously
  * Ways to deal with databases
    √ Can very easily use with relational or NoSQL databases
  * The ability to communicate over the internet
    √ Built-in http module handles interactions with browsers and other servers
  * The ability to accept requests and send responses
    √ Express as a wrapper that handles req and res
  * A Way to deal with work that takes a long time
    √ use asynchronous code and the event loop to allow Node to operate as actively and responsively as possible

## The MEAN Stack
### MongoDB, Express, NodeJS, and AngularJS

Stack -- the combination of all the technologies you're using to build a piece of software (database, server-side code, client-side code, and everything else)

MongoDB -- stores your data in documents that look a lot like JSON and JavaScript object literal notation

Express -- JavaScript framework that makes things like routing, writing APIs, and working with HTTP easier

AngularJS -- JavaScript framework for managing code and UI in the browser, removing a lot of manual work

NodeJS -- JavaScript on the server, which handles HTTP requests and responses, and lots more

## AngularJS: Managing the Client

Browsers are written in C++, but they also have JS engines embedded in them and give them access to extra features.
The server just has NodeJS installed, but the client generally has a browser installed.

The DOM -- the structure that browsers use internally to store and manage web pages -- stands for 'Document Object Model'.
Browsers give the JavaScript engine the ability to manipulate the DOM, but the DOM exists outside of JavaScript (it's actually a collection of C++ objects).

The browser is just a program sitting on the client's computer.
The browser receives a string of HTML from the server, and the browser has to process the string and build a hierarchy of objects (the DOM tree) from the different HTML elements.

The browser then renders the webpage using the DOM, not the HTML string it was given.

Also embedded within the browser is a JavaScript engine (V8 with Chrome), and the browser passes the contents of script tags to the JS engine.
Some of the JavaScript code, when interpreted/processed by the engine, will update the DOM, and the browser will update or re-render the webpage accordingly.

For example, when a user interacts by clicking a button on a page and causing something to happen, that interaction and update is made possible by some JavaScript code running, which is in turn causing C++ code to run, which actually updates the DOM.
The DOM tree has elements added or removed, and the browser automatically knows to re-render based on the new DOM.

A problem arises because each browser has a different JavaScript engine running internally, and so each may expect different JavaScript code to affect the same behavior.
It's very cumbersome to account for all the different ways you might need to write the same code to get a uniform webpage experience across all the different browsers, and the problem only compounds as web applications increase in size.

Frameworks like AngularJS help us to normalize our code across all browsers and make scripting applications more manageable.
Basically it's just a bunch of JavaScript code that someone else wrote that gets loaded into the browser and interpreted by the JS engine, and then we can write additional code on top of it and have the browser interpret it according to the framework code it has already loaded.

## AngularJS: Managing the Client -- part two

We can grab angular via CDN rather than sending the code from the server, which will reduce demand on our server.
Helps with the speed of the application because CDNs are designed to be extremely fast, and if the client has recently used another application with angular loaded, the browser may already have it cached.

The uncompressed version is generally better for development because it gives fuller, more explicit errors and is easier to navigate the JavaScript code.
The minified version will eliminate things like carriage returns and shortens variable names so that they don't really indicate anything, so it makes debugging nigh impossible.
But the minified version is more performant, so it's what you'll want to use in production.

## AngularJS: Managing the Client -- part three

You want to load the angular script in the head of the document, because you want angular loaded before the browser loads the visual elements of the HTML.

Once the angular script has loaded into the browser, we now have access to an object called angular in our scripts, so we can call angular.module, .controller, .forEach, and so on.

Directives -- attributes or the value of attributes that are sitting on an HTML element

When the HTML is processed, having angular directives on elements causes angular to do work, because angular has to convert objects on the DOM to something the browser can render.


### Conceptual Aside: Angular 1, Angular 2, React, and More...

All the frontend JS frameworks/libraries are just JavaScript running in the browser to manipulate the DOM.

They just use what features the browsers' JavaScript engines make available.

## Working with the Full Stack

Full-stack Developer -- a developer who knows all the pieces of a software stack, and thus can build software by themselves (and perhaps design and UX as well)

Very important to keep a clear mental model of the division of client and server code.

Example using Node/Angular -- identical arrays of people on client and server:

Angular...
  angular.module('TestApp', [])
    .controller'MainCtrl', function() {
      this.people = [
        { name: 'John Doe' }, { name: 'Jane Doe' }, { name: 'Jim Doe' }
      ];
    });

Node...
  var people = [
    { name: 'John Doe' }, { name: 'Jane Doe' }, { name: 'Jim Doe' }
  ];

  // send the people object with the index.ejs file
  app.get('/people', function(req, res) {
    res.render('person', { serverPeople: people });
  });

index.ejs:

  <html ng-app="TestApp">
      <head>
          <link rel="stylesheet" href="assets/style.css" type="text/css" />
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.js"></script>
      </head>
      <body ng-controller="MainCtrl as vm">
          <ul>
            <li ng-repeat="person in vm.people">
              {{ person.name }}
            </li>
          </ul>

          <script>
            // use <%- rather than <%= becuase the = tells ejs to
            // convert to valid HTML, which we don't need to do

            var clientPeople = <%- JSON.stringify(serverPeople) %>;

          </script>
      </body>
  </html>

Now we can go back and change Angular controller...

  this.people = clientPeople;

...and it still works, because:

Node/Express responded to the GET request for '/person' by rendering index.ejs and including serverPeople object.
The only dynamic piece that EJS replaced was the JSON.stringify(serverPeople) set off by <% %>.
It ran the JSON.stringify on the server, so by the time it's rendered in the browser, the browser network sources shows:

  <script>
    var clientPeople = [{ name: 'John Doe' }, { name: 'Jane Doe' }, { name: 'Jim Doe' }];
  </script>

THEN the angularJS code ran.
























