import { type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardLink: Locator;
  readonly balanceDisplay: Locator;
  readonly welcomeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardLink = page.getByRole("link", { name: /dashboard/i });
    this.balanceDisplay = page.getByTestId("points-balance");
    this.welcomeText = page.getByText(/welcome back/i);
  }

  async goToDashboard(): Promise<void> {
    await this.dashboardLink.click();
  }

  async getBalance(): Promise<number> {
    const text = await this.balanceDisplay.innerText();
    return parseInt(text.replace(/\D/g, ""), 10);
  }
}
