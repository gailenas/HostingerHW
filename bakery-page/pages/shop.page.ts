import { Page } from '@playwright/test';
import BasePage from './base.page';

class ShopPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectProduct(product: string) {
    await this.page.getByRole('link', { name: product }).click();
  }
}
export default ShopPage;
