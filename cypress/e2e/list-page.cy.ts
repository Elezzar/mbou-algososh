import { CyRoutes, CyConsts, CircleColors } from "./utils.cy";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const animation = (
  value: string, 
  type: "addHeadElement" | 
    "deleteHeadElement" | 
    "addTailElement" | 
    "deleteTailElement" | 
    "addElementByIndex" | 
    "deleteIndexElement"
  ) => {
    if(type === "addHeadElement"){
      cy.get(CyConsts.circle).first().should("have.css", "border-color", CircleColors.Changing).should("have.text", value);
      cy.get(CyConsts.circle).first().should("have.css", "border-color", CircleColors.Modified).should("have.text", value);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CyConsts.circle).first().should("have.css", "border-color", CircleColors.Default).should("have.text", value);
      cy.get(CyConsts.element).first().should("contain", "head");
    }
    if(type === "deleteHeadElement"){
      cy.get(CyConsts.circle).first().should("have.css", "border-color", CircleColors.Default).should("have.text", "");
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CyConsts.circle).first().should("have.css", "border-color", CircleColors.Default).should("have.text", value);
      cy.get(CyConsts.element).first().should("contain", "head");
    }

    if(type === "addTailElement"){
      cy.get(CyConsts.circle).eq(-2).should("have.css", "border-color", CircleColors.Changing).should("have.text", value);
      cy.get(CyConsts.circle).last().should("have.css", "border-color", CircleColors.Modified).should("have.text", value);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CyConsts.circle).last().should("have.css", "border-color", CircleColors.Default).should("have.text", value);
      cy.get(CyConsts.element).last().should("contain", "tail");
    }
    if(type === "deleteTailElement"){
      cy.get(CyConsts.circle).eq(-2).should("have.css", "border-color", CircleColors.Default).should("have.text", "");
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CyConsts.circle).last().should("have.css", "border-color", CircleColors.Default).should("have.text", value);
      cy.get(CyConsts.element).last().should("contain", "tail");
    }

    if(type === "addElementByIndex"){
      cy.get(CyConsts.circle).eq(2).should('have.css', 'border-color', CircleColors.Modified).and('have.text', value)
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CyConsts.circle).eq(2).should('have.css', 'border-color', CircleColors.Default).and('have.text', value)
      cy.get(CyConsts.element).eq(2).should("contain", "2");
    }
    if(type === "deleteIndexElement"){
      cy.get(CyConsts.circle).eq(2).should("have.css", "border-color", CircleColors.Changing).and("have.text", value);
      cy.get(CyConsts.element).eq(2).should("contain", "2");
      cy.wait(SHORT_DELAY_IN_MS);
    }
};

describe('List-page работает корректно', () => {
  beforeEach('Предварительная загрузка List-page', () => {
    cy.visit(CyRoutes.list);
  });

  it("Начальный массив рендерится корректно", () => {
    cy.get(CyConsts.element).then((elements) => {
      cy.wrap(elements).should("have.length.within", 4, 6);
      cy.wrap(elements).find(CyConsts.circle).should("have.css", "border-color", CircleColors.Default);
      cy.wrap(elements).first().should("contain", "head");
      cy.wrap(elements).last().should("contain", "tail");
    });
  });

  it("Добавление элемента в начало списка работает корректно", () => {
    let inputValue = [];
    cy.get(CyConsts.circle).each((element) => {
      const value = element.text().trim();
      inputValue.push(value);
    }).then(() => {
      cy.get(CyConsts.input).type("el");
      cy.contains("button", "Добавить в head").click();
      animation("el", "addHeadElement");
      cy.get(CyConsts.circle).should("have.length", inputValue.length + 1);
    })
  })

  it("Добавление элемента в конец списка работает корректно", () => {
    let inputValue = [];
    cy.get(CyConsts.circle).each((element) => {
      const value = element.text().trim();
      inputValue.push(value);
    }).then(() => {
      cy.get(CyConsts.input).type("el");
      cy.contains("button", "Добавить в tail").click();
      animation("el", "addTailElement");
      cy.get(CyConsts.circle).should("have.length", inputValue.length + 1);
    })
  })

  it("Добавление элемента в по index работает корректно", () => {
    let inputValue = [];
    cy.get(CyConsts.circle).each((element) => {
      const value = element.text().trim();
      inputValue.push(value);
    }).then(() => {
      cy.get(CyConsts.input).type("el");
      cy.get(CyConsts.indexInput).type("2");
      cy.contains("button", "Добавить по индексу").click();
      animation("el", "addElementByIndex");
      cy.get(CyConsts.circle).should("have.length", inputValue.length + 1);
    })
  })

  it("Удаление элемента из начала списка работает корректно", () => {
    let inputValue = [];
    cy.get(CyConsts.circle).each((element) => {
      const value = element.text().trim();
      inputValue.push(value);
    }).then(() => {
      cy.contains("button", "Удалить из head").click();
      animation(inputValue[1], "deleteHeadElement");
      cy.get(CyConsts.circle).should("have.length", inputValue.length - 1);
    })
  })

  it("Удаление элемента из конца списка работает корректно", () => {
    let inputValue = [];
    cy.get(CyConsts.circle).each((element) => {
      const value = element.text().trim();
      inputValue.push(value);
    }).then(() => {
      cy.contains("button", "Удалить из tail").click();
      animation(inputValue[inputValue.length - 2], "deleteTailElement");
      cy.get(CyConsts.circle).should("have.length", inputValue.length - 1);
    })
  })

  it("Удаление элемента по индексу работает корректно", () => {
    let inputValue = [];
    cy.get(CyConsts.circle).each((element) => {
      const value = element.text().trim();
      inputValue.push(value);
    }).then(() => {
      cy.get(CyConsts.indexInput).type("2");
      cy.contains("button", "Удалить по индексу").click();
      animation(inputValue[2], "deleteIndexElement");
      cy.get(CyConsts.circle).eq(2).should("have.text", inputValue[3]);
      cy.get(CyConsts.circle).should("have.length", inputValue.length - 1);
    })
  })


  it("кнопки не активны при пустом поле ввода", () => {
    cy.get("input").should("be.empty");
    cy.get(CyConsts.button).should("be.disabled");
  });


})