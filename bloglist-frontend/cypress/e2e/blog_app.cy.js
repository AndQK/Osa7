describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'Matt tester',
      name: 'Matt',
      password: 'sekret',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.contains('log in to application')
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('Matt tester')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('Matt logged in')
    })
    it('fails with wrong credentials', () => {
      cy.get('#username').type('Matt tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matt logged in')
    })
  })
  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'Matt tester', password: 'sekret' })
    })
    it('A blog can be created', () => {
      cy.contains('new blog').click()
      cy.get('#title-input').type('test title')
      cy.get('#author-input').type('tester')
      cy.get('#url-input').type('test url...')
      cy.get('#create-button').click()

      cy.get('.success')
        .should('contain', 'a new blog test title by tester added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('test title tester')
        .should('have.css', 'padding-top', '10px')
        .and('contain', 'view')
    })
    describe('when there is a blog', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'a likeable blog',
          author: 'tester',
          url: 'http://test.test',
        })
        cy.contains('view').click()
      })
      it('it can be liked', () => {
        cy.get('#like-div').should('contain', 'likes 0')
        cy.get('#like-button').click()

        cy.get('.success')
          .should('contain', 'liked a likeable blog by tester')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.get('#like-div').should('contain', 'likes 1')
      })
      it('it can be deleted by the user who created it', () => {
        cy.contains('remove').click()

        cy.get('.success')
          .should('contain', 'Removed a likeable blog')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.contains('a likeable blog tester').should('not.exist')
      })
      it('it cannot be deleted by other user', () => {
        cy.contains('logout').click()
        const user = {
          username: 'Johnson',
          name: 'other_user',
          password: 'wohooo',
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
        cy.login({ username: 'Johnson', password: 'wohooo' })
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })
    describe('when there is multiple blogs', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'third most likes',
          author: 'tester1',
          url: 'http://test.1',
          likes: 3,
        })
        cy.createBlog({
          title: 'second most likes',
          author: 'tester',
          url: 'http://test.2',
          likes: 4,
        })
        cy.createBlog({
          title: 'least likes',
          author: 'tester3',
          url: 'http://test.3',
        })
        cy.createBlog({
          title: 'most likes',
          author: 'tester4',
          url: 'http://test.4',
          likes: 10,
        })
      })
      it('they are ordered from highest to lowest in terms of likes', () => {
        cy.get('.blog').eq(0).should('contain', 'most likes')
        cy.get('.blog').eq(1).should('contain', 'second most likes')
        cy.get('.blog').eq(2).should('contain', 'third most likes')
        cy.get('.blog').eq(3).should('contain', 'least likes')
      })
      it.only('their order can be changed after liking them', () => {
        cy.contains('third most likes').contains('view').click()
        cy.contains('third most likes')
          .parent()
          .parent()
          .find('#like-button')
          .click()
        cy.get('.blog')
          .eq(2)
          .should('contain', 'third most likes')
          .find('#like-button')
          .click()
        cy.contains('third most likes').parent().parent().contains('likes 4')

        cy.get('.blog').eq(0).should('contain', 'most likes')
        cy.get('.blog').eq(1).should('contain', 'third most likes')
        cy.get('.blog').eq(2).should('contain', 'second most likes')
        cy.get('.blog').eq(3).should('contain', 'least likes')
      })
    })
  })
})
