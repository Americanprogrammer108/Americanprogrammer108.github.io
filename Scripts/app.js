"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function (){

    function addContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact();
        if (contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function Start()
    {
        console.log("App started")
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

        }

    }
    window.addEventListener("load", Start)

    function DisplayHomePage()
    {
        console.log("Home page called");

        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html"
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`);
        $("body").append(`<article class="container">
                        <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p")
        MainParagraph.setAttribute("id", "MainParagraph")
        MainParagraph.setAttribute("class", "mt-3")
        MainParagraph.textContent = "This is the main paragraph"

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
    }
    function DisplayContactPage()
    {
        console.log("Contact Page");
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
                         <td>
                             <button value="${key}" class="btn btn-primary btn-sm mb-1 edit">
                                <i class="fas fa-edit fa-sm">Edit</i>
                             </button>
                         </td>
                         <td>
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
                    location.href = "contact-list.html"
                });
                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html"
                });
                break;
            default:
            {
                //edit separation code
                let contact = new Contact();
                contact.deserialize(localStorage.getItem(page));

                $("#fullname").val(contact.FullName);
                $("#contactnumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();

                    contact.FullName = $("#fullname").val();
                    contact.ContactNumber = $("#contactnumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());


                    location.href = "contact-list.html"
                });
            }
            break;
        }
    }

})();