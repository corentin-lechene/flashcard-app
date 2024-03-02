describe('open cards page', () => {
  before(() => {
    cy.viewport('iphone-8')
    cy.visit('/cards')
  })

  it('must correctly initialize the page', () => {

    // title
    cy.contains("ion-title", "Cartes")

    // all categories
    cy.contains("ion-label", "Catégorie 1")
    cy.contains("ion-label", "Catégorie 2")
    cy.contains("ion-label", "Catégorie 3")
    cy.contains("ion-label", "Catégorie 4")
    cy.contains("ion-label", "Catégorie 5")
    cy.contains("ion-label", "Catégorie 6")
    cy.contains("ion-label", "Catégorie 7")
    cy.contains("ion-label", "Terminées")

    cy.get('#add-card-button').should("exist");
    cy.get('#fetch-card-by-tags-button').should("exist");

  })
})

describe('add card', () => {
  beforeEach(() => {
    cy.viewport('iphone-8')
    cy.visit('/cards')
    cy.get('#add-card-button').click();
  })

  it('must open modal if click on add button', () => {
    cy.contains("ion-title", "Nouvelle carte")

    cy.get('ion-card ion-textarea').should('exist');
    cy.get('ion-card ion-input').should("exist");
    cy.get('[data-cy="on-next-step-button"]').should("exist");

  });

  it('should add a card without error', () => {
    const question = "Que veut dire le terme DDD ?";
    const answer = "Domain Driven Design";
    const tag = "DDD";

    cy.get('ion-card ion-textarea').type(question);
    cy.get('ion-card ion-input').type(tag);
    cy.get('[data-cy="on-next-step-button"]').click();
    cy.get('ion-card ion-input').type(answer);
    cy.get('[data-cy="on-next-step-button"]').click();

    cy.contains("ion-label h1", question);
    cy.contains("ion-label p", answer);
  })

  it('should show a toast error cause tag is empty', () => {
    const question = "Que représente O dans les principes S.O.L.I.D ?";

    cy.get('ion-card ion-textarea').type(question);
    cy.get('[data-cy="on-next-step-button"]').click();
    cy.get('ion-toast').should('exist');
    //todo : verify error message
    cy.wait(4000)
    cy.get('ion-toast').should('not.exist');
  })

  it('should show a toast error cause message is empty', () => {
    const tag = "S.O.L.I.D";
    cy.get('ion-card ion-input').type(tag);
    cy.get('[data-cy="on-next-step-button"]').click();
    cy.get('ion-toast').should('exist');
    //todo : verify error message
    cy.wait(4000)
    cy.get('ion-toast').should('not.exist');
  })

  it('should show a toast error cause message and tag are empty', () => {
    cy.get('[data-cy="on-next-step-button"]').click();
    cy.get('ion-toast').should('exist');
    //todo : verify error message
    cy.wait(4000)
    cy.get('ion-toast').should('not.exist');
  })

  it('should show an error message cause answer is empty', () => {
    const question = "Que représente S dans les principes S.O.L.I.D ?";
    const tag = "S.O.L.I.D";

    cy.get('ion-card ion-textarea').type(question);
    cy.get('ion-card ion-input').type(tag);
    cy.get('[data-cy="on-next-step-button"]').click();
    cy.get('[data-cy="on-next-step-button"]').click();
    cy.get('ion-toast').should('exist');
    //todo : verify error message
    cy.wait(4000)
    cy.get('ion-toast').should('not.exist');

  })

})

describe('fetch cards by tags', () => {
  const singleResponsibilityQuestion = "Que représente S dans les principes S.O.L.I.D ?";
  const singleResponsibilityAnswer = "Single responsibility";

  const openCloseQuestion = "Que représente O dans les principes S.O.L.I.D ?";
  const openCloseAnswer = "Open/Close";

  const liskovQuestion = "Que représente L dans les principes S.O.L.I.D ?";
  const liskovAnswer = "Liskov";

  const tag = "S.O.L.I.D"

  before(() => {
    cy.viewport('iphone-8')
    cy.visit('/cards')

    add(singleResponsibilityQuestion, singleResponsibilityAnswer, tag);
    add(openCloseQuestion, openCloseAnswer, tag);
    add(liskovQuestion, liskovAnswer, tag);

  })

  const add = (question: string, answer: string, tag: string) => {
    cy.get('#add-card-button').click();

    cy.get('ion-card ion-textarea').type(question);
    cy.get('ion-card ion-input').type(tag);
    cy.get('[data-cy="on-next-step-button"]').click();
    cy.get('ion-card ion-input').type(answer);
    cy.get('[data-cy="on-next-step-button"]').click();
  }

  it('should display only cards with tags specified', () => {

    cy.get('#fetch-card-by-tags-button ion-fab ion-fab-button').click();
    cy.get('ion-checkbox').should('exist').should('have.length.gte', 1);
    cy.get('ion-checkbox').contains('S.O.L.I.D').click();
    cy.get("ion-label h1").should('have.length', 3);
    cy.get("ion-label p").should('have.length', 3);

    cy.contains("ion-label h1", singleResponsibilityQuestion);
    cy.contains("ion-label p", singleResponsibilityAnswer);

    cy.contains("ion-label h1", openCloseQuestion);
    cy.contains("ion-label p", openCloseAnswer);

    cy.contains("ion-label h1", liskovQuestion);
    cy.contains("ion-label p", liskovAnswer);
  })

});