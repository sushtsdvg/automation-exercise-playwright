import { test, expect } from '@playwright/test';

test.describe('Brands List API', ()=>{
    test('Get All Brands List', async  function({request}){
        const response = await request.get('/api/brandsList');
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const brands = JSON.stringify(responseBody.brands);
        expect(brands).not.toBeNull();
        console.log('All Brands:', brands);
    })

    test('PUT To All Brands List', async function({request}){
        const response = await request.put('/api/brandsList', {
            data: {
                name: 'Updated Brand',
                description: 'This is an updated brand.'
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toEqual('This request method is not supported.' )
    });
});