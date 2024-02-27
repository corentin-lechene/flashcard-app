describe('Quiz Session', () => {
    beforeEach(() => {
        cy.viewport('iphone-8')
        cy.visit('/home');
        cy.contains('ion-button', 'Commencer').click();
    });

    it('loads questions correctly on quiz start', () => {
        cy.contains('ion-header', 'Questionnaire').should('be.visible');
        cy.wait(4000)
        cy.get('ion-textarea').should('be.visible')
        cy.contains('ion-button', 'Confirmer').should('be.visible');
    });

    it('should allow closing the quiz', () => {
        cy.get('ion-button').contains('Fermer').click();
    });
});

describe('Answering a question', () => {
    beforeEach(() => {
        cy.viewport('iphone-8')
        cy.visit('/home');
        cy.contains('ion-button', 'Commencer').click();
    });

    it('allows submitting an answer and shows success message and options', () => {
        cy.get('ion-textarea').first().type('answer');
        cy.contains('ion-button', 'Confirmer').click();

        cy.get('ion-toast').should('exist');
        cy.contains('ion-button', "C'est la bonne réponse").should('be.visible');
        cy.contains('ion-button', 'Continuer').should('be.visible');
    });
});

describe('Navigating questions', () => {
    beforeEach(() => {
        cy.viewport('iphone-8')
        cy.visit('/home');
        cy.contains('ion-button', 'Commencer').click();
    });

    it('goes to the next question after answering', () => {
        cy.get('ion-textarea').first().type('answer');
        cy.contains('ion-button', 'Confirmer').click();

        cy.get('ion-toast').should('exist');
        cy.contains('ion-button', "C'est la bonne réponse").should('be.visible');
        cy.contains('ion-button', 'Continuer').click();
        cy.wait(4000)
        cy.get('ion-textarea').should('be.visible')
        cy.contains('ion-button', 'Confirmer').should('be.visible');
    });
});

describe('Finishing the quiz', () => {
    beforeEach(() => {
        cy.viewport('iphone-8');
        cy.visit('/home');
        cy.contains('ion-button', 'Commencer').click();
    });

    it('finishes quiz after last question', () => {
        const answerQuestion = () => {
            cy.get('body').then(($body) => {
                if ($body.find('ion-button:contains("Continuer")').length > 0) {
                    cy.get('ion-textarea').first().type('answer');
                    cy.contains('ion-button', 'Confirmer').click();
                    cy.get('ion-toast').should('exist').then(($toast) => {
                        if ($toast.text().includes('Bonne réponse')) {
                            cy.contains('ion-button', 'Continuer').click();
                            cy.wait(4000);
                            answerQuestion();
                        } else if ($toast.text().includes('Mauvaise réponse')) {
                            cy.contains('ion-button', 'Continuer').click();
                            cy.wait(4000);
                            answerQuestion();
                        }
                    });
                }
            });
        };
        answerQuestion();
    });
});





