import { t } from "testcafe";
import ShoppingCartPage         from "./shopping-cart.page";
import CheckoutInformationPage  from "./checkout-information.page";
import CheckoutReviewPage       from "./checkout-review.page";
import TopNavigationBar         from "../components/top-navigation-bar.page";

class CheckoutPage{

    // it take cares of the tedious further steps of completing the checkout process by filling
    // mandatory forms and validating chosen products by the user were added into the cart only
    // params:
    //    - expected_products: array of strings representing the names of required products
    //    - firstName: user first name (optional)
    //    - lastName: user last name (optional)
    //    - postalCode: user postal code (optional)
    async checkout(expected_products=[], firstName='FantasticMrJ', lastName='Foxx', postalCode='90210'){
        const topNavigationBar        = new TopNavigationBar();
        const shoppingCartPage        = new ShoppingCartPage();
        const checkoutInformationPage = new CheckoutInformationPage();  
        const checkoutReviewPage      = new CheckoutReviewPage();

        await topNavigationBar.navigateToShoppingCart();
        await shoppingCartPage.clickCheckout();
        await checkoutInformationPage.fillCheckoutForm(firstName, lastName, postalCode);
        await checkoutInformationPage.clickContinue();
        const products = await checkoutReviewPage.getProductsList();
        await t.expect(products).eql(expected_products);
        await checkoutReviewPage.clickFinish();
    }
}

export default CheckoutPage;