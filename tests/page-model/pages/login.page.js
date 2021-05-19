import { Selector, t } from 'testcafe';

class LoginPage {
    constructor() {
        this.usernameInput  = Selector('input#user-name');
        this.passwordInput  = Selector('input#password');
        this.loginButton    = Selector('input#login-button');
        this.loginForm      = Selector('div#login_button_container')
        this.genericErrorMessage = Selector('div.error-message-container.error');
    }

    async loginToApp(username, password) {
        await t
            .typeText(this.usernameInput, username, { paste: true })
            .typeText(this.passwordInput, password, { paste: true })
            .click(this.loginButton);
    }
}

export default LoginPage;
