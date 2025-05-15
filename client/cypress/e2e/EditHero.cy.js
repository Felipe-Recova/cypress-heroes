import LoginPage from '../pages/loginPage.js'
import userData from '../fixtures/Users/userData.json'
import fixedHero from '../fixtures/fixedHero.json'
import HomePage from '../pages/homePage.js'
import EditHeroPage from '../pages/editheroPage.js'
const loginPage = new LoginPage()
const homePage= new HomePage()
const editHeroPage= new EditHeroPage()

describe('Edit Hero', () => {
  it('Edit a fixed Hero', () => {
    cy.fixture('fixedHero.json').then((heroData) => {
      const fixedHeroName = heroData.name;

      loginPage.accessLoginPage()
      loginPage.loginWithUser(userData.userLogin.email, userData.userLogin.password)
      homePage.editHero(fixedHeroName)
      editHeroPage.validateHeroName(fixedHero.name)
      editHeroPage.EditHero(userData.editHero.name,userData.editHero.price, userData.editHero.fans, userData.editHero.saves, userData.editHero.powers)
    })
})

  it('Rollback to a fixed Hero', () => {
    cy.fixture('fixedHero.json').then((heroData) => {
      const fixedHeroName = heroData.name

      loginPage.accessLoginPage();
      loginPage.loginWithUser(userData.userLogin.email, userData.userLogin.password)
      homePage.editedHero(userData.editHero.name)
      editHeroPage.validateHeroName(userData.editHero.name)
      editHeroPage.EditHero(fixedHeroName,userData.editHero.price, userData.editHero.fans, userData.editHero.saves, userData.editHero.powers)
    })
})

  it('Like hero', () => {
    cy.fixture('fixedHero.json').then((heroData) => {
      const fixedHeroName = heroData.name

      loginPage.accessLoginPage();
      loginPage.loginWithUser(userData.userLogin.email, userData.userLogin.password)
      homePage.likeHeroAndCheckFans(fixedHeroName)
    })
})

  it('Hire hero', () => {
    cy.fixture('fixedHero.json').then((heroData) => {
      const fixedHeroName = heroData.name

      loginPage.accessLoginPage();
      loginPage.loginWithUser(userData.userLogin.email, userData.userLogin.password)
      homePage.hireHeroAndCheckSaves(fixedHeroName)
    })
})

})