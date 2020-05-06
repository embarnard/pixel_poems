let pwr_on = true;
let home_screen = document.getElementById('home_screen');
let poem_screen = document.getElementById('poem_screen');

function showHome( back ) {
    let btn = document.getElementById('on_off_btn');

    if ( !pwr_on || back ) {
        pwr_on = true;
        btn.style.backgroundColor = "#2BC600";
        home_screen.style.display = "block";
        poem_screen.style.display = "none";
    } else {
        btn.style.backgroundColor = "#D31C24";
        pwr_on = false;
        home_screen.style.display = "none";
        poem_screen.style.display = "none";
    }
}

function showPoem(){
    home_screen.style.display = "none";
    poem_screen.style.display = "block";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// poem request
let poem_db_url = "http://poetrydb.org/author"

const request = new XMLHttpRequest();
request.open("GET", poem_db_url);
request.send();
request.onload = () => {
    console.log(request);
    if(request.status == 200) {
        const authors = JSON.parse(request.response)["authors"];
        requestTitles(authors[getRandomInt(authors.length)]);
    }else{
        console.log("error: unable to retrieve authors")
    }
}

function requestTitles(author){
    author = author.replace(/ /g, "%20");
    poem_db_url = poem_db_url + '/' + author;

    const request_titles = new XMLHttpRequest();
    request_titles.open("GET", poem_db_url);
    request_titles.send();
    request_titles.onload = () => {
        console.log(request);
        if(request.status == 200) {
            const titles = JSON.parse(request_titles.response)[getRandomInt(this.length)];
            insertPoem(titles["title"], titles["author"], titles["lines"]);
        }else{
            console.log("error: unable to get poem");
        }
    }
}

function insertPoem(title, author, lines){
    let header = document.createElement("span");
    let head = document.createTextNode(title);
    header.appendChild(head);
    poem_screen.appendChild(header);

    let p = document.createElement("span");
    let name = document.createTextNode(' by ' + author);
    p.appendChild(name);
    poem_screen.appendChild(p);

    for(i = 0; i < lines.length; i ++){
        let p_tag = document.createElement("p");
        let text = document.createTextNode(lines[i]);
        p_tag.appendChild(text);
        poem_screen.appendChild(p_tag);
    }
}