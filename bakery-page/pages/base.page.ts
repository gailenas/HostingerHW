import { expect, Locator, selectors, type Page } from '@playwright/test';
import Helpers from '../utils/helpers.utils';
import easyYopmail from 'easy-yopmail';

const helpers = new Helpers();

class BasePage {
  page: Page;
  headerNavigationShopTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerNavigationShopTab = page.getByRole('link', { name: 'Shop' });
  }

  async navigateToShopPage() {
    const messageOnFail = 'Expected URL do not matches actual URL';
    await this.headerNavigationShopTab.click();
    await expect(this.page, messageOnFail).toHaveURL(
      `${helpers.getBaseUrl()}/shop`
    );
  }

  async goToMuffinStore() {
    await this.page.goto(helpers.getBaseUrl());
  }

  /**
   * Method that checks if confirmation email in yopMail inbox was received with specific title
   * @param user - takes user object
   */
  async confirmEmailReceived(user: {
    email: string;
    name: string;
    surname: string;
    phone: string;
  }) {
    const successMessage = 'Your order has been confirmed';
    const messageOnFail = `Email with title "${successMessage}" havent been found`;
    await this.page.waitForTimeout(10000);
    await easyYopmail.getInbox(user.email).then(async (email) => {
      await easyYopmail
        .readMessage(user.email, email.inbox[0].id, 'TXT')
        .then(async (message) => {
          expect(message?.submit, messageOnFail).toBe(successMessage);
        });
    });
  }
}

export default BasePage;
