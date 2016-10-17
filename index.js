(function() {
    window.onload = init;
})();

function init() {
    getCourses();
    getNews();
    getNotices();
    getPeople();
    getComments();
    showHome();
}

function showHome() {
      scroll(0,0);
      document.getElementById("home").style.display = '';
      document.getElementById("courses").style.display = 'none';
      document.getElementById("news").style.display = 'none';
      document.getElementById("notices").style.display = 'none';
      document.getElementById("guestbook").style.display = 'none';
      document.getElementById("people").style.display = 'none';
  }

function showCourses() {
      scroll(0,0);
      document.getElementById("courses").style.display = '';
      document.getElementById("home").style.display = 'none';
      document.getElementById("news").style.display = 'none';
      document.getElementById("notices").style.display = 'none';
      document.getElementById("guestbook").style.display = 'none';
      document.getElementById("people").style.display = 'none';
}

function showNews() {
      scroll(0,0);
      document.getElementById("news").style.display = '';
      document.getElementById("courses").style.display = 'none';
      document.getElementById("home").style.display = 'none';
      document.getElementById("notices").style.display = 'none';
      document.getElementById("guestbook").style.display = 'none';
      document.getElementById("people").style.display = 'none';
}

function showNotices() {
    scroll(0,0);
    document.getElementById("notices").style.display = '';
    document.getElementById("news").style.display = 'none';
    document.getElementById("courses").style.display = 'none';
    document.getElementById("home").style.display = 'none';
    document.getElementById("guestbook").style.display = 'none';
    document.getElementById("people").style.display = 'none';
}

function showGuestbook() {
    scroll(0,0);
    document.getElementById("guestbook").style.display = '';
    document.getElementById("notices").style.display = 'none';
    document.getElementById("news").style.display = 'none';
    document.getElementById("courses").style.display = 'none';
    document.getElementById("home").style.display = 'none';
    document.getElementById("people").style.display = 'none';
}

function showPeople() {
    scroll(0,0);
    document.getElementById("people").style.display = '';
    document.getElementById("guestbook").style.display = 'none';
    document.getElementById("notices").style.display = 'none';
    document.getElementById("news").style.display = 'none';
    document.getElementById("courses").style.display = 'none';
    document.getElementById("home").style.display = 'none';
}

function getCourses() {
    var xmlhttp = new XMLHttpRequest();
    var response;

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
             console.log(JSON.parse(xmlhttp.responseText));
             response = JSON.parse(xmlhttp.responseText);
             loadCourses(response.courses.coursePaperSection);
           }
        }
    };

    xmlhttp.open("GET", "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses", true);
    xmlhttp.send();
}

function loadCourses(info) {
    var stage1 = document.getElementById("stage1");
    var stage2 = document.getElementById("stage2");
    var stage3 = document.getElementById("stage3");
    var postgrad = document.getElementById("postgrad");
    for (var i=0; i<info.length; i++) {
        var current = info[i];

        var title = '';
        x = current.title;
        if (x !== '') {
            title += ' | ' + x;
        }

        var prerequisites = '';
        var y = current.prerequisite;
        if (y !== undefined) {
            if (typeof y === 'array') {
                for (var i=0; i<y.length; i++) {
                    prerequisites += y[i];
                }
            }
            else {
                prerequisites = y;
            }

        /*console.log(current.subject.courseA.slice(8,9));*/

        }
        if (current.subject.courseA.slice(8,9)==='1'){
          var temp = setCourses(current.subject.courseA, title, current.subject.points, current.description, prerequisites);
          stage1.innerHTML += temp;
        }
        if (current.subject.courseA.slice(8,9)==='2'){
          var temp = setCourses(current.subject.courseA, title, current.subject.points, current.description, prerequisites);
          stage2.innerHTML += temp;
        }
        if (current.subject.courseA.slice(8,9)==='3'){
          var temp = setCourses(current.subject.courseA, title, current.subject.points, current.description, prerequisites);
          stage3.innerHTML += temp;
        }
        if (current.subject.courseA.slice(8,9)==='6' || title.slice(8,9)==='7') {
          var temp = setCourses(current.subject.courseA, title, current.subject.points, current.description, prerequisites);
          postgrad.innerHTML += temp;
        }

    }
}


function setCourses(code, title, points, description, prerequisites) {


    var lines =
        '<div class="course-form">'+
            '<div>'+
            '<span class="course-code">'+code+'</span>'+
            '<span class="course-title">' + title + '</span>'+
            '</div>'+
            '<div>'+
            '<span class="course-points">' + points + '</span>'+
            '</div>'+
            '<span class="course-description">' + description + '</span>'+
            '<div>'+
            '<span class="course-prerequisite">' + prerequisites + '</span>'+
            '</div>'
        '</div>';

      return lines
}

function getNews() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/news";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
  	xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var version_d = document.getElementById("show_result");
        var response = JSON.parse(xhr.responseText);
        //console.log(response);
        loadNews(response);

    }
    xhr.send(null);
}

function loadNews(info) {
    var news = document.getElementById("news");

    for (var i=0; i<info.length; i++) {
        var current = info[i];

        var temp = setNews(current.titleField, current.pubDateField, current.descriptionField, current.linkField);
        news.innerHTML += temp;
    }
}

