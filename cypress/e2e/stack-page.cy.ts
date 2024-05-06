import { CyRoutes, CyConsts, CircleColors } from "./utils.cy";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const animation = (value: string, index: number, type: "add" | "delete") => {
  if (type === "add") {
    cy.get(CyConsts.circle).eq(index).should("have.css", "border-color", CircleColors.Changing).should("have.text", value);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CyConsts.circle).eq(index).should("have.css", "border-color", CircleColors.Default).should("have.text", value);
  } else {
    cy.get(CyConsts.circle).last().should("have.css", "border-color", CircleColors.Changing);
    cy.wait(SHORT_DELAY_IN_MS);
  }
}

const render = (value: string, index: number) => {
  cy.get(CyConsts.input).type(value);
  cy.contains("Добавить").click();
  animation(value, index, "add");
  cy.get(CyConsts.input).should("be.empty");
}

const array = ["1", "15", "halo"];
const modifiedArray = ["1", "15"];

describe('Страница Stack-page работает корректно', () => {
  beforeEach('Предварительная загрузка страницы Stack-page', () => {
    cy.visit(CyRoutes.stack);
  });

  it('Элементы array добавляются в стек корректно', () => {
    array.forEach((value, index) => {
      render(value, index);
    })
  })

  it('Элементы array удаляются из стека корректно', () => {
    array.forEach((value, index) => {
      render(value, index);
    })

    cy.get(CyConsts.circle).should("have.length", array.length);
    cy.contains("Удалить").click();
    animation(array[array.length - 1], array.length - 1, "delete");
    cy.get(CyConsts.circle).should("have.length", array.length - 1);
    cy.get(CyConsts.circle).eq(array.length - 2).should("have.text", modifiedArray[array.length - 2]);
  })

  it('Array корректно очищается', () => {
    array.forEach((value, index) => {
      render(value, index);
    })
    cy.get(CyConsts.circle).should("have.length", array.length);
    cy.contains("Очистить").click();
    cy.get(CyConsts.circle).should("have.length", 0);
  })

  it("кнопки не активны при пустом поле ввода", () => {
    cy.get("input").should("be.empty");
    cy.get(CyConsts.button).should("be.disabled");
  });
})