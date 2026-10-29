export class SubscriptionPage {
    constructor(page) {
        this.page = page;
        this.footer = page.locator('#footer');
        this.subscriptionHeading = page.getByRole("heading", { name: "Subscription" }, { exact: true });
        this.subscriptionEmailInput = page.getByPlaceholder("Your email address");
        this.subscriptionButton = page.locator('#subscribe');
        this.successMessage = page.locator('#success-subscribe')
    }
}
module.exports = { SubscriptionPage };