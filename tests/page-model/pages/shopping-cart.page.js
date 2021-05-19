import { Selector, t } from "testcafe";
import TopNavigationBar  from "../components/top-navigation-bar.page";

class ShoppingCartPage extends TopNavigationBar {
    constructor(){
        super();
        this.titleBar               = Selector('.title').withExactText('YOUR CART');
        this.productsNames          = Selector('div.inventory_item_name');
        this.checkoutButton         = Selector('#checkout');
        this.continueShoppingButton = Selector('#continue-shopping');
    }

    async getProductsList(){
        let lst = [];
        let products = this.productsNames;
        let count = await products.count; 

        for (let i=0; i<count; i++){
            lst.push(await products.nth(i).innerText);
        }
        return lst;
    }

    async clickCheckout(){
        await t.click(this.checkoutButton);
    }

    async clickContinueShopping(){
        await t.click(this.continueShoppingButton);
    }

}

export default ShoppingCartPage;