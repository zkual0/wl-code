import { Selector, t } from "testcafe";
import TopNavigationBar  from "../components/top-navigation-bar.page";

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
        this.titleBar               = Selector('.title').withExactText('PRODUCTS');
        this.productsSortDropdown   = Selector('select.product_sort_container');
        this.optionAtoZ             = Selector('option[value="az"]');
        this.optionZtoA             = Selector('option[value="za"]');
        this.optionLowToHigh        = Selector('option[value="lohi"]');
        this.optionHighToLow        = Selector('option[value="hilo"]'); 
        this.inventoryItems         = Selector('.inventory_item_name');
        // JFoxx README
        // xPaths like these ones below thrown an error when using xPathToCss 
        // so I decided to take a different approach instead. (note: both passed when using Chrome Console)
        //'//div[contains(text(),"Sauce Labs Onesie")]/../../../*/button'; 
        //'//div[text()="Sauce Labs Onesie"]/../../../*/button';
        this.availableProducts = new AvailableProducts();
        this.addToCartButton = (value) => { return Selector('div.inventory_item_description').withText(value).find('button'); };    
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

    async getListedProducts(){
        let names = [];
        let items = this.inventoryItems;
        let count = await items.count; 
        for (let i=0; i<count; i++){
            names.push(await items.nth(i).innerText);
        }
        return names;
    }

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