import { CyRoutes, CyConsts, CircleColors } from "./utils.cy";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const animation = (value: string, index: number, type: "add" | "delete") => {
  if (type === "add") {
    cy.get(CyConsts.circle).eq(index).should("have.css", "border-color", CircleColors.Changing).and("have.text", value);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CyConsts.circle).eq(index).should("have.css", "border-color", CircleColors.Default).should("have.text", value);
    cy.get(CyConsts.element).eq(index).should("contain", "tail");
  } else {
    cy.get(CyConsts.circle).eq(index).should("have.css", "border-color", CircleColors.Changing).and("have.text", value);
    cy.get(CyConsts.element).eq(index).should("contain", "head");
    cy.wait(SHORT_DELAY_IN_MS);
  }
}

const render = (value: string, index: number) => {
  cy.get(CyConsts.input).type(value);
  cy.contains("Добавить").click();
  animation(value, index, "add");
  cy.get(CyConsts.input).should("be.empty");
}

const array = ["1", "15", "halo"]

describe('Страница Queue-page работает корректно', () => {
  beforeEach('Предварительная загрузка страницы Queue-page', () => {
    cy.visit(CyRoutes.queue);
  });

  it('Элементы array добавляются в очередь корректно', () => {
    array.forEach((value, index) => {
      render(value, index);
    })
    cy.get(CyConsts.element).eq(0).should("contain", "head");
    cy.get(CyConsts.element).eq(array.length - 1).contains("tail").should("exist");
  })

  it('Элементы array удаляются из очереди корректно', () => {
    array.forEach((value, index) => {
      render(value, index);
    })
    
    array.forEach((value, index) => {
      cy.contains("Удалить").click();
      animation(value, index, "delete");
      cy.get(CyConsts.element).eq(index).should("not.contain.text");
      cy.get(CyConsts.element).eq(index).should("not.contain", "tail").should("not.contain", "head");

      if (index + 1 < array.length) {
        cy.get(CyConsts.element).eq(index + 1).should("contain", "head");
      }
      array.splice(index + 1).forEach((remainingValue, remainingIndex) => {
        cy.get(CyConsts.circle).eq(remainingIndex + index + 1).should("contain.text", remainingValue);
      });
    })
  })

  it('Array очищается корректно', () => {
    array.forEach((value, index) => {
      render(value, index);
    })

    cy.get(CyConsts.circle).should("have.length", 7);
    cy.contains("Очистить").click();
    cy.get(CyConsts.circle).each((circle) => {
      expect(circle.text().trim()).to.be.empty
    })
  })

  it("кнопки не активны при пустом поле ввода", () => {
    cy.get("input").should("be.empty");
    cy.get(CyConsts.button).should("be.disabled");
  });
})