const { test, expect } = require('@playwright/test');
const { SubscriptionPage } = require('../../pages/susbscriptionPage');
const subscriptionData = require('../../fixtures/subscription.json');
test.describe("Subscription", () => {
    let subscriptionPage;
    test.beforeEach(async ({ page }) => {
        subscriptionPage = new SubscriptionPage(page);
    });
    test("Verify subscription in home page", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveURL("/");
        await expect(subscriptionPage.footer).toBeVisible();
        await subscriptionPage.subscriptionEmailInput.fill(subscriptionData.email);
        await subscriptionPage.subscriptionButton.click();
        await expect(subscriptionPage.successMessage).toBeVisible();
        await expect(subscriptionPage.successMessage).toHaveText(subscriptionData.successMessage);
    })
})