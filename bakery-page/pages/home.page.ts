import { type Page } from '@playwright/test';
import BasePage from './base.page';

class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}

export default HomePage;
