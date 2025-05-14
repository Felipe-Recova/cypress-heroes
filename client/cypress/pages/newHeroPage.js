class NewHeroPage{
    selectorsList(){
        const selectors = {
            logoutButton: "button[class*='text-gray-800']",
            newHeroButton: "button[class*='bg-blue-700']",
            nameField: "[data-cy='nameInput']",
            priceField: "[data-cy='priceInput']",
            fansField: "[data-cy='fansInput']",
            savesField: "[data-cy='savesInput']",
            powersSelect: "[data-cy='powersSelect']", 
            submitNewHeroButton: "button[class*='bg-blue-700']",
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

    createNewHero(name, price, fans, saves, powers = []) {
        cy.get(this.selectorsList().newHeroButton).contains("Create New Hero").  click()      
        cy.get(this.selectorsList().nameField).type(name)
        cy.get(this.selectorsList().priceField).type(price)
        cy.get(this.selectorsList().fansField).type(fans)
        cy.get(this.selectorsList().savesField).type(saves)
        if (powers.length > 0) {
            cy.get(this.selectorsList().powersSelect).select(powers)
        }
        cy.get(this.selectorsList().submitNewHeroButton).contains("Submit").click()
    }

}

export default NewHeroPage