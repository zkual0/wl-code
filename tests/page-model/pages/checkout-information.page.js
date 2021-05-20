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

    // fills the checkout form
    // params:
    //      - firstname(string): user first name (optional)
    //      - lastname(string): user last name (optional)
    //      - postalCode(string): user postal code (optional)
    async fillCheckoutForm(firstName, lastName, postalCode){
        await t
            .typeText(this.firstNameField, firstName, {paste: true})
            .typeText(this.lastNameField, lastName, {paste: true})
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