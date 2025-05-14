class HomePage{
    selectorsList(){
        const selectors = {
            logoutButton: "button[class*='text-gray-800']",
            newHeroButton: "button[class*='bg-blue-700']",
            loginButton: "button[class*='text-gray-800']",
            confirmDeleteHero: "p[class='text-sm text-gray-500']"
        }
        return selectors
    }

    logout() {
        cy.get(this.selectorsList().newHeroButton).should("be.visible")
        cy.get(this.selectorsList().logoutButton).contains("Logout").click()
        cy.get(this.selectorsList().loginButton).contains("Login").should("be.visible")
    }

    deleteHero(heroName) {
      // encontra o card com o nome e clica no botão excluir
        cy.get('[data-cy="hero-card"]').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('[data-cy="name"]').then(($name) => {
                    if ($name.text().trim() === heroName) {
                        cy.get('[data-cy="trash"]').click();

                    }
                });
            });
        });
                                cy.contains('p', 'Are you sure you want to delete this hero?').should('be.visible')
                        cy.contains('button', 'Yes').click();
    }

    createNewHero(name, price, fans, saves, powers = []) {
        cy.get(this.selectorsList().newHeroButton).contains("Create New Hero").click()      
        cy.get(this.selectorsList().nameField).type(name)
        cy.get(this.selectorsList().priceField).type(price)
        cy.get(this.selectorsList().fansField).type(fans)
        cy.get(this.selectorsList().savesField).type(saves)
        if (powers.length > 0) {
            cy.get(this.selectorsList().powersSelect).select(powers)
        }
        cy.get(this.selectorsList().submitNewHeroButton).contains("Submit").click()
    }

    validateHeroWasDeleted(heroName) {
  // Aguarda os cards carregarem, se necessário
  cy.get('[data-cy="hero-card"]').should('exist');

  // Tenta encontrar algum card com o nome do herói
  cy.get('[data-cy="hero-card"]').each(($el) => {
    cy.wrap($el).within(() => {
      cy.get('[data-cy="name"]').should('not.contain', heroName);
    });
  });
}

}

export default HomePage