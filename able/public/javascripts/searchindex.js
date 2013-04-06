window.onload = loadIndex;
var xmlhttp;
var xmlDoc;

function loadIndex() {
	if (document.implementation && document.implementation.createDocument) {
		xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET",'/index/index.xml',false);
		//xmlhttp.onreadystatechange = processReqChange;
		xmlhttp.send(null);
		xmlDoc = xmlhttp.responseXML.documentElement;
		var x = xmlDoc.getElementsByTagName("nodename");
	} else if (window.ActiveXObject) {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.load("index.xml");
	}
}

/*function processReqChange() {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200) {
		}
	}
}*/

function searchIndex() {	
	if (!xmlDoc) {
		loadIndex();
	}
	$('#resultshere').html('');
	var searchterm = document.getElementById("searchme").value;
	var allitems = xmlDoc.getElementsByTagName("item");
	results = new Array;
	if (searchterm.length < 3) {
		var resultshere = document.getElementById("resultshere");
		var para = document.createElement("p");
		var notfound = document.createTextNode('Enter at least three characters');
		resultshere.appendChild(para);
		para.appendChild(notfound);
	} else {
		for (var i=0;i<allitems.length;i++) {
			var name = allitems[i].lastChild.nodeValue;
			var exp = new RegExp(searchterm,"i");
			if ( name.match(exp) != null) {
				results.push(allitems[i]);
			}
		}
		showResults(results, searchterm);
	}
}

function showResults(results, searchterm) {
	$('#searchme').val('');
	if (results.length > 0) {
		var resultshere = document.getElementById("resultshere");
		var header = document.createElement("h5");
		var list = document.createElement("ul");
		var searchedfor = document.createTextNode("You've searched for "+searchterm);
		resultshere.appendChild(header);
		header.appendChild(searchedfor);
		resultshere.appendChild(list);
		for (var i=0;i<results.length;i++) {
			var listitem = document.createElement("li");
			var item = document.createTextNode(results[i].lastChild.nodeValue);
			list.appendChild(listitem);
			listitem.appendChild(item);
		}
	} else {
		var resultshere = document.getElementById("resultshere");
		var para = document.createElement("p");
		var notfound = document.createTextNode("Sorry, I couldn't find anything like " + searchterm + ".");
		resultshere.appendChild(para);
		para.appendChild(notfound);
	}
}
