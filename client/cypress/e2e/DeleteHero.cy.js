import LoginPage from '../pages/loginPage.js'
import userData from '../fixtures/Users/userData.json'
import HomePage from '../pages/homePage.js'
const loginPage = new LoginPage()
const homePage= new HomePage()

describe('Delete Hero', () => {
  it('Delete hero by name', () => {
    cy.fixture('tempHero.json').then((heroData) => {
      const heroName = heroData.name;

      loginPage.accessLoginPage();
      loginPage.loginWithUser(userData.userLogin.email, userData.userLogin.password);
      homePage.deleteHero(heroName)
      homePage.validateHeroWasDeleted(heroName)
    })
})
})