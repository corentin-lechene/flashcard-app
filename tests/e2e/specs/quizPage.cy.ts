describe('Quiz Session', () => {
    beforeEach(() => {
        cy.viewport('iphone-8')
        cy.visit('/home');
        cy.get('[data-cy=start-button]').click();
    });

    it('loads questions correctly on quiz start', () => {
        cy.get('[data-cy=quiz-header]').should('be.visible');
        cy.wait(4000)
        cy.get('[data-cy=answer-input]').should('be.visible')
        cy.get('[data-cy=confirm-button]').should('be.visible');
    });

    it('should allow closing the quiz', () => {
        cy.get('[data-cy=close-button]').click();
    });
});

describe('Answering a question', () => {
    beforeEach(() => {
        cy.viewport('iphone-8')
        cy.visit('/home');
        cy.get('[data-cy=start-button]').click();
    });

    it('allows submitting an answer and shows success message and options', () => {
        cy.get('[data-cy=answer-input]').first().type('answer');
        cy.get('[data-cy=confirm-button]').click();

        cy.get('ion-toast').should('exist');
        cy.get('[data-cy=correct-answer-button]').should('be.visible');
        cy.get('[data-cy=continue-button]').should('be.visible');
    });
});

describe('Navigating questions', () => {
    beforeEach(() => {
        cy.viewport('iphone-8');
        cy.visit('/home');
        cy.get('[data-cy=start-button]').click();
    });

    it('goes to the next question after answering or finishes if no more questions', () => {
        const answerQuestion = () => {
            cy.get('body').then(($body) => {
                if ($body.find('[data-cy=answer-input]').length > 0) {
                    cy.get('[data-cy=answer-input]').first().type('answer');
                    cy.get('[data-cy=confirm-button]').click();
                    cy.get('ion-toast').should('exist').then(($toast) => {
                        if ($toast.text().includes('Bonne réponse') && $body.find('[data-cy=continue-button]').length > 0) {
                            cy.get('[data-cy=continue-button]').click();
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


describe('Finishing the quiz', () => {
    beforeEach(() => {
        cy.viewport('iphone-8');
        cy.visit('/home');
        cy.get('[data-cy=start-button]').click();
    });

    it('finishes quiz after last question', () => {
        const answerQuestion = () => {
            cy.get('body').then(($body) => {
                if ($body.find('[data-cy=continue-button]').length > 0) {
                    cy.get('[data-cy=answer-input]').first().type('answer');
                    cy.get('[data-cy=confirm-button]').click();
                    cy.get('ion-toast').should('exist').then(($toast) => {
                        if ($toast.text().includes('Bonne réponse')) {
                            cy.get('[data-cy=continue-button]').click();
                            cy.wait(4000);
                            answerQuestion();
                        } else if ($toast.text().includes('Mauvaise réponse')) {
                            cy.get('[data-cy=continue-button]').click();
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
