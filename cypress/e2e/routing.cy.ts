import { CyRoutes } from "./utils.cy";

describe('Перемещение по страницам сайта работает корректно', () => {
  beforeEach('Предварительная загрузка Home-страницы', () => {
    cy.visit(CyRoutes.home);
  });

  it('Переход на String-page работает корректно', () => {
    cy.visit(CyRoutes.recursion);
    cy.contains('Строка');
  });

  it('Переход на Fibonacci-page работает корректно', () => {
    cy.visit(CyRoutes.fibonacci);
    cy.contains('Последовательность Фибоначчи');
  });

  it('Переход на Sorting-page работает корректно', () => {
    cy.visit(CyRoutes.sorting);
    cy.contains('Сортировка массива');
  });

  it('Переход на Stack-page работает корректно', () => {
    cy.visit(CyRoutes.stack);
    cy.contains('Стек');
  });

  it('Переход на Queue-page работает корректно', () => {
    cy.visit(CyRoutes.queue);
    cy.contains('Очередь');
  });

  it('Переход на List-page работает корректно', () => {
    cy.visit(CyRoutes.list);
    cy.contains('Связный список');
  });

})