import { expect, test } from "@playwright/test";
import { DashboardPage } from "../../pageObjects/DashboardPage";
import { LoginPage } from "../../pageObjects/LoginPage";
import { expectedLoyaltyBalance } from "../../support/calculations";
import { loadEnv } from "../../support/env";

test.describe("Loyalty Program Account - Interview Scenario @smoke", () => {
  test("Registered user sees updated points balance after last three transactions", async ({ page }) => {
    const env = loadEnv();
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const expectedBalance = expectedLoyaltyBalance(env); // 1234 + (3 * 5) = 1249

    // Step 1: Navigate to login page
    await loginPage.goto();

    // Step 2-4: Login with registered user credentials
    await loginPage.login(env.USER_EMAIL, env.USER_PASS);

    // Step 5: Validate login success
    await expect(page).toHaveURL(/dashboard/i);
    await expect(dashboardPage.welcomeText).toBeVisible();

    // Step 6: Navigate to account dashboard
    await dashboardPage.goToDashboard();

    // Step 7: Validate updated points balance
    const actualBalance = await dashboardPage.getBalance();
    expect(actualBalance).toBe(expectedBalance);
  });
});
