import {standardUser}           from "../roles/roles";
import InventoryPage            from '../page-model/pages/inventory.page';
import ShoppingCartPage         from "../page-model/pages/shopping-cart.page";
import CheckoutPage             from "../page-model/pages/checkout.page";
import CheckoutCompletePage     from "../page-model/pages/checkout-complete.page";

const inventoryPage         = new InventoryPage();
const shoppingCartPage      = new ShoppingCartPage();
const checkoutPage          = new CheckoutPage();
const checkoutCompletePage  = new CheckoutCompletePage();

// prettier-ignore
fixture`Inventory tests`
    .page`https://www.saucedemo.com/`;

test('it sorts products by Price (Low to High)', async t => {
    let available_products  = [];
    const expected_sorted_products = [
        'Sauce Labs Onesie',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Test.allTheThings() T-Shirt (Red)',
        'Sauce Labs Backpack',
        'Sauce Labs Fleece Jacket'];

    await t
        .useRole(standardUser)
        .expect(inventoryPage.titleBar.exists).ok();
    await inventoryPage.sortProductsByPriceLowToHigh()
    available_products = await inventoryPage.getListedProducts();
    await t.expect(available_products).eql(expected_sorted_products);
})

test('shopping cart reflects specific products added by the user', async t => {
    const expected_products = [
        'Sauce Labs Onesie',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt'];

    await t
        .useRole(standardUser)
        .expect(inventoryPage.burgerMenu.exists).ok();

    await inventoryPage.addProducts(expected_products)                  // looks like testcafe doesn't support chaining methods yet                                
    let itemsCount = await inventoryPage.getShoppingCartItemsCount();   // reference: https://testcafe-discuss.devexpress.com/t/how-to-chain-pagemodel-methods/313
    await t.expect(itemsCount).eql(expected_products.length);           //            https://github.com/DevExpress/testcafe/issues/1535

    await inventoryPage.navigateToShoppingCart();
    await t.expect(shoppingCartPage.titleBar.exists).ok();
    
    let cartProducts = await shoppingCartPage.getProductsList();
    await t.expect(cartProducts).eql(expected_products);
})

test('purchase workflow finishes successfully', async t => {
    const expected_products = [
        'Sauce Labs Onesie',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt'];

    await t
        .useRole(standardUser)
        .expect(inventoryPage.burgerMenu.exists).ok();

    await inventoryPage.addProducts(expected_products);
    await checkoutPage.checkout(expected_products);
    await t.expect(checkoutCompletePage.titleBar.exists).ok();
    await t.expect(checkoutCompletePage.completeHeader.innerText).eql('THANK YOU FOR YOUR ORDER');
})
