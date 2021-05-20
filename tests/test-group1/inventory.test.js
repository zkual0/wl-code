import {standardUser}           from "../roles/roles";
import InventoryPage            from '../page-model/pages/inventory.page';
import ShoppingCartPage         from "../page-model/pages/shopping-cart.page";
import CheckoutPage             from "../page-model/pages/checkout.page";
import CheckoutCompletePage     from "../page-model/pages/checkout-complete.page";

const dataset               = require('../data/inventory.dataset.json')
const inventoryPage         = new InventoryPage();
const shoppingCartPage      = new ShoppingCartPage();
const checkoutPage          = new CheckoutPage();
const checkoutCompletePage  = new CheckoutCompletePage();

// prettier-ignore
fixture`Inventory tests`
    .page`${dataset.inventory.landing_url}`;

test('it sorts products by Price (Low to High)', async t => {
    const data                     = dataset.inventory.test01;
    let available_products         = data.available_products;
    const expected_sorted_products = data.expected_sorted_products;

    await t
        .useRole(standardUser)
        .expect(inventoryPage.titleBar.exists).ok();

    await inventoryPage.sortProductsByPriceLowToHigh()
    available_products = await inventoryPage.getListedProducts();
    await t.expect(available_products).eql(expected_sorted_products);
})

test('shopping cart reflects specific products added by the user', async t => {
    const expected_products = dataset.inventory.test02.expected_products;

    await t
        .useRole(standardUser)
        .expect(inventoryPage.burgerMenu.exists).ok();

    await inventoryPage.addProducts(expected_products)
    const itemsCount = await inventoryPage.getShoppingCartItemsCount();
    await t.expect(itemsCount).eql(expected_products.length);

    await inventoryPage.navigateToShoppingCart();
    await t.expect(shoppingCartPage.titleBar.exists).ok();
    
    const cartProducts = await shoppingCartPage.getProductsList();
    await t.expect(cartProducts).eql(expected_products);
})

test('full purchase workflow works correctly', async t => {
    const data              = dataset.inventory.test03
    const expected_products = data.expected_products;

    await t
        .useRole(standardUser)
        .expect(inventoryPage.burgerMenu.exists).ok();

    await inventoryPage.addProducts(expected_products);
    await checkoutPage.checkout(expected_products);
    await t.expect(checkoutCompletePage.titleBar.exists).ok();
    await t.expect(checkoutCompletePage.completeHeader.innerText).eql(data.completeHeaderTitle);
})
