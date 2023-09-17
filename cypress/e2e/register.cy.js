const Guid = require('guid');

describe('/user/register', () => {
    const registerEndpoint = 'http://localhost:3000/api/user/register';

    it('returns 400 when with no body', () => {
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(400);
        })
    });

    it('doesn\'t allow user creation with bad user body', () => {
        let badTestUser = {
            name: '1',
            email: 'teom',
            password: '2'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badTestUser
        }).then((res) => {
            expect(res.status).to.eq(400);
        })
    });

    it('cannnot duplicate user', () => {
        let badTestUser = {
            name: 'John',
            email: 'doNotDeleteUser@email.com',
            password: 'qaqaqaq3112'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badTestUser
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.eq('Email already registered');
        })
    });

    it('/register creates a user with valid body', () => {
        let dynamicEmail = Guid.raw() + '@bar.com';

        let body = {
            name: 'John',
            email: dynamicEmail,
            password: 'qaqaqaq3112'
        }
        cy.request('POST', registerEndpoint, body)
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.name).to.eq('John');
                expect(res.body.email).to.eq(dynamicEmail);
                expect(res.body.password).to.not.eq('qaqaqaq3112');
            })
    });
})
