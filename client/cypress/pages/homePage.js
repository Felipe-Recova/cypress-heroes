class HomePage{
    selectorsList(){
        const selectors = {
            logoutButton: "button[class*='text-gray-800']",
            newHeroButton: "button[class*='bg-blue-700']",
            loginButton: "button[class*='text-gray-800']",
            confirmDeleteHero: "p[class='text-sm text-gray-500']",
            heroFans: "[data-cy='fans']",
            heroSaves: "[data-cy='saves']",
            heroLikeButton: "[data-cy='like']",
            heroContractButton: "[data-cy='money']",
            hireHeroConfirm: "h3.text-lg",
            hireHeroConfirmButton: "button[class='undefined items-center py-2 px-4 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-red-300']"
        }
        return selectors
    }

    logout() {
        cy.get(this.selectorsList().newHeroButton).should("be.visible")
        cy.get(this.selectorsList().logoutButton).contains("Logout").click()
        cy.get(this.selectorsList().loginButton).contains("Login").should("be.visible")
    }

    deleteHero(heroName) {
        cy.get('[data-cy="hero-card"]').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('[data-cy="name"]').then(($name) => {
                    if ($name.text().trim() === heroName) {
                        cy.get('[data-cy="trash"]').click()
                    }
                })
            })
        })
        cy.contains('p', 'Are you sure you want to delete this hero?').should('be.visible')
        cy.contains('button', 'Yes').click()
    }

    editHero(fixedHeroName) {
    cy.get('[data-cy="hero-card"]').each(($el) => {
        cy.wrap($el).within(() => {
            cy.get('[data-cy="name"]').then(($name) => {
                if ($name.text().trim() === fixedHeroName) {
                    cy.get('[data-cy="pencil"]').click()
                }
            })
        })
    })
}

    editedHero(editedHeroName) {
    cy.get('[data-cy="hero-card"]').each(($el) => {
        cy.wrap($el).within(() => {
            cy.get('[data-cy="name"]').then(($name) => {
                if ($name.text().trim() === editedHeroName) {
                    cy.get('[data-cy="pencil"]').click()
                }
            })
        })
    })
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
        cy.get('[data-cy="hero-card"]').should('exist')
        cy.get('[data-cy="hero-card"]').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('[data-cy="name"]').should('not.contain', heroName)
        })
    })
}

likeHeroAndCheckFans(heroName) {
    cy.get('[data-cy="hero-card"]').each(($el) => {
        cy.wrap($el).within(() => {
            cy.get('[data-cy="name"]').then(($name) => {
                if ($name.text().trim() === heroName) {
                    cy.get(this.selectorsList().heroFans).invoke('text').then((fansBeforeText) => {
                        const fansBefore = parseInt(fansBeforeText.trim())
                        cy.get(this.selectorsList().heroLikeButton).click()
                        cy.get(this.selectorsList().heroFans).invoke('text').should((fansAfterText) => {
                            const fansAfter = parseInt(fansAfterText.trim())
                            expect(fansAfter).to.eq(fansBefore + 1)
                        })
                    })
                }
            })
        })
    })
}

hireHeroAndCheckSaves(heroName) {
  let savesBeforeGlobal
  let selectedHeroName
  cy.get('[data-cy="hero-card"]').each(($el) => {
    cy.wrap($el).within(() => {
      cy.get('[data-cy="name"]').then(($name) => {
        const currentHeroName = $name.text().trim()
        if (currentHeroName === heroName) {
          selectedHeroName = currentHeroName
          cy.get(this.selectorsList().heroSaves).invoke('text').then((savesBeforeText) => {
            savesBeforeGlobal = parseInt(savesBeforeText.trim())
            cy.get(this.selectorsList().heroContractButton).click()
          })
        }
      })
    })
  })
  cy.get(this.selectorsList().hireHeroConfirmButton).contains("Yes").click({ force: true })
  cy.get('[data-cy="hero-card"]').each(($el) => {
    cy.wrap($el).within(() => {
      cy.get('[data-cy="name"]').then(($name) => {
        const currentHeroName = $name.text().trim()
        if (currentHeroName === selectedHeroName) {
          cy.get(this.selectorsList().heroSaves).invoke('text').should((savesAfterText) => {
            const savesAfter = parseInt(savesAfterText.trim())
            expect(savesAfter).to.eq(savesBeforeGlobal + 1)
          })
        }
      })
    })
  })
}
}

export default HomePage