function setNews(NewsTitle, newsDate, newsDescription, newsLink) {


    var lines =
        '<div class="card linkCursor" onclick="location.href='+ "'" +newsLink+ "'"+'">'+
          '<span class="card-header linkText">'+
            NewsTitle+
          '</span>'+
          '<p class="news-date">'+
            newsDate+
          '</p>'+
          '<p class="news-description">'+
            newsDescription+
          '</p>'+
        '</a></div>';

      return lines
}

function getNotices() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/notices";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
  	xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var version_d = document.getElementById("show_result");
        var response = JSON.parse(xhr.responseText);
        //console.log(response);
        loadNotices(response);
    }
    xhr.send(null);
}

function loadNotices(info) {
    var notices = document.getElementById("notices");

    for (var i=0; i<info.length; i++) {
        var current = info[i];

        var temp = setNews(current.titleField, current.pubDateField, current.descriptionField, current.linkField);
        notices.innerHTML += temp;
    }
}

function setNotices(noticeTitle, noticeDate, noticeDescription, noticeLink) {


    var lines =
        '<div class="card linkCursor" onclick="location.href='+ "'" +newsLink+ "'"+'">'+
          '<span class="card-header linkText">'+
            noticeTitle+
          '</span>'+
          '<p class="news-date">'+
            noticeDate+
          '</p>'+
          '<p class="news-description">'+
            noticeDescription+
          '</p>'+
        '</a></div>';

      return lines
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function postComment(name, comment) {
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name;

	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

	xhr.onload = function() {
		document.getElementById("comment").value = "";
		getComments();
	}

	xhr.send(JSON.stringify(comment));
}

function getPeople() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
  	xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var version_d = document.getElementById("show_result");
        var response = JSON.parse(xhr.responseText);
        //console.log(response);
        loadPeople(response);
    }
    xhr.send(null);
}

function loadPeople(info) {
    //console.log(info);
    for (var i = 0; i < info.list.length; i++) {
        var current = info.list[i];
        //console.log(current.title);

        getPerson(current.profileUrl[1]);
    }
}

function getPerson(uid){
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/person?u="+uid;
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var version_d = document.getElementById("show_result");
        var response = JSON.parse(xhr.responseText);
        //console.log(response);
        loadPerson(response,uid);
    }
    xhr.send(null);
}

function loadPerson(info,uid) {
    //console.log(info.fullName);
    var people = document.getElementById("people");

    var vcard = 'http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/vcard?u=' + uid;

    //console.log(vcard);

    phoneNumber = ''
    if (info.phoneNumbers[0].type === 'ddi') {
        phoneNumber += '<a href="tel:'+(info.phoneNumbers[0].phone)+'">'+(info.phoneNumbers[0].phone)+'</a>';
    }
    else {
        phoneNumber = 'N/A'
    }
    //console.log(phoneNumber);

    //console.log(department);

    var addressLocation = info.addresses;
    var addressString = '';
    if (addressLocation !== undefined) {
        var addressConstruct = addressLocation[0];
        //console.log(addressConstruct);
        addressString = addressConstruct.line1 + ' | ' + addressConstruct.line2;
    }
    else {
        addressString = 'N/A'
    }
    //console.log(addressString);

    var photoAddress = 'https://unidirectory.auckland.ac.nz' + info.image;
    //console.log(photoAddress);

    temp = setPeople(info.fullName, vcard, info.positions[0].department.name, info.emailAddresses, phoneNumber, info.positions[0].position, addressString, photoAddress)
    people.innerHTML += temp;

}

function setPeople(fullname, vcard, department, email, phone, position, address, photo) {
    var lines =
    '<h2 class="linkCursor linkText" onclick="location.href='+ "'" +vcard+ "'"+'">'+fullname+'</h2>'+
    '<div class="card">'+
      '<div class="left">'+
      '<img class="photo" src="'+photo+'" alt="" />'+
      '</div>'+
      '<div class ="right">'+
          '<span>Department: '+department+'</span><br>'+
          '<span>Email: <a href="mailto:'+email+'">'+email+'</a></span><br>'+
          '<span>Phone: '+phone+'</span><br>'+
          '<span>Position: '+position+'</span><br>'+
          '<span>Office: '+address+'</span><br>'+
       '</div>'+
       '<div style="clear:both;"></div>'+
    '</div>'

    return lines
}

function inputSubmit() {
    var name = document.getElementById("nameInput").value;
    var comment = document.getElementById("commentInput").value;
    if (name != '' && comment != '') {
        //console.log(name);
        //console.log(comment);
        postComment(name, comment);
        name = '';
        comment = '';
    }
    else {
        confirm("Please enter your name and comment!")
    }
}

function postComment(name, comment){
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name;

    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.onload = function() {
      document.getElementById("lol").innerHTML = "";
      getComments();
    }

    xhr.send(JSON.stringify(comment));
}

function getComments() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
  	xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var version_d = document.getElementById("show_result");
        var response = xhr.responseText;
        //console.log(response);
        setComments(response);
    }
    xhr.send(null);
}

function setComments(html) {
    var comments = document.getElementById("lol")

    comments.innerHTML += html
}
