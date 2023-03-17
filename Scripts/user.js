"use strict";
"user strict";
var core;
(function (core) {
    class user {
        m_displayName;
        m_emailAddress;
        m_username;
        m_password;
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }
        get Name() {
            return this.m_displayName;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        get Username() {
            return this.m_username;
        }
        get Password() {
            return this.m_password;
        }
        set EmailAddress(email) {
            this.EmailAddress = email;
        }
        set Name(displayname) {
            this.m_displayName = displayname;
        }
        set Username(username) {
            this.Username = username;
        }
        set Password(password) {
            this.Password = password;
        }
        toString() {
            return `DisplayName: ${this.m_displayName}\n Email Address: ${this.m_emailAddress}\n Username: ${this.m_username}`;
        }
        toJSON() {
            return {
                "DisplayName": this.m_displayName,
                "EmailAddress": this.m_emailAddress,
                "Username": this.m_username
            };
        }
        fromJSON(data) {
            this.m_displayName = data.Name;
            this.m_emailAddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }
        serialize() {
            if (this.m_displayName != "" && this.m_emailAddress != "" && this.m_username != "") {
                return `${this.m_displayName}, ${this.m_emailAddress}, ${this.m_username}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid!");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.m_displayName = propertyArray[0];
            this.m_emailAddress = propertyArray[1];
            this.m_username = propertyArray[2];
        }
    }
    core.user = user;
})(core || (core = {}));
//# sourceMappingURL=user.js.map