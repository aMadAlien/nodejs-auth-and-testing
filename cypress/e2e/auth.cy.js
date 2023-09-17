it('returns Register when we hit /register', () => {
    cy.request('POST', 'http://localhost:3000/api/user/register')
        .then((res) => {
            expect(res.body).to.contain('Register');
        })
})