import { CyRoutes, CyConsts, CircleColors } from "./utils.cy";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('String-page работает корректно', () => {
  beforeEach('Предварительная загрузка String-page', () => {
    cy.visit(CyRoutes.recursion);
  });

  it('Разворот строки работает корректно', () => {
    const string = "hello"
    const reversedString = "olleh"

    cy.get(CyConsts.input).type(string);

    cy.get(CyConsts.circle).should("have.length", string.length).and("have.css", "border-color", CircleColors.Default);
    cy.get(CyConsts.submit).click();

    let lastIndex = string.length - 1;
    for (let i = 0; i < string.length / 2; i++) {
      cy.get(CyConsts.circle).eq(i).should("have.css", "border-color", CircleColors.Changing);
      cy.get(CyConsts.circle).eq(lastIndex).should("have.css", "border-color", CircleColors.Changing);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CyConsts.circle).eq(i).should("have.css", "border-color", CircleColors.Modified).and("contain", reversedString[i]);
      cy.get(CyConsts.circle).eq(lastIndex).should("have.css", "border-color", CircleColors.Modified).and("contain", reversedString[lastIndex]);
      cy.wait(DELAY_IN_MS);
      lastIndex--;
  }})

  it("кнопка не активна при пустом поле ввода", () => {
    cy.get(CyConsts.input).should("be.empty");
    cy.get(CyConsts.submit).should("be.disabled");
  });
})