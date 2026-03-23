import { expect, test } from "@playwright/test";
import { DashboardPage } from "../../pageObjects/DashboardPage";
import { LoginPage } from "../../pageObjects/LoginPage";
import { expectedLoyaltyBalance } from "../../support/calculations";
import { loadEnv } from "../../support/env";

test.describe("Dashboard", () => {
  test("User balance reflects recent transactions after login", async ({ page }) => {
    const env = loadEnv();
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const expectedTotal = expectedLoyaltyBalance(env);

    await loginPage.goto();
    await loginPage.login(env.USER_EMAIL, env.USER_PASS);

    await dashboardPage.goToDashboard();
    const actualBalance = await dashboardPage.getBalance();

    expect(actualBalance).toBe(expectedTotal);
  });
});
