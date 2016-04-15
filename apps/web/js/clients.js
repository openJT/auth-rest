
var clients = (function () {
    'use strict';
    var clients = [], message, currentClient;
    var dialog = document.querySelector('#dialog');
    var editDialog = document.querySelector('#editDialog');
    var socket = io('/admin', { 'query': 'token=' + window.localStorage.getItem("token") });
    var snackbarContainer = document.querySelector('#toast');

    socket.on('addClient', function (client) {
        clients.push(client);
        drawTable();
        toast({ message: client.firstName + " " + client.lastName + " was added!" });
    });
    socket.on('deleteClient', function (client) {
        clients.forEach(function (t, i) {
            if (t._id === client._id) {
                clients.splice(i, 1);
                drawTable();
                toast({ message: client.firstName + " " + client.lastName + " was deleted!" });
            }
        });
    });
    socket.on('updateClient', function (client) {
        clients.forEach(function (t, i) {
            if (t._id === client._id) {
                clients[i] = client;
                drawTable();
                toast({ message: client.firstName + " " + client.lastName + " was updated!" });
            }
        });
    });
    socket.on('reset', function (client) {
        var http = new XMLHttpRequest();
        var url = "/client";
        http.open("GET", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                clients = JSON.parse(http.responseText);
                drawTable();
                toast({ message: "Data reset!" });
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    })

    return {
        logout: logout,
        saveClient: saveClient,
        addClientDialog: addClientDialog,
        drawTable: drawTable,
        getData: getData,
        cancel: cancel,
        cancelEdit: cancelEdit,
        reset: reset,
        updateClient: updateClient
    }
    function toast(msg) {
        snackbarContainer.MaterialSnackbar.showSnackbar(msg);
    }
    function getData() {
        var http = new XMLHttpRequest();
        var url = "/client";

        http.open("GET", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                clients = JSON.parse(http.responseText);
                drawTable();
            }
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }
    function drawTable() {
        var element = document.getElementById("main");
        element.innerHTML = "";
        for (var i = 0; i < clients.length; i++) {
            (function (i) {
                var row = document.createElement("div");
                row.className = "flex";
                row.className += " row";
                row.className += " over";

                var child = document.createElement("div");
                child.className = "flex-item"
                row.className += " aCenter";
                child.innerHTML = clients[i].lastName;
                row.appendChild(child);

                var child2 = document.createElement("div");
                child2.className = "flex-item";
                child2.className += " hideColumnSmall";
                child2.innerHTML = clients[i].firstName;
                row.appendChild(child2);

                var child3 = document.createElement("div");
                child3.className = "flex-item";
                child3.className += " hideColumn";
                child3.innerHTML = clients[i].company;
                row.appendChild(child3);

                var child4 = document.createElement("div");
                child4.className = "flex-item";
                child4.className += " hideColumn";
                child4.innerHTML = clients[i].position;
                row.appendChild(child4);

                var child5 = document.createElement("div");
                child5.onclick = function () { editClient(i) };
                child5.className += " flex-item";

                var child6 = document.createElement("img");
                child6.src = "material-icons/ic_edit_24px.svg";
                child6.style.cursor = "pointer";
                child5.appendChild(child6);
                row.appendChild(child5);

                var child7 = document.createElement("div");
                child7.onclick = function () { deleteClient(i) };
                child7.className += " flex-item";

                var child8 = document.createElement("img");
                child8.src = "material-icons/ic_delete_24px.svg";
                child8.style.cursor = "pointer";
                child7.appendChild(child8);

                row.appendChild(child7);
                element.appendChild(row);
            })(i)
        }
    }
    function logout() {
        window.localStorage.removeItem("token");
        window.location.assign('/');
    }
    function saveClient() {
        if (
            document.forms["laForm"].elements['lastName'].value === '' ||
            document.forms["laForm"].elements['firstName'].value === ''
        ) {
            var data = { message: 'Please fill all required fields' };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);

        }
        else if (document.getElementById("add").style.display === "none") updateClient();
        else addClient();
    }
    function addClient() {
        var http = new XMLHttpRequest();
        var url = "/client";
        http.open("POST", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Content-type", "application/json");
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 201) {
                dialog.close();
                resetForm();
            }
        }
        http.send(JSON.stringify({
            lastName: document.forms["laForm"].elements['lastName'].value,
            firstName: document.forms["laForm"].elements['firstName'].value,
            company: document.forms["laForm"].elements['company'].value,
            position: document.forms["laForm"].elements['position'].value
        }));
    }
    function editClient(i) {
        currentClient = i;
        showEditDialog();
        setTimeout(function () {
            document.forms["editForm"].elements['lastName'].value = clients[i].lastName;
            document.forms["editForm"].elements['firstName'].value = clients[i].firstName;
            document.forms["editForm"].elements['company'].value = clients[i].company;
            document.forms["editForm"].elements['position'].value = clients[i].position;
        }, 0)

    }
    function updateClient() {
        if (
            document.forms["editForm"].elements['lastName'].value === '' ||
            document.forms["editForm"].elements['firstName'].value === ''
        ) {
            var data = { message: 'Please fill all required fields' };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
        else {
            var http = new XMLHttpRequest();
            var url = "/client";
            http.open("PUT", url, true);
            var token = 'Bearer ' + window.localStorage.getItem("token");
            if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
            http.setRequestHeader("Content-type", "application/json");
            http.setRequestHeader("Accept", "application/json");
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    editDialog.close();
                }
                else if (http.readyState == 4 && http.status == 401) {

                }
            }
            http.send(JSON.stringify({
                _id: clients[currentClient]._id,
                lastName: document.forms["editForm"].elements['lastName'].value,
                firstName: document.forms["editForm"].elements['firstName'].value,
                company: document.forms["editForm"].elements['company'].value,
                position: document.forms["editForm"].elements['position'].value,
            }));
        }
    }
    function deleteClient(i) {
        var http = new XMLHttpRequest();
        var url = "/client/" + clients[i]._id;
        http.open("DELETE", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 204) {

            }
        }
        http.send();
    }
    function addClientDialog() {
        showDialog();
    }
    function showDialog() {
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        else dialog.showModal();
    }
    function showEditDialog() {
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(editDialog);
        }
        else editDialog.showModal();
    }
    function resetForm() {
        document.forms["laForm"].reset();
    }
    function reset() {
        var element = document.getElementById("main");
        element.innerHTML = "";

        var http = new XMLHttpRequest();
        var url = "/reset";
        http.open("GET", url, true);
        var token = 'Bearer ' + window.localStorage.getItem("token");
        if (window.localStorage.getItem("token")) http.setRequestHeader("Authorization", token)
        http.setRequestHeader("Accept", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200);
            else if (http.readyState == 4 && http.status == 401) {
                window.localStorage.removeItem("token");
                window.location.assign('/web');
            }
        }
        http.send();
    }
    function cancel() {
        dialog.close();
        resetForm();
    }
    function cancelEdit() {
        document.forms["editForm"].reset();
        editDialog.close();
    }
})()

