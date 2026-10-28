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
    test.skip("Contact Us form should be submitted successfully", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "Get In Touch" }),
      ).toBeVisible();
      await page.getByPlaceholder("Name").fill(contactUsData.Name);
      await page
        .getByRole("textbox", { name: "Email", exact: true })
        .fill(contactUsData.Email);
      await page.getByPlaceholder("Subject").fill(contactUsData.Subject);
      await page
        .getByPlaceholder("Your Message Here")
        .fill(contactUsData.Message);
      const filePath = path.join(__dirname, "../../fixtures/testFile.txt");
      console.log("File Path:", filePath);

      await page.locator('input[name="upload_file"]').setInputFiles(filePath);

      await expect(page.locator('input[name="upload_file"]')).toHaveValue(
        /testFile\.txt/,
      );

      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("confirm");
        expect(dialog.message()).toContain("Press OK to proceed!");
        await dialog.accept();
      });

      // 6. Click the Submit button
      await page.locator('[data-qa="submit-button"]').click();

      // 7. Verify the success message is visible
      const successMessage = page.locator(".status.alert.alert-success");
      await expect(successMessage).toHaveText(
        "Success! Your details have been submitted successfully.",
      );
    });

    
    

})