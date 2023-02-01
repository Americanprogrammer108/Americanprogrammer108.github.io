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
        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p")

        MainParagraph.setAttribute("id", "MainParagraph")
        MainParagraph.setAttribute("class", "mt-3")
        MainParagraph.textContent = "This is the main paragraph"
        MainContent.appendChild(MainParagraph);

        let FirstString = "This is";
        let SecondString = `${FirstString} the main paragraph`;
        MainParagraph.textContent = SecondString;

        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        Article.setAttribute("class", "container")
        Article.innerHTML = ArticleParagraph;
        MainContent.appendChild(Article);

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