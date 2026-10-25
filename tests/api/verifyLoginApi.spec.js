import { test, expect} from '@playwright/test';
const registerUserData = require('../../fixtures/registerUser.json');
test.describe('Verify Login API', ()=>{
    test('POST To Verify Login with valid details', async function({request}){
        const response = await request.post('/api/verifyLogin', {
            form: {
                email: process.env.APP_EMAIL,
                password: process.env.APP_PASSWORD
            }
        })
        // expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toEqual('User exists!' )
    })

    test('POST To Verify Login without email parameter', async function({request}){
        const response = await request.post('/api/verifyLogin', {
            form: {
                password: process.env.APP_PASSWORD
            }
        })
        // expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toEqual('Bad request, email or password parameter is missing in POST request.' )
    })

    test('DELETE To Verify Login', async function({request}){
        const response = await request.delete('/api/verifyLogin', {
            form: {
                email: process.env.APP_EMAIL,
                password: process.env.APP_PASSWORD
            }
        })
        // expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toEqual('This request method is not supported.' )
    })

    test('POST To Verify Login with invalid details', async function({request}){
        const response = await request.post('/api/verifyLogin', {
            form: {
                email: registerUserData.invalidEmail,
                password: registerUserData.invalidPassword
            }
        })
        // expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toEqual('User not found!' )
    })
})