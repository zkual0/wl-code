import { Selector, t } from "testcafe";
import TopNavigationBar  from "../components/top-navigation-bar.page";

class CheckoutCompletePage extends TopNavigationBar {
    constructor(){
        super();
        this.titleBar       = Selector('.title').withExactText('CHECKOUT: COMPLETE!');
        this.backHomeButton = Selector('#back-to-products');
        this.completeHeader = Selector('.complete-header');
        this.completeText   = Selector('.complete-text');
    }

    async clickBackHome(){
        await t.click(this.backHomeButton);
    }
}

export default CheckoutCompletePage;