"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function


(function (){

    function addContact(fullName, contactNumber, emailAddress)
    {
        let contact = new Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }


    function AjaxRequest(method, url, callback)
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

    function LoadHeader(html_data)
    {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active");
        Checklogin();
    }

    function Start()
    {
        console.log("App started");
        AjaxRequest("GET", "header.html", LoadHeader);
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

        }

    }
    window.addEventListener("load", Start)



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
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckBox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function (event)
        {
            if(subscribeCheckBox.checked)
            {
                let contact = new Contact(fullname.value, contactnumber.value, EmailAddress.value);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
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
            let ContactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;
            for (const key of keys)
            {
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
                location.href = "edit.html#add"
            });

            $("button.delete").on("click", function () {
                if(confirm("Delete contact, are you sure?"))
                {
                    localStorage.removeItem($(this).val())
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
                    addContact(fullname.value, contactnumber.value, EmailAddress.value);
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
            }
                break;
        }
    }

    function DisplayRegisterPage()
    {
        let messagearea = $("#ErrorMessage");
        messagearea.hide();
        console.log("Register page called");
        TestFirstName();
        TestLastName();
        TestRegisterEmail();
        TestPassword();
        TestPassword2();

        $("#sendButton").on("click", function(event){
            event.preventDefault()
            let firstNameTEXT = $("#firstname").val();
            let lastNameTEXT = $("#lastname").val();
            let emailAddressTEXT = $("#EmailAddress").val();
            let passwordTEXT = $("#password").val();

            //let newuser = new user(`${firstNameTEXT} ${lastNameTEXT}`, `${emailAddressTEXT}`, `${passwordTEXT}`);

            console.log(firstNameTEXT);
            console.log(lastNameTEXT);
            console.log(emailAddressTEXT);
            console.log(passwordTEXT);

            let clearForm = document.getElementById("registrationform").reset();

        });
    }
    function DisplayLoginPage()
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
                    if(username.value === user.Username && password.value === user.password)
                    {
                        newuser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success)
                {
                    sessionStorage.setItem("user", newuser.serialize());
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

    function TestFirstName()
    {
        console.log("Called testfirstname");

        let firstNamePattern = /^[a-zA-Z]+$/;
        let messagearea = $("#ErrorMessage");

        $("#firstname").on("blur", function()
        {
           let firstNameTEXT = $("#firstname").val();
           if(firstNameTEXT == "")
           {
               $(this).trigger("focus"); //return the user back to fullname textbox
               $(this).trigger("select"); //highlight text in fullname textbox
               messagearea.addClass("alert alert-danger");
               messagearea.text("Please enter a valid first name!");
               messagearea.show();
               console.log("Name is null");
           }
           else if(!firstNamePattern.test(firstNameTEXT))
           {
               $(this).trigger("focus"); //return the user back to fullname textbox
               $(this).trigger("select"); //highlight text in fullname textbox
               messagearea.addClass("alert alert-danger");
               messagearea.text("First Name is not valid!");
               messagearea.show();
               console.log("Name is not valid");
           }
           else
           {
               //pass validation
               messagearea.removeAttr("class");
               messagearea.hide();
           }
        });
    }

    function TestLastName()
    {
        console.log("Called testlastname");

        let lastNamePattern = /^[a-zA-Z]+$/;
        let messagearea = $("#ErrorMessage");
        $("#lastname").on("blur", function() {
            let lastNameTEXT = $("#lastname").val();
            if (lastNameTEXT == "")
            {
                $(this).trigger("focus"); //return the user back to fullname textbox
                $(this).trigger("select"); //highlight text in fullname textbox
                messagearea.addClass("alert alert-danger");
                messagearea.text("Please enter a valid last name!");
                messagearea.show();
                console.log("Name is null");
            }
            else if (!lastNamePattern.test(lastNameTEXT))
            {
                $(this).trigger("focus"); //return the user back to fullname textbox
                $(this).trigger("select"); //highlight text in fullname textbox
                messagearea.addClass("alert alert-danger");
                messagearea.text("First Name is not valid!");
                messagearea.show();
                console.log("Name is not valid");
            }
            else
            {
                //pass validation
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });

    }
    function TestFullName()
    {
        console.log("Called testfullname");

        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/; ///^[a-zA-Z].*[\s\.]*$/;
        let messagearea = $("#messageArea");

        $("#fullname").on("blur", function()
        {
           let fullNameTEXT = $(this).val();
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
            let EmailTEXT = $(this).val();
            if(!(EmailPattern.test(EmailTEXT)))
            {
                //fail validation
                if (EmailTEXT == "")
                {
                    $(this).trigger("focus"); //return the user back to fullname textbox
                    $(this).trigger("select"); //highlight text in fullname textbox
                    messagearea.addClass("alert alert-danger");
                    messagearea.text("Please enter a valid email!");
                    messagearea.show();
                }
                else
                {
                    messagearea.addClass("alert alert-danger");
                    messagearea.text("Email must have an @ symbol!");
                    messagearea.show();
                }

            }
            else
            {
                //pass validation
                messagearea.removeAttr("class");
                messagearea.hide();
            }
        });
    }

    function TestRegisterEmail()
    {
        let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/;
        let messagearea = $("#ErrorMessage");

        $("#EmailAddress").on("blur", function()
        {
            let EmailTEXT = $(this).val();
            if(!(EmailPattern.test(EmailTEXT)))
            {
                //fail validation
                if (EmailTEXT == "")
                {
                    $(this).trigger("focus"); //return the user back to fullname textbox
                    $(this).trigger("select"); //highlight text in fullname textbox
                    messagearea.addClass("alert alert-danger");
                    messagearea.text("Please enter a valid email!");
                    messagearea.show();
                }
                else
                {
                    messagearea.addClass("alert alert-danger");
                    messagearea.text("Email must have an @ symbol!");
                    messagearea.show();
                }

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
            let EmailTEXT = $(this).val();
            if(!(PhonePattern.test(EmailTEXT)))
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

    //validate for password field
    function TestPassword()
    {
        let messagearea = $("#ErrorMessage");
        let PasswordPattern = /(?=.{6,})/;
        let confirmpassword = $("#confirmpassword").val();
        //check length
        $("#password").on("blur", function()
        {
            let PasswordTEXT = $(this).val();
            if(PasswordTEXT.length < 6)
            {
                if (PasswordTEXT == "")
                {
                    $(this).trigger("focus"); //return the user back to fullname textbox
                    $(this).trigger("select"); //highlight text in fullname textbox
                    messagearea.addClass("alert alert-danger");
                    messagearea.text("Please enter a password!");
                    messagearea.show();
                }
                else
                {
                    $(this).trigger("focus"); //return the user back to fullname textbox
                    $(this).trigger("select"); //highlight text in fullname textbox
                    messagearea.addClass("alert alert-danger");
                    messagearea.text("This password is not strong enough. Try another one.");
                    messagearea.show();
                }

            }
            else if (!PasswordPattern.test(PasswordTEXT))
            {
                console.log("Not enough to secure it.");

            }
            else
            {
                console.log("Password secured");
                messagearea.removeAttr("class");
                messagearea.hide();
            }


            //console.log(PasswordTEXT);
        });
    }

    //validate to see if both passwords match
    function TestPassword2()
    {
        let messagearea = $("#ErrorMessage");

        $("#confirmpassword").on("blur", function()
        {
            let PasswordTEXT = $("#password").val();
            let ConfirmPassword = $("#confirmpassword").val();
            if(PasswordTEXT != ConfirmPassword)
            {
                $(this).trigger("focus"); //return the user back to fullname textbox
                $(this).trigger("select"); //highlight text in fullname textbox
                messagearea.addClass("alert alert-danger");
                messagearea.text("The passwords do not match! Try again.");
                messagearea.show();
            }
            else
            {
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
    function validateFields(input_field_ID, regular_expression, error_message)
    {
        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/;
        let messagearea = $("#messageArea");

        $(input_field_ID).on("blur", function()
        {
            let fullNameTEXT = $(this).val();
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
                    if(username.value === user.username && password.value === user.password)
                    {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success)
                {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();

                    location.href = "contact-list.html";
                }
                else
                {
                    $("userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: invalid login credentials").show();
                }

            });
                        $("#loginButton").on("click",function (){
                $("#Navusername").text("tester");
                $("#Navusername").removeAttr("disabled");

        })
            $("#cancelButton").on("click", function()
            {
                document.forms[0].reset();
                location.href = "index.html";
            });
        });

    }




})();
