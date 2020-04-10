// https://docs.cypress.io/api/introduction/api.html

describe('Start from home page', () => {
  it('Try to login', () => {
    cy.visit('/login');
    cy.get('iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body');

      cy
        .wrap($body)
        .find('input#username')
        .type('enter_login');

      cy
        .wrap($body)
        .find('input#password')
        .type('enter_password');

      cy.wrap($body)
        .find('input[type=submit]')
        .click();
    });
  });

  it('Check heading "Мои проекты"', () => {
    cy.contains('h1', 'Мои проекты');
  });

  it('Start create project', () => {
    cy.wait(2000);
    cy.get('.col-sm-auto > .ivu-btn')
      .click();
  });

  it('Check heading "Создать проект"', () => {
    cy.contains('h2', 'Создать проект');
  });

  it('Close create project', () => {
    cy.wait(1000);
    cy.get('.close')
      .click();
  });
});
