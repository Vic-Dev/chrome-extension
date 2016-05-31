

function getObjTitle() {
    var textTitle;
    var title = document.getElementsByClassName('title');
    title = title[title.length - 1];
    if (title.getElementsByTagName('img').length > 0) {
        textTitle = title.getElementsByTagName('img')[0].getAttribute('alt');
    } else {
        textTitle = title.innerHTML;
    }
    return textTitle.match(/([a-zA-Z](\s[a-zA-Z])?|-?)*/)[0]; 
}

function getObjYear() {
    var year = document.getElementsByClassName('year');
    year = year[year.length - 1];
    var textYear = year.innerHTML;
    return textYear;
}

function searchUrl(textTitle, textYear) {
    var searchUrl = 'https://www.omdbapi.com/' + 
    '?t=' + textTitle + '&y=' + textYear + '&plot=short&r=json';
    return searchUrl;
}

function renderHTML() {
    var html = '';
    var title = getObjTitle();
    var year = getObjYear();
    var search = searchUrl(title, year);
    
    console.log(title);

    html += title;
    html += year;
    html += search;

    getInfo(search, title, year, function(imdbRating, imdbID) {
        console.log(imdbID);
        var parentDiv = document.getElementsByClassName('title');
        parentDiv = parentDiv[parentDiv.length - 1];    
        var node = document.createElement("A");
        var textnode = document.createTextNode('IMDB: ' + imdbID);
        node.style["display"] = "block";
        node.href = 'https://www.imdb.com/title/' + imdbID;
        node.onclick = function() {
            window.open(this.href); 
            return false;
        }
        node.appendChild(textnode);
        var child = parentDiv.children[1];
        parentDiv.insertBefore(node, child);
        var test = document.getElementsByClassName('year');
        test = test[test.length - 1].innerHTML = imdbRating;
    }, function(errorMessage) {
      console.log(errorMessage);
    });

    return html;    
}


function getInfo(search, title, year, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var x = new XMLHttpRequest();
  x.open('GET', search);
  console.log(search);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response) {
        errorCallback(response);
        return;
    }
    // // Expect "N/A"
    var imdbRating = response.imdbRating;
    // // Expect tt4020236
    var imdbID = response.imdbID;
    // console.log(imdbRating);
    // console.log(imdbID);
    callback(imdbRating, imdbID);
  };
  x.onerror = function(message) {
    errorCallback(message);
  };
  x.send();
}


chrome.runtime.sendMessage({
    action: "getSource",
    source: renderHTML()
});

/*
TODO: Use these to target bob title and year
document.getElementsByClassName('bob-title')[0].innerHTML
document.getElementsByClassName('year')[1].innerHTML
*/
