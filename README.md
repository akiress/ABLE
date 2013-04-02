# Applications for Basic Learning and Education (ABLE) #

Applications for Basic Learning and Education (ABLE) is a web-based collection of interactive educational programs that 
provide engaging and entertaining ways to supplement learning outside of the classroom.


## Dependencies ##


### Programming Languages ###
HTML5
CSS
Javascript/jQuery
Python 2.7
JSON (subset of javascript)


### Software Used ###
* Sublime Text 2
* GIMP
* nginx


### nginx set up ###
Download nginx here (http://nginx.org/en/download.html)
Make sure to get the Windows Development version.

The nginx.conf file is the file to be used in the conf folder you unzipped nginx. Make sure to open this file with a text editor and change the path of root to the path where the index.html of ABLE is.

To install:
<pre>cd c:\<path-to-where-you-want-it>
unzip nginx-1.3.15.zip
cd nginx-1.3.15
start nginx</pre>



## Running ##
To start the server, traverse to the nginx folder you unzipped.
<pre>start nginx</pre>

### Shutting down nginx ###
Use one of the following commands:
<pre>nginx -s stop			fast shutdown
nginx -s quit		   graceful shutdown</pre>
<pre>nginx -s reload	 	changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes</pre>
<pre>nginx -s reopen		re-opening log files</pre>

In browser, go to localhost:8080
