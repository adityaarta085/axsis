describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.visit('/checkout');
    // cy.injectAxe(); // requires cypress-axe
  });

  it('should complete guest checkout flow', () => {
    cy.get('.cursor-pointer').first().click();
    cy.contains('Lanjut ke Data Diri').click();
    cy.get('input[placeholder*="Budi"]').type('Jules Test');
    cy.get('input[placeholder*="08"]').type('08123456789');
    cy.contains('Lanjut ke Pembayaran').click();
    cy.contains('Simulasi Bayar Berhasil').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Pembayaran Berhasil!');
    });
  });

  it('has no detectable accessibility violations on load', () => {
    // cy.checkA11y(); // would run if cypress-axe was installed and initialized
  });
});
