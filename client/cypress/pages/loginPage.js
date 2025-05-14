class LoginPage{
    selectorsList(){
        const selectors = {
            logoutButton: "button[class*='text-gray-800']",
            newHeroButton: "button[class*='bg-blue-700']",
            loginButton: "button[class*='text-gray-800']",
            emailField: "[data-cy='email']",
            passwordField: "[data-cy='password']",
            signinButton: "button[class*='bg-blue-700']",
            alertLogin: "div[class='text-red-500']"
        }
        return selectors
    }

    accessLoginPage(){
            cy.clearCookies();
            cy.clearLocalStorage();
            indexedDB.databases().then((dbs) => {
                dbs.forEach((db) => indexedDB.deleteDatabase(db.name))
            })
            cy.visit('http://localhost:3000/heroes/')
    }

    loginWithUser(email, password) {
        cy.get(this.selectorsList().loginButton).contains("Login").click()
        cy.get(this.selectorsList().emailField).type(email)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().signinButton).click()
        cy.get(this.selectorsList().newHeroButton).contains("Create New Hero").should("be.visible")
    }
    loginWithInvalidUser(email, password) {
        cy.get(this.selectorsList().loginButton).contains("Login").click()
        cy.get(this.selectorsList().emailField).type(email)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().signinButton).click()
    }
    loginWithoutFillLoginFields() {
        cy.get(this.selectorsList().loginButton).contains("Login").click()
        cy.get(this.selectorsList().emailField).click()
        cy.get(this.selectorsList().passwordField).click()
        cy.get(this.selectorsList().signinButton).click()
    }
    logout() {
        cy.get(this.selectorsList().newHeroButton).should("be.visible")
        cy.get(this.selectorsList().logoutButton).contains("Logout").click()
        cy.get(this.selectorsList().loginButton).contains("Login").should("be.visible")
    }
    checkLoginInvalid() {
        cy.get(this.selectorsList().alertLogin).should("be.visible", "Invalid email or password")
    }
    checkLoginFields() {
        cy.get(this.selectorsList().alertLogin).should("be.visible", "Email is required")
        cy.get(this.selectorsList().alertLogin).should("be.visible", "Password is required")
    }    
    signupUser(firstname, lastname, username, password) {
        cy.get(this.selectorsList().signUp).click()
        cy.get(this.selectorsList().signupFirstName).type(firstname)
        cy.get(this.selectorsList().signupLastName).type(lastname)
        cy.get(this.selectorsList().signupUsername).type(username)
        cy.get(this.selectorsList().signupPassword).type(password)
        cy.get(this.selectorsList().signupConfirmPassword).type(password)
        cy.get(this.selectorsList().signupButton).click()
        cy.get(this.selectorsList().signInLabel).should("contain", "Sign in").should("be.visible")
    }
    signupFieldValidations() {
        cy.get(this.selectorsList().signUp).click()
        cy.get(this.selectorsList().signupFirstName).click()
        cy.get(this.selectorsList().signupLastName).click()
        cy.get(this.selectorsList().signupUsername).click()
        cy.get(this.selectorsList().signupPassword).click()
        cy.get(this.selectorsList().signupConfirmPassword).click()
        cy.get(this.selectorsList().signupFirstName).click()
        cy.get(this.selectorsList().firstNameHelper).should("contain", "First Name is required").should("be.visible")
        cy.get(this.selectorsList().lastNameHelper).should("contain", "Last Name is required").should("be.visible")
        cy.get(this.selectorsList().passwordHelper).should("contain", "Enter your password").should("be.visible")
        cy.get(this.selectorsList().confirmPasswordHelper).should("contain", "Confirm your password").should("be.visible")
        cy.get(this.selectorsList().signupPassword).type("12")
        cy.get(this.selectorsList().passwordHelper).should("contain", "Password must contain at least 4 characters").should("be.visible")
        cy.get(this.selectorsList().signupPassword).type("1234")
        cy.get(this.selectorsList().signupConfirmPassword).type("12")
        cy.get(this.selectorsList().confirmPasswordHelper).should("contain", "Password does not match").should("be.visible")
    }
}

export default LoginPage