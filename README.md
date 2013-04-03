# Applications for Basic Learning and Education (ABLE) #

Applications for Basic Learning and Education (ABLE) is a web-based collection of interactive educational programs that 
provide engaging and entertaining ways to supplement learning outside of the classroom.

### Software Used ###
* Sublime Text 2
* GIMP
* Nodejs
* MongoDB

### nodejs modules ###
* Express
* Jade
* Mongodb

### Programming Languages ###
* HTML5 (Converted to Jade)
* CSS
* Javascript/jQuery
* JSON (subset of javascript)

## Installing node.js and the dependencies
[Download nodejs](http://nodejs.org/download/) and install.

Traverse to the ABLE root folder:
<pre>npm install</pre>

## Installing MongoDB ##
[Download MongoDB](http://www.mongodb.org/downloads)

Unzip the files into C:\ (or anywhere you like, doesn't really matter).

## Running ##
Start MongoDB first. Open up a command prompt and traverse to the root directory of your MongoDB installation.
<pre>cd bin
mongod.exe</pre>

To start the server, traverse to the ABLE folder and type:
<pre>node server</pre>

In browser, go to localhost:8080
