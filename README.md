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

Open a command prompt and traverse to the ABLE root folder:
<pre>npm install</pre>

## Installing MongoDB ##
[Download MongoDB](http://www.mongodb.org/downloads)

Unzip the files into C:\ (or anywhere you like, doesn't really matter).

## Running ##
Start MongoDB first. Open up a command prompt and traverse to the root directory of your MongoDB installation.
<pre>cd bin
mongod.exe  --dbpath exact-path-to-the-database</pre>

Then start the server, traverse to the ABLE folder and type:
<pre>node server</pre>

In browser, go to localhost:8080

## MongoDB ##
To see what is inside of the database once it has started:

Open a command prompt and traverse to the MongoDB installation folder.
<pre>mongo</pre>
<pre>show collections</pre>

If any collections were listed, you can see the contents of those by
<pre>db.name-of-collection.find()</pre>

## Sample usernames and passwords for the site ##
apples123 - apples123
bats123 - bats123
cats123 - cats123
dogs123 - dogs123
eyes123 - eyes123
frogs123 - frogs123