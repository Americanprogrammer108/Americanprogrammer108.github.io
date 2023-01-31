"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function (){

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

        }

    }
    window.addEventListener("load", Start)

    function DisplayHomePage()
    {
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function ()
        {
            location.href = "about.html"
        })
    }

    function DisplayProductsPage()
    {

    }
    function DisplayServicesPage()
    {

    }
    function DisplayContactPage()
    {

    }
    function DisplayAboutPage()
    {

    }


})();