
(function (core)
{
   class user
   {
       constructor(displayName = "", emailAddress = "", username = "", password = "")
       {
           this.displayName = displayName;
           this.emailAddress = emailAddress;
           this.username = username;
           this.password = password;

           console.log(this.displayName);
           console.log(this.emailAddress);
           console.log(this.username);
           console.log(this.password);
       }

       //start of getters
       get Name()
       {
           return this.displayName;
       }

       get Emailaddress()
       {
           return this.emailAddress;
       }

       get Username()
       {
           return this.username;
       }

       get Password()
       {
           return this.password;
       }
       //end of getters

       //start of setters
       set EmailAddress(EMAIL)
       {
           this.emailAddress = EMAIL;
       }
       set Name(displayName)
       {
           this.displayName = displayName;
       }
       set Username(Username)
       {
           this.username = Username;
       }
       set Password(Password)
       {
           this.password = Password;
       }
       //end of setters

       toString()
       {
           return `DisplayName: ${this.displayName}\n Email Address: ${this.emailAddress}\n Username: ${this.username}`;
       }



       toJSON()
       {
           return {
               "DisplayName": this.displayName,
               "EmailaAddress": this.emailAddress,
               "Username": this.username,
               "Password": this.password
           }
       }

       fromJSON(data)
       {
           this.displayName = data.displayName;
           this.emailAddress = data.emailAddress;
           this.username = data.username;
           this.password = data.password;
       }

       serialize()
       {
           if (this.displayName != "" && this.emailAddress != "" && this.username != "")
           {
               return `${this.displayName}, ${this.emailAddress}, ${this.username}`;
           }
           console.error("One or more of the properties of the Contact object are missing or invalid!");
           return null;
       }

       deserialize(data)
       {
           let propertyArray = data.split(",");
           this.displayName = propertyArray[0];
           this.emailAddress = propertyArray[1];
           this.username = propertyArray[2];
       }
   }
   core.user = user;

})(core || (core= {}));