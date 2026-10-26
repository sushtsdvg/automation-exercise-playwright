import { test, expect} from '@playwright/test';
import generateRandomEmail from '../../utils/generateRandomEmail.js';
test.describe.only('Create Account API', ()=>{
    let email;
     test.beforeAll(async () => {
        email = generateRandomEmail();
    });

    test('POST To Create/Register User Account', async function({request}){
        const response = await request.post('/api/createAccount', {
            form: {
                name: 'Test User',
                email: email,
                password: process.env.ACCOUNT_PASSWORD,       
                title: 'Mr',
                birth_date: '1990-01-01',
                birth_month: 'January',
                birth_year: '1990',
                firstname: 'Test',
                lastname: 'User',
                company: 'Test Company',
                address1: '123 Test St',
                address2: 'Apt 4',
                country: 'United States',
                zipcode: '12345',
                state: 'Test State',
                city: 'Test City',
                mobile_number: '1234567890'
            }
        })
        const responseBody = await response.json();
        console.log('Response Body:', responseBody);
        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toEqual('User created!' )
    })

    test('PUT METHOD To Update User Account', async function({request}){
        const response = await request.put('/api/updateAccount', {
            form: {
                name: 'Updated Test User',
                email: email,
                password: process.env.ACCOUNT_PASSWORD,
                title: 'Mr',
                birth_date: '1990-01-01',
                birth_month: 'January',
                birth_year: '1990',
                firstname: 'Updated Test',
                lastname: 'User',
                company: 'Updated Test Company',
                address1: '456 Updated St',
                address2: 'Apt 5',
                country: 'United States',
                zipcode: '12345',
                state: 'Updated Test State',
                city: 'Updated Test City',
                mobile_number: '0987654321'
            }
        })
        const responseBody = await response.json();
        console.log('Response Body:', responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toEqual('User updated!' )
    })

    test('GET user account detail by email', async function({request}){
        const response = await request.get(`/api/getUserDetailByEmail?email=${email}`);
        const responseBody = await response.json();
        console.log('Response Body:', responseBody);
        expect(responseBody.responseCode).toBe(200);       
    })
        

    test('DELETE METHOD To Delete User Account', async function({request}){
        const response = await request.delete('/api/deleteAccount', {
            form: {
                email: email,
                password: process.env.ACCOUNT_PASSWORD
            }
        })
        const responseBody = await response.json();
        console.log('Response Body:', responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toEqual('Account deleted!' )
    })
})