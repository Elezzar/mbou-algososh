import { CyRoutes } from "./utils.cy"

describe('Сервис доступен', () => {
    it('Проверка доступности домашней страницы', () => {
        cy.visit(CyRoutes.home)
    })
})