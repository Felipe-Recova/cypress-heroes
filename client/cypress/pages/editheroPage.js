class EditHeroPage{
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
            HeroNameTitle: "[data-cy='name']",
            deleteHeroButton: "button.bg-red-600",
            avatarFileInput: '[data-cy="avatarFile"]'
        }
        return selectors
    }

    validateHeroName(heroName) {
        cy.get(this.selectorsList().HeroNameTitle).contains(heroName)
    }

    EditHero(name, price, fans, saves, powers = []) {    
        cy.get(this.selectorsList().nameField).clear().type(name)
        cy.get(this.selectorsList().priceField).clear().type(price)
        cy.get(this.selectorsList().fansField).clear().type(fans)
        cy.get(this.selectorsList().savesField).clear().type(saves)
        if (powers.length > 0) {
            cy.get(this.selectorsList().powersSelect).select(powers)
        }
        cy.get(this.selectorsList().avatarFileInput).attachFile('images/shrek.png')
        cy.get(this.selectorsList().avatarFileInput).then(($input) => {
            const file = $input[0].files[0]
            expect(file).to.exist
            expect(file.name).to.eq('shrek.png')
        })
        cy.get(this.selectorsList().submitNewHeroButton).contains("Submit").click()
    }
}

export default EditHeroPage