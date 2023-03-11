"user strict";

namespace core
{
   export class user
   {
       private m_displayName: string;
       private m_emailAddress: string;
       private m_username: string;
       private m_password: string;
       constructor(displayName : string = "", emailAddress: string = "", username: string = "", password: string = "")
       {
           this.m_displayName = displayName;
           this.m_emailAddress = emailAddress;
           this.m_username = username;
           this.m_password = password;
       }

       //start of getters
       public get Name() : string
       {
           return this.m_displayName;
       }

       public get EmailAddress() : string
       {
           return this.m_emailAddress;
       }

       public get Username() : string
       {
           return this.m_username;
       }

       public get Password() : string
       {
           return this.m_password;
       }
       //end of getters

       //start of setters
       public set EmailAddress(email: string)
       {
           this.EmailAddress = email;
       }
       public set Name(displayname: string)
       {
           this.m_displayName = displayname;
       }
       public set Username(username: string)
       {
           this.Username = username;
       }
       public set Password(password: string)
       {
           this.Password = password;
       }
       //end of setters

       public toString() : string
       {
           return `DisplayName: ${this.m_displayName}\n Email Address: ${this.m_emailAddress}\n Username: ${this.m_username}`;
       }

       toJSON() : {Username: string, DisplayName: string, EmailAddress: string}
       {
           return {
               "DisplayName": this.m_displayName,
               "EmailAddress": this.m_emailAddress,
               "Username": this.m_username
           };
       }

       public fromJSON(data: user)
       {
           this.m_displayName = data.Name;
           this.m_emailAddress = data.EmailAddress;
           this.m_username = data.Username;
           this.m_password = data.Password
       }

       public serialize() : string | null
       {
           if (this.m_displayName != "" && this.m_emailAddress != "" && this.m_username != "")
           {
               return `${this.m_displayName}, ${this.m_emailAddress}, ${this.m_username}`;
           }
           console.error("One or more of the properties of the Contact object are missing or invalid!");
           return null;
       }

       deserialize(data: string)
       {
           let propertyArray = data.split(",");
           this.m_displayName = propertyArray[0];
           this.m_emailAddress = propertyArray[1];
           this.m_username = propertyArray[2];
       }
   }

}