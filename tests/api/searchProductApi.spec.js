import {test, expect} from '@playwright/test';

test.describe('Search Product API', ()=>{
    test("Search Product API", async function ({ request }) {
      const response = await request.post("/api/searchProduct", {
        form: {
            search_product: "top"
        }
      });
      const responseBody = await response.json();
      const products = responseBody.products;
      expect(response.status()).toBe(200);
      const productNames = products.map(product => product.name);
      console.log('Products:', products);
      console.log(productNames);
    });

    test("POST To Search Product without search_product parameter", async function ({ request }) {
      const response = await request.post("/api/searchProduct", {
        form: {
            // No search_product parameter provided
        }
      });
      const responseBody = await response.json();
      expect(response.status()).toBe(200);
      expect(responseBody.responseCode).toBe(400);
      expect(responseBody.message).toEqual('Bad request, search_product parameter is missing in POST request.');
    });
})