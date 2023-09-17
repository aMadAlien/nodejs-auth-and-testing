
describe('/user/register', () => {
    const registerEndpoint = 'http://localhost:3000/api/user/register';

    it('returns 400 when with no body', () => {
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false
        })
            .then((res) => {
                expect(res.status).to.eq(400);
            })
    });

    it('/register creates a user with valid body', () => {
        let body = {
            name: 'John',
            email: 'test@gmail.com',
            password: 'qaqaqaq3112'
        }
        cy.request('POST', registerEndpoint, body)
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.name).to.eq('John');
                expect(res.body.email).to.eq('test@gmail.com');
                expect(res.body.password).to.eq('qaqaqaq3112');
            })
    });
})