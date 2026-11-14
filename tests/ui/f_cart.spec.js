import { test, expect } from "@playwright/test";
const { CartPage } = require("../../pages/cartPage");
const subscriptionData = require("../../fixtures/subscription.json");

test.describe("Cart", () => {
  let cartPage;
  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await page.goto("/");
    await expect(page).toHaveURL("/");
  });
  test("Verify Subscription in Cart page", async ({ page }) => {
    await cartPage.cartLink.click();
    await expect(page).toHaveURL("/view_cart");
    await expect(cartPage.heading).toBeVisible();
    // await expect(CartPage.footer).toBeVisible();
    await cartPage.subscriptionEmailInput.fill(subscriptionData.email);
    await cartPage.subscriptionButton.click();
    await expect(cartPage.successMessage).toBeVisible();
    await expect(cartPage.successMessage).toHaveText(
      subscriptionData.successMessage,
    );
  });
  test("Add Products in Cart", async ({ page }) => {
    await cartPage.productLink.click();
    await expect(page).toHaveURL("/products");
    await expect(cartPage.productHeading).toBeVisible();
    const productName1 = await page.locator(".single-products").first().locator('//img/following-sibling::p').textContent();
    const price1 = await page.locator(".single-products").first().locator('//img/following-sibling::h2').textContent();
    console.log(productName1); // Blue Top
    console.log(price1); // $25
    await cartPage.firstProduct.hover();
    await cartPage.addToCartButton.click();
    await cartPage.continueShoppingButton.click();
    await expect(page).toHaveURL("/products");
    const productName2 = await page.locator(".single-products").nth(1).getByRole('paragraph').filter({ hasText: /^Men Tshirt$/ }).textContent();
    const price2 = await page.locator(".single-products").nth(1).locator('//img/following-sibling::h2').textContent();
    console.log(productName2); // Green Top
    console.log(price2); // $30
    await cartPage.secondProduct.hover();
    await page.locator(
    '//p[text()="Men Tshirt"]/following-sibling::a[contains(text(),"Add to cart")]'
).click();
    await cartPage.viewCartLink.click();
    await expect(page).toHaveURL("/view_cart");  
    await expect(page.getByText(productName1)).toBeVisible(); 
    await expect(page.getByText(productName2)).toBeVisible();
    // await expect(page.getByText(price1)).toBeVisible();
    // await expect(page.getByText(price2)).toBeVisible();
    const pricee1 = await page.locator('table tr').nth(1).locator('td').nth(2).textContent();
    const pricee2 = await page.locator('table tr').nth(2).locator('td').nth(2).textContent();
    expect(pricee1.trim()).toEqual(price1);
    expect(pricee2.trim()).toEqual(price2);
    const quantity1 = await page.locator('table tr').nth(1).locator('td').nth(3).textContent();
    const quantity2 = await page.locator('table tr').nth(2).locator('td').nth(3).textContent();
    console.log(quantity1); // 1
    console.log(quantity2); // 1
    expect(quantity1.trim()).toEqual("1");
    expect(quantity2.trim()).toEqual("1");
    const totalPrice1 = await page.locator('table tr').nth(1).locator('td').nth(4).textContent();
    const totalPrice2 = await page.locator('table tr').nth(2).locator('td').nth(4).textContent();
    console.log(totalPrice1); // $25
    console.log(totalPrice2); // $30
    expect(totalPrice1.trim()).toEqual(price1);
    expect(totalPrice2.trim()).toEqual(price2);
})
test("Verify Product quantity in Cart", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.getByRole("link", { name: "View Product" }).first().click();
  await expect(page).toHaveURL(/\/product_details\/\d+/);
  await cartPage.quantityInput.fill('');
  const quantity = 4;
  await cartPage.quantityInput.fill(quantity.toString());
  await cartPage.addToCartButton.click();
  await cartPage.viewCartLink.click();
  await expect(page).toHaveURL("/view_cart");
  const updatedQuantity = await page.locator('table tbody tr').first().locator('td').nth(3).textContent();
  expect(updatedQuantity.trim()).toEqual(quantity.toString());
})
});
