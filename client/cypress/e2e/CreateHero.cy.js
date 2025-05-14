import userData from '../fixtures/Users/userData.json'
import LoginPage from '../pages/loginPage.js'
import NewHeroPage from '../pages/newHeroPage.js'
const loginPage= new LoginPage()
const newHeroPage= new NewHeroPage()

describe('NewHero', () => {
  it('Create a new hero', () => {
    const heroName = userData.newHero.name

    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.userLogin.email, userData.userLogin.password)
    newHeroPage.createNewHero(heroName, userData.newHero.price, userData.newHero.fans, userData.newHero.saves, userData.newHero.powers)
    cy.writeFile('cypress/fixtures/tempHero.json', { name: heroName })
  })
})