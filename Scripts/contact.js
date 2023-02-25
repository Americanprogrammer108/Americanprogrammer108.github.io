

(function (core)
{
    class Contact
    {
        constructor(fullName = "", contactNumber = "", emailAddress = "")
        {
            this.fullName = fullName;
            this.contactNumber = contactNumber;
            this.EmailAddress = emailAddress;

        }

        //start of getters
        get FullName()
        {
            return this.fullName;
        }

        get Email()
        {
            return this.EmailAddress;
        }

        get ContactNumber()
        {
            return this.contactNumber;
        }
        //end of getters

        //start of setters
        set FullName(fullName)
        {
            this.m_fullName = fullName;
        }

        set Email(emailAddress)
        {
            this.m_EmailAddress = emailAddress;
        }

        set ContactNumber(contactNumber)
        {
            this.m_contactNumber = contactNumber;
        }
        //end of setters

        //override
        toString()
        {
            return `Full Name: " ${this.fullName}\n Contact Number: ${this.contactNumber}\n Email Address: ${this.EmailAddress}`;
        }

        serialize()
        {
            if (this.fullName != "" && this.contactNumber != "" && this.EmailAddress != "")
            {
                return `${this.fullName}, ${this.contactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid!");
            return null;
        }

        deserialize(data)
        {
            let propertyArray = data.split(",");
            this.fullName = propertyArray[0];
            this.contactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }


    }
    core.Contact = Contact;
})(core || (core = {}));
