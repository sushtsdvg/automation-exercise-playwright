export class CartPage {
    constructor(page) {
        this.page = page;
        this.footer = page.locator('#footer')
        this.subscriptionHeading = page.getByRole("heading", { name: "Subscription" }, { exact: true });
        this.subscriptionEmailInput = page.getByRole('textbox', { name: 'Your email address' });
        this.subscriptionButton = page.locator('#subscribe');
        this.successMessage = page.locator('#success-subscribe')
        this.cartLink = page.getByRole("link", { name: " Cart" })
        this.heading = page.getByText("Shopping Cart")
        this.productLink = page.getByRole("link", { name: " Products" })
        this.productHeading = page.getByText("All Products")
        this.firstProduct = page.locator(".single-products").first();
        this.addToCartButton = page.getByText("Add to cart").first();
        this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
        this.secondProduct = page.locator(".single-products").nth(1);
        this.viewCartLink = page.getByRole("link", { name: " View Cart" });
        this.quantityInput = page.getByRole('spinbutton').first();
    }
}
module.exports = { CartPage };