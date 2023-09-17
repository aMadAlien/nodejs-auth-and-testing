describe('/user/login', () => {
    const registerEndpoint = 'http://localhost:3000/api/user/login';

    it('logs in with valid user', () => {
        let body = {
            email: 'doNotDeleteUser@email.com',
            password: 'qaqaqaq3112'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            body
        }).then((res) => {
            expect(res.status).to.eq(200);
        })
    });
})