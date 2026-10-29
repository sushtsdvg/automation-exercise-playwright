const { test, expect } = require('@playwright/test');
const { SubscriptionPage } = require('../../pages/susbscriptionPage');
test.describe("Subscription", () => {
    let subscriptionPage;
    test.beforeEach(async ({ page }) => {
        subscriptionPage = new SubscriptionPage(page);
    });
    test("Verify subscription in home page", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveURL("/");
        await expect(subscriptionPage.footer).toBeVisible();
        await subscriptionPage.subscriptionEmailInput.fill("test@example.com");
        await subscriptionPage.subscriptionButton.click();
        await expect(subscriptionPage.successMessage).toBeVisible();
        await expect(subscriptionPage.successMessage).toHaveText("You have been successfully subscribed!");
    })
})