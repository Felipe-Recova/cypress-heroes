import userData from '../fixtures/Users/userData.json'
import LoginPage from '../pages/loginPage.js'
import HomePage from '../pages/homePage.js'
const loginPage= new LoginPage()
const homePage= new HomePage()

describe('Login', () => {
  it('Login success', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.userLogin.email, userData.userLogin.password)
  })

  it('Logout success', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.userLogin.email, userData.userLogin.password)
    homePage.logout()
  })

  it('Login fail', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithInvalidUser(userData.failLogin.email, userData.failLogin.password)
    loginPage.checkLoginInvalid()
  })
    it('Login alert to fill fields', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithoutFillLoginFields()
    loginPage.checkLoginFields()
  })
//     it('Signup', () => {
//     loginPage.accessLoginPage()
//     loginPage.signupUser(userData.signup.firstName, userData.signup.lastName, userData.signup.username, userData.signup.password, userData.signup.password)
//   })
//     it('Signup Field Validations', () => {
//     loginPage.accessLoginPage()
//     loginPage.signupFieldValidations()
//   })
})