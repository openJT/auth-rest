var auth = (function () {
    'use strict';
    var message;
    return {
        auth: auth
    }
    function auth() {
        var http = new XMLHttpRequest();
        var url = "/auth-rest/auth/local";
        http.open("POST", url, true);
        http.setRequestHeader("Content-type", "application/json");
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                window.localStorage.setItem('token', JSON.parse(http.responseText).token);
                window.location.assign('/auth-rest/clients')
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                message = JSON.parse(http.responseText).message;
                document.getElementById('errorMsg').innerHTML = message;
            }
        }
        http.send(JSON.stringify({
            email: document.forms["loginForm"].elements['email'].value,
            password: document.forms["loginForm"].elements['password'].value
        }));
    }
})()
