import LoginPage from '../page-model/pages/login.page';
import { standardUser } from "../roles/roles";
import InventoryPage from '../page-model/pages/inventory.page';

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

// prettier-ignore
fixture`Login tests`
    .page`https://www.saucedemo.com/`;

test('User fails to login when using invalid credentials', async t => {
    loginPage
        .loginToApp('invalid-user', 'invalid-password');
    await t
        .expect(loginPage.genericErrorMessage.innerText)
        .contains('Epic sadface: Username and password do not match any user in this service');
})

test('User can login into application', async t => {
    await t
        .useRole(standardUser)
        .expect(loginPage.loginForm.exists).notOk()
        .expect(inventoryPage.titleBar.exists).ok();        //.expect(inventoryPage.burgerMenu.exists).ok();
})

test('User can logout successfully ', async t => {
    await t
        .useRole(standardUser)
        .expect(inventoryPage.titleBar.exists).ok();        //.expect(inventoryPage.burgerMenu.exists).ok();
    await inventoryPage
        .logout()
    await t.expect(loginPage.loginForm.exists).ok();
})


