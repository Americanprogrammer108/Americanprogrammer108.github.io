"use strict";

namespace core
{
   export class Router
   {
       private m_activeLink : string;
       private m_linkData : string;
       private m_routingTable : string[];
       /**
        *
        * @returns {*}
        * @constructor
        */
       //public properties
        public get ActiveLink() : string
        {
            return this.m_activeLink;
        }

       /**
        *
        * @param link
        * @constructor
        */
        public set ActiveLink(link : string)
        {
            this.m_activeLink = link;
        }

       public get LinkData() : string
       {
           return this.m_linkData;
       }

       /**
        *
        * @param link
        * @constructor
        */
       public set LinkData(link : string)
       {
           this.m_linkData = link;
       }

       //constructor
       constructor()
       {
           this.m_activeLink = "";
           this.m_routingTable = [];
           this.m_linkData = "";
       }


       //public methods
       public add(route : string) : void
       {
            this.m_routingTable.push(route);
       }

       public addTable(routeTable: string[]) : void
       {
            this.m_routingTable = routeTable;
       }

       public find(route : string) : number
       {
            return this.m_routingTable.indexOf(route);
       }

       public remove(route : string) : boolean
       {
            if(this.find(route) > -1)
            {
                this.m_routingTable.splice(this.find(route), 1);
                return true;
            }
            return false;
       }


       //public override methods
       public toString() : string
       {
           return this.m_routingTable.toString();
       }
   }
}

let router : core.Router = new core.Router();

router.addTable(
    [
        "/",
        "/home",
        "/about",
        "/services",
        "/contact",
        "/contact-list",
        "/products",
        "/register",
        "/login",
        "/edit",
        "/task-list"
    ]
);

let route : string = location.pathname;

router.ActiveLink = (router.find(route) > -1)
    ? (route === "/") ? "home": route.substring(1)
    : ("404");