import {Role}      from 'testcafe';
import LoginPage from '../page-model/pages/login.page';

const loginPage = new LoginPage();

const standardUser = Role('https://www.saucedemo.com/', async t => {
    await loginPage.loginToApp('standard_user','secret_sauce');
},{ preserveUrl: true });

const invalidUser = Role('https://www.saucedemo.com/', async t => {
    await loginPage.loginToApp('standard_user','invalid-password');
},{ preserveUrl: true });

export {standardUser, invalidUser};