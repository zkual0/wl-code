import { Selector, t }  from "testcafe";
import TopNavigationBar from "../components/top-navigation-bar.page";

class AvailableProducts{
    constructor(){
        this.backpack     = 'Sauce Labs Backpack';
        this.boltTShirt   = 'Sauce Labs Bolt T-Shirt';
        this.onesie       = 'Sauce Labs Onesie';
        this.bikeLight    = 'Sauce Labs Bike Light';
        this.fleeceJacket = 'Sauce Labs Fleece Jacket';
        this.redTShirt    = 'Test.allTheThings() T-Shirt (Red)';
    }
}

class InventoryPage extends TopNavigationBar {
    constructor(){
        super();
        this.availableProducts    = new AvailableProducts(); 
        this.titleBar             = Selector('.title').withExactText('PRODUCTS');
        this.productsSortDropdown = Selector('select.product_sort_container');
        this.optionAtoZ           = Selector('option[value="az"]');
        this.optionZtoA           = Selector('option[value="za"]');
        this.optionLowToHigh      = Selector('option[value="lohi"]');
        this.optionHighToLow      = Selector('option[value="hilo"]'); 
        this.inventoryItems       = Selector('.inventory_item_name');

        // gets a button Selector for a specific product by using a string
        // note: xpaths using text() or contains() where not supported by xPathToCss 
        //       so ".withText" method was used instead
        this.addToCartButton      = (value) => { return Selector('div.inventory_item_description').withText(value).find('button'); };    
    }

    async sortProductsByNameAtoZ(){
        await t.click(this.productsSortDropdown)
               .click(this.optionAtoZ);
    }

    async sortProductsByNameZtoA(){
        await t.click(this.productsSortDropdown)
               .click(this.optionZtoA);
    }

    async sortProductsByPriceLowToHigh(){
        await t.click(this.productsSortDropdown)
               .click(this.optionLowToHigh);
    }

    async sortProductsByPriceHighToLow(){
        await t.click(this.productsSortDropdown)
               .click(this.optionHighToLow);
    }

    // returns: an array of strings representing all the 
    //          actually listed products in the inventory
    async getListedProducts(){
        let names = [];
        let items = this.inventoryItems;
        let count = await items.count; 
        for (let i=0; i<count; i++){
            names.push(await items.nth(i).innerText);
        }
        return names;
    }

    // Adds one or more products into the shopping cart
    // - param products: can be a string or an array of 
    //                   strings of currently listed products
    // - returns: null
    async addProducts(products){

        if (!Array.isArray(products)){
            products = [products];
        }
        for (let i=0; i<products.length; i++){
            await t.click(await this.addToCartButton(products[i]));
            this.waitFor(100);
        }
    }
}

export default InventoryPage;