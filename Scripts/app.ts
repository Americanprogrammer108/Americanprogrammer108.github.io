"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function (){


    function addContact(fullName : string, contactNumber : string, emailAddress : string)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }


    function AjaxRequest(method : string, url : string, callback : Function)
    {
        //1
        let xhr = new XMLHttpRequest();

        //2
        xhr.addEventListener("readystatechange", () =>
        {
            console.log(xhr.readyState);
            console.log(xhr.status);
            if (xhr.readyState === 4 && xhr.status === 200)
            {
                if (typeof callback === "function")
                {
                    callback(xhr.responseText);
                }
                else
                {
                    console.error("Error: callback is not a valid function");
                }


            }
        });

        //3
        xhr.open(method, url);

        //4
        xhr.send();
    }



    function LoadFooter()
    {

    }
    function Start()
    {
        console.log("App started");
        //TODO
        // @ts-ignore
        LoadHeader()


        AjaxRequest("GET", "./Views/components/header.html", LoadHeader);


        //TODO
        loadContent(router.ActiveLink, ActiveLinkCallback(router.ActiveLink));

        //TODO
        LoadFooter()

        /*
        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditContactPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;

        } */

    }
    window.addEventListener("load", Start)

    //ActiveLink, callback
    function loadContent(ActiveLink: string, f: Function)
    {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback(router.ActiveLink);

        $.get(`./Views/content/${page_name}.html`, function(html_data)
        {
           $("main").html(html_data);
           callback();
        });
    }


    function LoadHeader(html_data : string)
    {
        $.get("/Views/components/header.html", function(html_data)
        {
            $("header").html(html_data);

            $(`li>a:contains(${document.title})`).addClass("active");
            Checklogin();
        });

    }

    function DisplayHomePage()
    {
        console.log("Home page called");
        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);
        $("body").append(`<article class="container">
                        <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p")
        MainParagraph.setAttribute("id", "MainParagraph")
        MainParagraph.setAttribute("class", "mt-3")
        MainParagraph.textContent = "This is the main paragraph";

        MainContent.appendChild(MainParagraph);
        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph`;
        MainParagraph.textContent = SecondString;

        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p> `
        Article.setAttribute("class", "container")

    }

    function DisplayProductsPage()
    {
        console.log("Products Page");

    }
    function DisplayServicesPage()
    {
        console.log("Services Page");
        AjaxRequest("GET", "header.html", LoadHeader);

    }

    function DisplayContactPage()
    {
        console.log("Contact Page");
        AjaxRequest("GET", "header.html", LoadHeader);


        TestFullName();
        TestEmail();
        TestPhoneNumber();
        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckBox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function (event)
        {
            if(subscribeCheckBox.checked)
            {
                let fullname = document.forms[0].fullname.value;
                let contactnumber = document.forms[0].contactnumber.value;
                let EmailAddress = document.forms[0].EmailAddress.value;

                let contact = new core.Contact(fullname, contactnumber, EmailAddress);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize() as string);
                }
            }
        });
    }



    function DisplayContactListPage()
    {
        console.log("Contact List Page");
        $("#addButton").on("click", () => {
            location.href = "edit.html#add"
        });

        if(localStorage.length > 0)
        {
            let ContactList = document.getElementById("contactList") as HTMLElement;
            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;
            for (const key of keys)
            {
                let contactData = localStorage.getItem(key) as string;
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.Email}</td>
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
                location.href = "edit.html#add"
            });

            $("button.delete").on("click", function () {
                if(confirm("Delete contact, are you sure?"))
                {
                    localStorage.removeItem($(this).val() as string)
                }
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function () {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }
    function DisplayAboutPage()
    {
        console.log("About Us Page");

    }

    function DisplayEditContactPage()
    {
        let page = location.hash.substring(1);
        console.log("Edit page");
        switch(page)
        {
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm></i> Add`);
                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    let fullname = document.forms[0].fullname.value;
                    let contactnumber = document.forms[0].contactnumber.value;
                    let EmailAddress = document.forms[0].EmailAddress.value;

                    addContact(fullname, contactnumber, EmailAddress);
                    //refresh the contact list page
                    location.href = "contact-list.html"
                });
                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html"
                });
                break;
            default:
            {
                //edit separation code
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string);

                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.Email);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();

                    contact.FullName = $("#fullName").val() as string;
                    contact.ContactNumber = $("#contactNumber").val() as string;
                    contact.Email = $("#emailAddress").val() as string;

                    localStorage.setItem(page, contact.serialize() as string);

                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () =>
                {
                   location.href = "./contact-list"
                });
            }
                break;
        }
    }

    function DisplayRegisterPage()
    {
        console.log("register page");
    }

    function ActiveLinkCallback(activelink: string): Function
    {
        switch(router.ActiveLink)
        {
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

    function Display404Page()
    {

    }

    /* function DisplayLoginPage()
    {
        console.log("login page");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;
            let newuser = new core.user();

            $.get("./data/user.json", function() {
                for (const user of data.user)
                {
                    let username = document.forms[0].username.value
                    let password = document.forms[0].password.value

                    if(username === user.Username && password === user.password)
                    {
                        newuser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success)
                {
                    sessionStorage.setItem("user", newuser.serialize() as string);
                    messageArea.removeAttr("class").hide();

                    location.href = "contact-list.html";
                }
                else
                {
                    //failed
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials").show();
                }
            });

            $("#cancelButton").on("click", function()
            {
                document.forms[0].reset();
                location.href = "index.html";
            });
        });
    }
    */
    /* function TestFullName()
    {
        console.log("Called testfullname");

        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/;
        let messagearea = $("#messageArea");

        $("#fullname").on("blur", function()
        {
           let fullNameTEXT : string = $(this).val();
           if(fullNamePattern.test(fullNameTEXT))
           {
               //pass validation
               messagearea.removeAttr("class");
               messagearea.hide();


           }
           else
           {
               //fail validation
               $(this).trigger("focus"); //return the user back to fullname textbox
               $(this).trigger("select"); //highlight text in fullname textbox
               messagearea.addClass("alert alert-danger");
               messagearea.text("Please enter a valid full name!");
               messagearea.show();
           }
        });
    }*/
    function TestFullName()
    {
        console.log("Called testfullname");

        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/; ///^[a-zA-Z].*[\s\.]*$/;
        let messagearea = $("#messageArea");

        $("#fullname").on("blur", function()
        {
           let fullNameTEXT = $(this).val() as string;
           if(!(fullNamePattern.test(fullNameTEXT)))
           {
               //fail validation
               $(this).trigger("focus"); //return the user back to fullname textbox
               $(this).trigger("select"); //highlight text in fullname textbox
               messagearea.addClass("alert alert-danger");
               messagearea.text("Please enter a valid full name!");
               messagearea.show();


           }
           else
           {
               //pass validation
               messagearea.removeAttr("class");
               messagearea.hide();
           }
        });
    }

    function TestEmail()
    {
        let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/;
        let messagearea = $("#messageArea");

        $("#EmailAddress").on("blur", function()
        {
            let EmailTEXT = $(this).val() as string;
            if(!(EmailPattern.test(EmailTEXT)))
            {
                //fail validation
                $(this).trigger("focus"); //return the user back to fullname textbox
                $(this).trigger("select"); //highlight text in fullname textbox
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid email!");
                messagearea.show();


            }
            else
            {
                //pass validation
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }

    function TestPhoneNumber()
    {
        let PhonePattern = /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/;
        let messagearea = $("#messageArea");

        $("#").on("blur", function()
        {
            let PhoneTEXT = $(this).val() as string;
            if(!(PhonePattern.test(PhoneTEXT)))
            {
                //fail validation
                $(this).trigger("focus"); //return the user back to fullname textbox
                $(this).trigger("select"); //highlight text in fullname textbox
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid phone number!");
                messagearea.show();


            }
            else
            {
                //pass validation
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }
    /**
     * This function will validate input fields provided based on a given regular expression
     * @param input_field_ID
     * @param regular_expression
     * @param error_message
     */
    function validateFields(input_field_ID : string, regular_expression : RegExp, error_message : string)
    {
        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/;
        let messagearea = $("#messageArea");

        $(input_field_ID).on("blur", function()
        {
            let fullNameTEXT = $(this).val() as string;
            if(regular_expression.test(fullNameTEXT))
            {
                //fail validation
                $(this).trigger("focus"); //return the user back to fullname textbox
                messagearea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                //pass validation
                messagearea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation()
    {
        validateFields("#fullname", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/,
        "Please enter a valid name!"); //fullname

        validateFields("#EmailAddress", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
        "Please enter a valid email!"); //email

        validateFields("#contactnumber", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
        "Please enter a valid phone number!"); //phone number

    }

    function Checklogin()
    {
        if(sessionStorage.getItem("user"))
        {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`)
        }

        $("#logout").on("click", function()
        {
            sessionStorage.clear();

            location.href = "index.html";
        });
    }

    function DisplayLoginPage()
    {
        console.log("Login page called.");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function ()
        {
            let success = false;
            let newUser = new core.user();

            $.get("./data/users.json", function (data)
            {
                for(const user of data.users)
                {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;

                    if(username.value === user.username && password.value === user.password)
                    {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success)
                {
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();

                    location.href = "contact-list.html";
                }
                else
                {
                    $("userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: invalid login credentials").show();
                }

            });
            $("#cancelButton").on("click", function()
            {
                document.forms[0].reset();
                location.href = "index.html";
            });
        });

    }




})();