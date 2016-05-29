function replaceContentInContainer(matchClass, content) {
    var html = '';
    var elems = document.getElementsByTagName('*'), i;
    var title = document.getElementsByClassName('title')[0]
    if (title.getElementsByTagName('img').length > 0) {
        html += title.getElementsByTagName('img')[0].getAttribute('alt')
    } else {
        html += title.innerHTML;
    }
    title.innerHTML = content;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1) {
            html += elems[i].innerHTML;
            elems[i].innerHTML = content;
        }
    }
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: replaceContentInContainer('year', 'This is replaced')
});

/*
TODO: Use these to target bob title and year
document.getElementsByClassName('bob-title')[0].innerHTML
document.getElementsByClassName('year')[1].innerHTML
*/