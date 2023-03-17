"use strict";
(function () {
    function addContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function AjaxRequest(method, url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            console.log(xhr.readyState);
            console.log(xhr.status);
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (typeof callback === "function") {
                    callback(xhr.responseText);
                }
                else {
                    console.error("Error: callback is not a valid function");
                }
            }
        });
        xhr.open(method, url);
        xhr.send();
    }
    function LoadFooter() {
    }
    function Start() {
        console.log("App started");
        LoadHeader();
        AjaxRequest("GET", "./Views/components/header.html", LoadHeader);
        loadContent(router.ActiveLink, ActiveLinkCallback(router.ActiveLink));
        LoadFooter();
    }
    window.addEventListener("load", Start);
    function loadContent(ActiveLink, f) {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback(router.ActiveLink);
        $.get(`./Views/content/${page_name}.html`, function (html_data) {
            $("main").html(html_data);
            callback();
        });
    }
    function LoadHeader(html_data) {
        $.get("/Views/components/header.html", function (html_data) {
            $("header").html(html_data);
            $(`li>a:contains(${document.title})`).addClass("active");
            Checklogin();
        });
    }
    function DisplayHomePage() {
        console.log("Home page called");
        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html";
        });
        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);
        $("body").append(`<article class="container">
                        <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);
        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is the main paragraph";
        MainContent.appendChild(MainParagraph);
        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph`;
        MainParagraph.textContent = SecondString;
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p> `;
        Article.setAttribute("class", "container");
    }
    function DisplayProductsPage() {
        console.log("Products Page");
    }
    function DisplayServicesPage() {
        console.log("Services Page");
        AjaxRequest("GET", "header.html", LoadHeader);
    }
    function DisplayContactPage() {
        console.log("Contact Page");
        AjaxRequest("GET", "header.html", LoadHeader);
        TestFullName();
        TestEmail();
        TestPhoneNumber();
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckBox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckBox.checked) {
                let fullname = document.forms[0].fullname.value;
                let contactnumber = document.forms[0].contactnumber.value;
                let EmailAddress = document.forms[0].EmailAddress.value;
                let contact = new core.Contact(fullname, contactnumber, EmailAddress);
                if (contact.serialize()) {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact List Page");
        $("#addButton").on("click", () => {
            location.href = "edit.html#add";
        });
        if (localStorage.length > 0) {
            let ContactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.fullName}</td>
                         <td>${contact.contactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         <td class="text-center">
                             <button value="${key}" class="btn btn-primary btn-sm mb-1 edit">
                                <i class="fas fa-edit fa-sm">Edit</i>
                             </button>
                         </td>
                         <td class="text-center">
                         <button value="${key}" class="btn btn-danger btn-sm mb-1 delete">
                            <i class="fas fa-edit fa-sm">Delete</i>
                         </button></td>
                         </tr>`;
                index++;
            }
            ContactList.innerHTML = data;
            $("#addButton").on("click", () => {
                location.href = "edit.html#add";
            });
            $("button.delete").on("click", function () {
                if (confirm("Delete contact, are you sure?")) {
                    localStorage.removeItem($(this).val());
                }
                location.href = "contact-list.html";
            });
            $("button.edit").on("click", function () {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }
    function DisplayAboutPage() {
        console.log("About Us Page");
    }
    function DisplayEditContactPage() {
        let page = location.hash.substring(1);
        console.log("Edit page");
        switch (page) {
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm></i> Add`);
                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    let fullname = document.forms[0].fullname.value;
                    let contactnumber = document.forms[0].contactnumber.value;
                    let EmailAddress = document.forms[0].EmailAddress.value;
                    addContact(fullname, contactnumber, EmailAddress);
                    location.href = "contact-list.html";
                });
                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;
            default:
                {
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();
                        localStorage.setItem(page, contact.serialize());
                        location.href = "contact-list.html";
                    });
                    $("#cancelButton").on("click", () => {
                        location.href = "./contact-list";
                    });
                }
                break;
        }
    }
    function DisplayRegisterPage() {
        console.log("register page");
    }
    function ActiveLinkCallback(ActiveLink) {
        switch (router.ActiveLink) {
            case "home":
                return DisplayHomePage;
            case "about":
                return DisplayAboutPage;
            case "service":
                return DisplayServicesPage;
            case "contact":
                return DisplayContactPage;
            case "contact-list":
                return DisplayContactListPage;
            case "products":
                return DisplayProductsPage;
            case "register":
                return DisplayRegisterPage;
            case "login":
                return DisplayLoginPage;
            case "edit":
                return DisplayEditContactPage;
            case "404":
                return Display404Page;
            default:
                console.error("Error: callback does not exist" + activelink);
                return new Function();
        }
    }
    function Display404Page() {
    }
    function TestFullName() {
        console.log("Called testfullname");
        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/;
        let messagearea = $("#messageArea");
        $("#fullname").on("blur", function () {
            let fullNameTEXT = $(this).val();
            if (fullNamePattern.test(fullNameTEXT)) {
                messagearea.removeAttr("class");
                messagearea.hide();
            }
            else {
                $(this).trigger("focus");
                $(this).trigger("select");
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid full name!");
                messagearea.show();
            }
        });
    }
    function TestFullName() {
        console.log("Called testfullname");
        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/;
        let messagearea = $("#messageArea");
        $("#fullname").on("blur", function () {
            let fullNameTEXT = $(this).val();
            if (!(fullNamePattern.test(fullNameTEXT))) {
                $(this).trigger("focus");
                $(this).trigger("select");
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid full name!");
                messagearea.show();
            }
            else {
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }
    function TestEmail() {
        let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/;
        let messagearea = $("#messageArea");
        $("#EmailAddress").on("blur", function () {
            let EmailTEXT = $(this).val();
            if (!(EmailPattern.test(EmailTEXT))) {
                $(this).trigger("focus");
                $(this).trigger("select");
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid email!");
                messagearea.show();
            }
            else {
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }
    function TestPhoneNumber() {
        let PhonePattern = /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/;
        let messagearea = $("#messageArea");
        $("#").on("blur", function () {
            let EmailTEXT = $(this).val();
            if (!(PhonePattern.test(EmailTEXT))) {
                $(this).trigger("focus");
                $(this).trigger("select");
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid phone number!");
                messagearea.show();
            }
            else {
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }
    function validateFields(input_field_ID, regular_expression, error_message) {
        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/;
        let messagearea = $("#messageArea");
        $(input_field_ID).on("blur", function () {
            let fullNameTEXT = $(this).val();
            if (regular_expression.test(fullNameTEXT)) {
                $(this).trigger("focus");
                messagearea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messagearea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        validateFields("#fullname", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/, "Please enter a valid name!");
        validateFields("#EmailAddress", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid email!");
        validateFields("#contactnumber", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid phone number!");
    }
    function Checklogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            location.href = "index.html";
        });
    }
    function DisplayLoginPage() {
        console.log("Login page called.");
        let messageArea = $("#messageArea");
        messageArea.hide();
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.user();
            $.get("./data/users.json", function (data) {
                for (const user of data.users) {
                    if (username.value === user.username && password.value === user.password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contact-list.html";
                }
                else {
                    $("userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: invalid login credentials").show();
                }
            });
            $("#cancelButton").on("click", function () {
                document.forms[0].reset();
                location.href = "index.html";
            });
        });
    }
})();
//# sourceMappingURL=app.js.map