import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pageObjects/LoginPage";
import { loadEnv } from "../../support/env";

test.describe("Authentication @smoke", () => {
  test("User can log in with valid credentials", async ({ page }) => {
    const env = loadEnv();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(env.USER_EMAIL, env.USER_PASS);

    await expect(page).toHaveURL(/dashboard/i);
  });
});
