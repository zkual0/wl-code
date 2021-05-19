import { t } from "testcafe";
import ShoppingCartPage         from "./shopping-cart.page";
import CheckoutInformationPage  from "./checkout-information.page";
import CheckoutReviewPage       from "./checkout-review.page";
import TopNavigationBar         from "../components/top-navigation-bar.page";

class CheckoutPage{

    async checkout(expected_products=[], firstName='Jimmy', lastName='Foxx', postalCode='90210'){
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