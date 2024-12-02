import { expect, Locator, type Page } from '@playwright/test';
import BasePage from './base.page';
import Helpers from '../utils/helpers.utils';
import { timeouts } from '../utils/variables.utils';

const helpers = new Helpers();

class CheckoutPage extends BasePage {
  destinationDropdown: Locator;
  omnivaCheckbox: Locator;
  lpExpressCheckbox: Locator;
  dpdPickupCheckbox: Locator;
  addressInputField: Locator;
  checkoutContinueButton: Locator;
  userEmailInput: Locator;
  userFullNameInput: Locator;
  userPhoneNumberInput: Locator;
  userRequestsInput: Locator;
  continueCheckoutButton: Locator;
  placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.destinationDropdown = page.locator('#destination');
    this.omnivaCheckbox = page.getByTestId(
      'checkout-shippingdetails-option-omniva'
    );
    this.lpExpressCheckbox = page.getByTestId(
      'checkout-shippingdetails-option-lpexpress'
    );
    this.dpdPickupCheckbox = page.getByTestId(
      'checkout-shippingdetails-option-dpdpickup'
    );
    this.addressInputField = page.getByPlaceholder('Choose address');
    this.checkoutContinueButton = page.getByTestId(
      'checkout-shippingdetails-continue'
    );
    this.userEmailInput = page.locator('//input[@id="email"]');
    this.userFullNameInput = page.locator('//input[@id="name"]');
    this.userPhoneNumberInput = page.locator('//input[@id="phone"]');
    this.userRequestsInput = page.locator('//input[@id="customFieldValue"]');
    this.continueCheckoutButton = page.getByTestId(
      'checkout-contactinformation-continue'
    );
    this.placeOrderButton = page.getByTestId(
      'checkout-paymentmethods-placeorder'
    );
  }

  async setDestinationCountry(country = 'Lithuania') {
    const countryOption = this.page.getByRole('option', {
      name: helpers.capitalize(country),
    });

    while (!(await countryOption.isVisible())) {
      await this.destinationDropdown.clear();
      await this.destinationDropdown.fill(country);
    }

    await expect(countryOption).toBeVisible(timeouts.longTimeout);
    await countryOption.click();
  }

  async selectShippingProvider(provider: string = 'Omniva') {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    if (provider.toLowerCase() === 'omniva') {
      await expect(this.omnivaCheckbox).toBeVisible(timeouts.longTimeout);
      await this.omnivaCheckbox.click();
    } else if (provider.toLowerCase() === 'lp express') {
      await expect(this.lpExpressCheckbox).toBeVisible(timeouts.longTimeout);
      await this.lpExpressCheckbox.click();
    } else if (provider.toLowerCase() === 'dpd pickup') {
      await expect(this.dpdPickupCheckbox).toBeVisible(timeouts.longTimeout);
      await this.dpdPickupCheckbox.click();
    }
  }

  async selectDeliveryAdress(address: string) {
    await this.addressInputField.fill(address);
    const options = await this.page.getByRole('option').all();
    await options[0].click();
  }

  async confirmCheckout() {
    await this.checkoutContinueButton.click();
  }

  async enterUserData(user: {
    email: string;
    name: string;
    surname: string;
    phone: string;
  }) {
    await this.userEmailInput.fill(user.email);
    await this.userFullNameInput.fill(`${user.name} ${user.surname}`);
    await this.userPhoneNumberInput.fill(user.phone);
    await this.userRequestsInput.fill('N/A');
  }

  async clickContinueInCheckout() {
    await this.continueCheckoutButton.click();
  }

  confirmOrderSummaryCorrect(
    product: string,
    amount: number,
    user: { email: string; name: string; surname: string; phone: string }
  ) {
    const messageOnFail = `Product: "${product}" not visible in cart summary`;
    expect(this.page.getByText(product), messageOnFail).toBeVisible();
  }

  async placeMuffinOrder() {
    await this.placeOrderButton.click();
  }
}

export default CheckoutPage;
