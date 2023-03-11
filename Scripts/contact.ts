"use strict";

namespace core
{
    export class Contact
    {
        private m_fullName: string;
        private m_contactNumber: string;
        private m_EmailAddress: string;

        constructor(fullName = "", contactNumber = "", emailAddress = "")
        {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_EmailAddress = emailAddress;

        }

        //start of getters
        public get FullName()
        {
            return this.m_fullName;
        }

        public get Email()
        {
            return this.m_EmailAddress;
        }

        public get ContactNumber()
        {
            return this.m_contactNumber;
        }
        //end of getters

        //start of setters
        public set FullName(fullName: string)
        {
            this.m_fullName = fullName;
        }

        public set Email(emailAddress: string)
        {
            this.m_EmailAddress = emailAddress;
        }

        public set ContactNumber(contactNumber : string)
        {
            this.m_contactNumber = contactNumber;
        }
        //end of setters

        //override
        toString()
        {
            return `Full Name: " ${this.m_fullName}\n Contact Number: ${this.m_contactNumber}\n Email Address: ${this.m_EmailAddress}`;
        }

        public serialize() : string | null
        {
            if (this.FullName != "" && this.ContactNumber != "" && this.Email != "")
            {
                return `${this.m_fullName}, ${this.m_contactNumber}, ${this.m_EmailAddress}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid!");
            return null;
        }

        public deserialize(data : string)
        {
            let propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_contactNumber = propertyArray[1];
            this.m_EmailAddress = propertyArray[2];
        }


    }

}
