import { Selector, t } from "testcafe";
import BasePage from "../pages/base-page.page";

class TopNavigationBar extends BasePage{
    constructor(){
        super();
        this.burgerMenuContainer    = Selector('div#menu_button_container');
        this.burgerMenu             = Selector('button#react-burger-menu-btn');
        this.burgerX                = Selector('button#react-burger-cross-btn');
        this.burgerAllItems         = Selector('nav a#inventory_sidebar_link');
        this.burgerAbout            = Selector('nav a#about_sidebar_link');
        this.burgerLogout           = Selector('nav a#logout_sidebar_link');
        this.burgerResetAppState    = Selector('nav a#reset_sidebar_link');
        this.shoppingCartButton     = Selector('a.shopping_cart_link');
        this.shoppingCartItemscount = Selector('#shopping_cart_container span.shopping_cart_badge');
    }

    async clickBurger(){
        await t.click(this.burgerMenu);
    }

    async clickX(){
        await t.click(this.burgerX);
    }

    async clickAllItems(){
        await t.click(this.burgerAllItems);
    }

    async clickAbout(){
        await t.click(this.burgerAbout);
    }

    async clickLogout(){
        await t.click(this.burgerLogout);
    }

    async clickResetAppStore(){
        await t.click(this.burgerResetAppState);
    }

    async navigateToShoppingCart(){
        await t.click(this.shoppingCartButton);
    }

    async logout(){
        await this.clickBurger();
        await this.clickLogout();
    }

    async getShoppingCartItemsCount(){
        if (this.shoppingCartItemscount.exists){
            return Number(await this.shoppingCartItemscount.innerText);
        }
        return 0;
    }
}

export default TopNavigationBar;