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
    textYear = textYear || "";
    var searchUrl = 'https://www.omdbapi.com/' + 
    '?t=' + textTitle + '&y=' + textYear + '&plot=short&r=json';
    return searchUrl;
}

function renderHTML() {
    var html = '';
    var title = getObjTitle();
    var year = getObjYear();
    var search = searchUrl(title, year);
    

    html += title;
    html += year;
    html += search;

    getInfo();

    return html;    
}

function ajaxCall(search) {
    var myPromise = new Promise(function(resolve, reject) {
        fetch(search).then(function(response) {
            return response.json();
        }).then(function(data) {
            if(data.imdbID !== undefined) {
                resolve({id: data.imdbID, rating: data.imdbRating});
            } else {
                reject('foo');
            }
        });
    });

    return myPromise;
}

function renderDisplay(imdbInfo) {
    var parentDiv = document.getElementsByClassName('title');
    parentDiv = parentDiv[parentDiv.length - 1];    
    var node = document.createElement("A");
    var textnode = document.createTextNode('IMDB link (' + imdbInfo.id + ')');
    node.style["display"] = "block";
    node.href = 'https://www.imdb.com/title/' + imdbInfo.id;
    node.onclick = function() {
        window.open(this.href); 
        return false;
    }
    node.appendChild(textnode);
    var child = parentDiv.children[1];
    parentDiv.insertBefore(node, child);
    var rating = document.createElement("DIV");
    var textRating = document.createTextNode(imdbInfo.rating);
    rating.appendChild(textRating);
    var child2 = parentDiv.children[1];
    parentDiv.insertBefore(rating, child2);
}


function getInfo() {
  var title = getObjTitle();
  var year = getObjYear();
  var x = ajaxCall(searchUrl(title, year));
  x.then(function(data) {
    renderDisplay(data);
  });
  x.catch(function() {
    ajaxCall(searchUrl(title)).then(function(data) {
        renderDisplay(data);
    }, function() { 
        alert('Failed');
    });
  })
}


chrome.runtime.sendMessage({
    action: "getSource",
    source: renderHTML()
});

