"use strict";
var core;
(function (core) {
    class Contact {
        m_fullName;
        m_contactNumber;
        m_EmailAddress;
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_EmailAddress = emailAddress;
        }
        get FullName() {
            return this.m_fullName;
        }
        get Email() {
            return this.m_EmailAddress;
        }
        get ContactNumber() {
            return this.m_contactNumber;
        }
        set FullName(fullName) {
            this.m_fullName = fullName;
        }
        set Email(emailAddress) {
            this.m_EmailAddress = emailAddress;
        }
        set ContactNumber(contactNumber) {
            this.m_contactNumber = contactNumber;
        }
        toString() {
            return `Full Name: " ${this.m_fullName}\n Contact Number: ${this.m_contactNumber}\n Email Address: ${this.m_EmailAddress}`;
        }
        serialize() {
            if (this.FullName != "" && this.ContactNumber != "" && this.Email != "") {
                return `${this.m_fullName}, ${this.m_contactNumber}, ${this.m_EmailAddress}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid!");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_contactNumber = propertyArray[1];
            this.m_EmailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map