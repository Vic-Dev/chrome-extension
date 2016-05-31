function getObjTitle() {
    var textTitle;
    var title = document.getElementsByClassName('title');
    title = title[title.length - 1];
    if (title.getElementsByTagName('img').length > 0) {
        textTitle = title.getElementsByTagName('img')[0].getAttribute('alt');
    } else {
        textTitle = title.innerHTML;
    }
    return textTitle; 
}

function getObjYear() {
    var year = document.getElementsByClassName('year');
    year = year[year.length - 1];
    var textYear = year.innerHTML;
    return textYear;
}

function searchUrl(textTitle, textYear) {
    var searchUrl = 'http://www.omdbapi.com/' + 
    '?t=' + textTitle + '&y=' + textYear + '&plot=short&r=json';
    return searchUrl;
}

function renderHTML() {
    var html = '';
    html += getObjTitle();
    html += getObjYear();
    html += searchUrl(getObjTitle(), getObjYear());
    thing = getInfo(getObjTitle(), getObjYear(), function(errorMessage) {
      console.log('Cannot display');
    });

    console.log(thing);

    return html;    
}


// function getTitleAndYear() {
//     var html = '';
//     var elems = document.getElementsByTagName('*'), i;
//     var title = document.getElementsByClassName('title');
//     title = title[title.length - 1];
//     var year = document.getElementsByClassName('year');
//     year = year[year.length - 1];
//     var textYear = year.innerHTML;
//     if (title.getElementsByTagName('img').length > 0) {
//         textTitle = title.getElementsByTagName('img')[0].getAttribute('alt');
//         html += textTitle;
//     } else {
//         textTitle = title.innerHTML;
//         html += textTitle;
//     }
//     html += textYear
//     var searchUrl = 'http://www.omdbapi.com/' + 
//     '?t=' + textTitle + '&y=' + textYear + '&plot=short&r=json';
//     html += searchUrl;
//     getInfo(textTitle, textYear);
//     return html;
// }

function getInfo(title, year, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'http://www.omdbapi.com/' + 
  '?t=' + title + '&y=' + year + '&plot=short&r=json';
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results || response.responseData.results.length === 0) {
        errorCallback('No response from Google Image search!');
        return;
    }
    // Expect "N/A"
    var imdbRating = response.imdbRating
    // Expect tt4020236
    var imdbID = response.imdbID;
    console.log(imdbRating);
    console.log(imdbID);
  };
  x.onerror = function() {
    errorCallback('Network error.');
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
