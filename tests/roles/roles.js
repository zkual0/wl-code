import {Role}      from 'testcafe';
import LoginPage from '../page-model/pages/login.page';

const dataset = require('../data/credetials.dataset.json');
const loginPage = new LoginPage();

const standardUser = Role(dataset.standard_account.url, async t => {
    await loginPage.loginToApp(
        dataset.standard_account.username, 
        dataset.standard_account.password);
},{preserveUrl: true });

export {standardUser};