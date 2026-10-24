const { test, expect } = require('@playwright/test');
const contactUsData = require('../../fixtures/contactUs.json');
const path = require('path');

test.describe('ContactUs Form', () => {
    test.beforeEach(async ({ page })=>{
        await page.goto('/');
        await expect(page).toHaveURL('/');
        await page.getByRole('link', { name: ' Contact us' }).click();
        await expect(page).toHaveURL('/contact_us');
    })
    test.skip('Contact Us form should be submitted successfully', async ({ page }) =>{
        await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
        await page.getByPlaceholder('Name').fill(contactUsData.Name);
        await page.getByRole('textbox', { name: 'Email', exact: true }).fill(contactUsData.Email);
        await page.getByPlaceholder('Subject').fill(contactUsData.Subject);
        await page.getByPlaceholder('Your Message Here').fill(contactUsData.Message);
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "fixtures",
          "testFile.txt",
        );
        const fileInput = page.locator('input[type="file"]')
        await fileInput.setInputFiles((filePath));
        // Verify that the file was selected
        await expect(fileInput).toHaveValue(/testFile\.txt/);

        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.getByText('Success! Your details have been submitted successfully.')).toBeVisible();
    })

    test('Verify Test Cases Page', async ({ page })=>{
        await page.goto('/');
        await expect(page).toHaveURL('/');
        await page.getByRole('link', { name: ' Test Cases' }).click();
        await expect(page).toHaveURL('/test_cases');
        await expect(page.getByRole('heading', { name: 'Test Cases' , exact: true })).toBeVisible();
    })

    test('Verify All Products and product detail page', async ({ page })=>{
        
    })

})