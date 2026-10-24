import {test, expect} from '@playwright/test';

test.describe('All Products API', ()=>{
    test('should return all products', async  function({request}){
        const response = await request.get('/api/productsList');
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const products = JSON.stringify(responseBody.products);
        expect(products).not.toBeNull();
        console.log('All Products:', products);
    })

    test('POST request to create a new product not supported', async function({request}){
        const response = await request.post('/api/productsList', {
            data: {
                name: 'New Product',
                price: 19.99,
                description: 'This is a new product.'
            }
        })
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toEqual('This request method is not supported.' )
    })
});