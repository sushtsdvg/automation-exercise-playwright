export class SearchProductPage {
    constructor(page) {
        this.page = page;
        this.productsLink = page.getByRole("link", { name: " Products" });
        this.searchInput = page.getByPlaceholder("Search Product")
        this.searchButton = page.locator('#submit_search')
        this.advertisementIframe = page.locator('iframe[name="aswift_3"]');
        this.advertisementCloseButton = this.advertisementIframe.contentFrame()
          .getByRole("button", { name: "Close ad" })
        this.searchedProductsHeading = page.getByRole("heading", { name: "Searched Products" }, { exact: true });
        this.products = page.locator(".single-products")
    }
}
module.exports = { SearchProductPage };