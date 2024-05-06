import { CyRoutes, CyConsts, CircleColors } from "./utils.cy";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Страница Фибоначчи работает корректно', () => {
  beforeEach('Предварительная загрузка страницы Фибоначчи', () => {
    cy.visit(CyRoutes.fibonacci);
  });

  it('Последовательность Фибоначчи генерируется корректно', () => {
    const input = "4"
    const array = [1, 1, 2, 3, 5]

    cy.get(CyConsts.input).type(input);
    cy.get(CyConsts.submit).click();
    cy.get(CyConsts.circle).should('have.length', array.length -1).each((circle, index) => {
      cy.wrap(circle).should('have.css', 'border-color', CircleColors.Default).and('have.text', array[index]);
      cy.wait(DELAY_IN_MS);
    })
  })

  it("кнопка не активна при пустом поле ввода", () => {
    cy.get(CyConsts.input).should("be.empty");
    cy.get(CyConsts.submit).should("be.disabled");
  });
})