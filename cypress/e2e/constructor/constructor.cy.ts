const BUN = '643d69a5c3f7b9001cfa093d'; //Флюоресцентная булка R2-D3
const SECOND_BUN = '643d69a5c3f7b9001cfa093c'; // Краторная булка N-200i
const MAIN = '643d69a5c3f7b9001cfa0949'; // Мини-салат Экзо-Плантаго
const SAUCE = '643d69a5c3f7b9001cfa0942'; // Соус Spicy-X
const INGREDIENT_TYPE = 'main';

describe('Проверяем доступность приложения', function () {
  it('Сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });
});

const setupBaseMocks = () => {
  cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.visit('/');
  cy.wait('@getIngredients');
};

describe('Тесты', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Добавление ингредиента из списка ингредиентов в конструктор', () => {
    beforeEach(setupBaseMocks);

    it('Добавление булки', () => {
      cy.addIngredient(BUN);
      cy.get('[data-cy="burgerConstructor_bun-top"]').should(
        'contain',
        '(верх)'
      );
      cy.get('[data-cy="burgerConstructor_bun-bottom"]').should(
        'contain',
        '(низ)'
      );
    });

    it('Замена булки', () => {
      let firstBunText: string;

      cy.addIngredient(BUN);

      cy.get(
        '[data-cy="burgerConstructor_bun-top"] span.constructor-element__text'
      )
        .invoke('text')
        .then((text) => {
          firstBunText = text.trim();
        });

      cy.addIngredient(SECOND_BUN);

      cy.get(
        '[data-cy="burgerConstructor_bun-top"] span.constructor-element__text'
      )
        .invoke('text')
        .then((secondText) => {
          expect(secondText.trim()).to.not.equal(firstBunText);
        });
    });

    it('Добавление котлеты', () => {
      cy.addIngredient(MAIN);
      cy.get(`[data-cy="burgerConstructor_fill-${MAIN}"]`).should('exist');
    });

    it('Добавление и удаление котлеты', () => {
      cy.addIngredient(MAIN);

      cy.get(`[data-cy="burgerConstructor_fill-${MAIN}"]`)
        .should('exist')
        .as('filling');

      cy.get('@filling').find('span.constructor-element__action').click();

      cy.get(`[data-cy="burgerConstructor_fill-${MAIN}"]`).should('not.exist');
    });

    it('Добавление соуса', () => {
      cy.addIngredient(SAUCE);
      cy.get(`[data-cy="burgerConstructor_fill-${SAUCE}"]`).should('exist');
    });

    it('Добавление и удаление соуса', () => {
      cy.addIngredient(SAUCE);

      cy.get(`[data-cy="burgerConstructor_fill-${SAUCE}"]`)
        .should('exist')
        .as('filling');

      cy.get('@filling').find('span.constructor-element__action').click();

      cy.get(`[data-cy="burgerConstructor_fill-${SAUCE}"]`).should('not.exist');
    });

    it('Добавление всех ингредиентов', () => {
      cy.addIngredient(BUN);
      cy.addIngredient(MAIN);
      cy.addIngredient(SAUCE);

      cy.get('[data-cy="burgerConstructor_bun-top"]').should(
        'contain',
        '(верх)'
      );
      cy.get('[data-cy="burgerConstructor_bun-bottom"]').should(
        'contain',
        '(низ)'
      );
      cy.get(`[data-cy="burgerConstructor_fill-${MAIN}"]`).should('exist');
      cy.get(`[data-cy="burgerConstructor_fill-${SAUCE}"]`).should('exist');
    });
  });

  describe('Открытие и закрытие (на крестик) модального окна с описанием ингредиента', () => {
    beforeEach(setupBaseMocks);

    it('Открытие модального окна с описанием ингредиента', () => {
      cy.openIngredientModal(INGREDIENT_TYPE, MAIN);
    });

    it('Проверка данных отображаемого ингредиента', () => {
      cy.fixture('ingredients.json')
        .its('data')
        .should('be.an', 'array')
        .then((ingredients) => {
          const target = ingredients.find((ing: any) => ing._id === MAIN);
          expect(target, `ингредиент ${MAIN} существует`).to.exist;
          return target;
        })
        .then((target) => {
          cy.openIngredientModal(INGREDIENT_TYPE, MAIN);
          cy.get('[data-cy="ingredient_modal"] h3').should(
            'contain.text',
            target.name
          );
        });
    });

    it('Закрытие модального окна с описанием ингредиента', () => {
      cy.openIngredientModal(INGREDIENT_TYPE, MAIN);
      cy.closeIngredientModal();
    });
  });

  describe('Открытие и закрытие (на overlay) модального окна с описанием ингредиента', () => {
    beforeEach(setupBaseMocks);

    it('Открытие модального окна с описанием ингредиента', () => {
      cy.openIngredientModal(INGREDIENT_TYPE, MAIN);
    });

    it('Проверка данных отображаемого ингредиента', () => {
      cy.fixture('ingredients.json')
        .its('data')
        .should('be.an', 'array')
        .then((ingredients) => {
          const target = ingredients.find((ing: any) => ing._id === MAIN);
          expect(target, `ингредиент ${MAIN} существует`).to.exist;
          return target;
        })
        .then((target) => {
          cy.openIngredientModal(INGREDIENT_TYPE, MAIN);
          cy.get('[data-cy="ingredient_modal"] h3').should(
            'contain.text',
            target.name
          );
        });
    });

    it('Закрытие модального окна с описанием ингредиента', () => {
      cy.openIngredientModal(INGREDIENT_TYPE, MAIN);
      cy.get('[data-cy="modal_overlay"]:last').click({ force: true });
      cy.get('[data-cy="ingredient_modal"]').should('not.exist');
    });
  });

  describe('Процесс создания заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.intercept('GET', '**/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', '**/auth/token', { fixture: 'refresh-token.json' });
      cy.intercept('POST', '**/orders', { fixture: 'order-response.json' }).as(
        'createOrder'
      );
      cy.setCookie('accessToken', 'tempAccessToken');
      cy.visit('/', {
        onBeforeLoad(window) {
          window.localStorage.setItem('refreshToken', 'tempRefreshToken');
        }
      });
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
    });

    it('Добавление ингредиентов в конструктор бургера', () => {
      cy.addIngredient(BUN);
      cy.addIngredient(MAIN);
      cy.get('[data-cy="burgerConstructor"]').should(
        'not.contain',
        'Выберите булки'
      );
    });

    it('Проверка отображения модального окна с верным номером заказа при клике на кнопку оформления заказа', () => {
      cy.addIngredient(BUN);
      cy.addIngredient(MAIN);

      cy.get('[data-cy="order_button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="order_details"]').should('be.visible');
      cy.get('[data-cy="order_number"]').should('contain', '97411');
    });

    it('Проверка очистки конструктора бургера от добавленных ингредиентов', () => {
      cy.addIngredient(BUN);
      cy.addIngredient(MAIN);

      cy.get('[data-cy="order_button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="modal_close"]').click();

      cy.get('[data-cy="burgerConstructor"]').should(
        'contain',
        'Выберите булки'
      );
      cy.get('[data-cy="burgerConstructor"]').should(
        'contain',
        'Выберите начинку'
      );
    });
  });
});
