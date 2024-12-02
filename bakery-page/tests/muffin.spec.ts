import { test, expect } from '@playwright/test';
import BasePage from '../pages/base.page';
import HomePage from '../pages/home.page';
import ShopPage from '../pages/shop.page';
import ProductPage from '../pages/product.page';
import CheckoutPage from '../pages/checkout.page';
import Helpers from '../utils/helpers.utils';

const helpers = new Helpers();
const user = {
  email: helpers.emailGenerator(),
  name: 'Nametonas',
  surname: 'Surnamencijus',
  phone: '+37068686868',
};
const product = 'Blueberry Burst Muffins';
const amount = 4;

test.describe('Shop flow tests', () => {
  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.goToMuffinStore();
  });

  test(`Confirm that user can purchase a ${product}`, async ({ page }) => {
    const basePage = new BasePage(page);
    const homePage = new HomePage(page);
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.navigateToShopPage();
    await shopPage.selectProduct(product);
    await productPage.confirmTheRightProductLoaded(product);
    await productPage.addProductsToBag(amount);
    await productPage.confirmRightQuantityAdded(amount);
    await productPage.clickCheckoutButton();
    await checkoutPage.setDestinationCountry('Lithuania');
    await checkoutPage.selectShippingProvider('omniva');
    await checkoutPage.selectDeliveryAdress('siltnamiu');
    await checkoutPage.confirmCheckout();
    await checkoutPage.enterUserData(user);
    await checkoutPage.clickContinueInCheckout();
    await checkoutPage.confirmOrderSummaryCorrect(product, amount, user);
    await checkoutPage.placeMuffinOrder();
    await productPage.orderReceivedConfirmation();
    await basePage.confirmEmailReceived(user);
  });
});
