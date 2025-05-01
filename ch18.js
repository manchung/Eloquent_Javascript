function author(type) {
    let header_accept;
    if (type == "json") {
        header_accept = "application/json";
    } else if (type == "text") {
        header_accept = "text/plain";
    } else if (type == "html") {
        header_accept = "text/html";
    }
    fetch('https://eloquentjavascript.net/author', {headers: {'Accept': `${header_accept}`}})
        .then(r => r.text())
        .then(console.log)
}

// author('text');
// author('html');
author('json');