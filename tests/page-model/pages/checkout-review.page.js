import { Selector, t } from "testcafe";
import TopNavigationBar  from "../components/top-navigation-bar.page";

class CheckoutReviewPage extends TopNavigationBar {
    constructor(){
        super();
        this.titleBar        = Selector('.title').withExactText('CHECKOUT: OVERVIEW');
        this.productsNames   = Selector('div.inventory_item_name');
        this.finishButton    = Selector('#finish');
        this.cancelButton    = Selector('#cancel');
    }

    // returns: an array of strings representing all the 
    //          actually listed products chosen by the user
    async getProductsList(){
        let lst = [];
        let products = this.productsNames;
        let count = await products.count; 

        for (let i=0; i<count; i++){
            lst.push(await products.nth(i).innerText);
        }
        return lst;
    }

    async clickFinish(){
        await t.click(this.finishButton);
    }

    async clickCancel(){
        await t.click(this.cancelButton);
    }

}

export default CheckoutReviewPage;