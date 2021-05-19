import { Selector, t } from "testcafe";
import TopNavigationBar  from "../components/top-navigation-bar.page";

class CheckoutInformationPage extends TopNavigationBar {
    constructor(){
        super();
        this.titleBar        = Selector('.title').withExactText('CHECKOUT: YOUR INFORMATION');
        this.firstNameField  = Selector('#first-name');
        this.lastNameField   = Selector('#last-name');
        this.postalCodeField = Selector('#postal-code');
        this.continueButton  = Selector('#continue');
        this.cancelButton    = Selector('#cancel');
    }

    async fillCheckoutForm(firstname, lastname, postalCode){
        await t
            .typeText(this.firstNameField, firstname, {paste: true})
            .typeText(this.lastNameField, lastname, {paste: true})
            .typeText(this.postalCodeField, postalCode, {paste: true});
    }

    async clickContinue(){
        await t.click(this.continueButton);
    }

    async clickCancel(){
        await t.click(this.cancelButton);
    }

}

export default CheckoutInformationPage;