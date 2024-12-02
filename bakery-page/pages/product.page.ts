import { expect, Locator, type Page } from '@playwright/test';
import BasePage from './base.page';
import { timeouts } from '../utils/variables.utils';

class ProductPage extends BasePage {
  addedQuantity: Locator;
  increaseAmountButton: Locator;
  addToBagbutton: Locator;
  shoppingBagQuantityInput: Locator;
  shoppingCartQuantityInput: Locator;
  checkoutButton: Locator;
  confirmationPopup: Locator;
  confirmationNotification: Locator;

  constructor(page: Page) {
    super(page);
    this.addedQuantity = page.getByTestId('productpage-text-qty');
    this.increaseAmountButton = page.getByTestId('productpage-btn-increaseq');
    this.addToBagbutton = page.getByTestId('productsection-btn-addtobag');
    this.shoppingBagQuantityInput = page.getByTestId('productpage-text-qty');
    this.shoppingCartQuantityInput = page.getByTestId('shoppingcart-text-qty');
    this.checkoutButton = page.getByTestId('shoppingcart-btn-checkout');
    this.confirmationNotification = page.getByText(
      'Your order has been received.'
    );
  }

  async confirmTheRightProductLoaded(product: string) {
    const messageOnFail = `Expected product title"${product}" is not visible`;
    const title = this.page.getByRole('heading', {
      name: product,
    });

    await expect(title, messageOnFail).toBeVisible();
  }

  async addProductsToBag(amount = 1) {
    if (amount === 1) {
    } else if (amount > 1) {
      while (Number(await this.addedQuantity.inputValue()) < amount) {
        await this.increaseAmountButton.click();
      }
    } else {
      console.error('You have added incorrect numeric value');
    }
    await this.addToBagbutton.click();
  }

  async confirmRightQuantityAdded(amount: number) {
    const messageOnFail =
      'Value in shopping cart do not match an order quantity';
    const cartAmount = await this.shoppingCartQuantityInput.inputValue();
    expect(amount, messageOnFail).toBe(Number(cartAmount));
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async orderReceivedConfirmation() {
    const messageOnFail = 'Order confirmation message not visible';
    await expect(this.confirmationNotification, messageOnFail).toBeVisible(
      timeouts.longTimeout
    );
  }
}

export default ProductPage;
