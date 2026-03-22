describe('Login Page', () => {
  it('Debería mostrar login y permitir ingresar', () => {
    cy.visit('/login');               // Abre la página de login
    cy.get('input[name="user"]').type('admin');      // Escribe usuario
    cy.get('input[name="password"]').type('admin123'); // Escribe contraseña
    cy.get('button[type="submit"]').click();         // Click en ingresar

    // Verifica que se navega a /vehicles
    cy.url().should('include', '/vehicles');
  });

  it('Debería mostrar error con credenciales incorrectas', () => {
    cy.visit('/login');
    cy.get('input[name="user"]').type('wrong');
    cy.get('input[name="password"]').type('wrong');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Usuario o contraseña incorrectos');
    });
  });
});
