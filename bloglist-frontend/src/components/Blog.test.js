import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testBlog = {
  title: 'testing that blog renders correctly',
  author: 'tester',
  url: 'https://',
  likes: '3000',
  user: {
    name: 'James Bond',
    username: 'webdev123',
    id: '1231231232123'
  }
}

describe('<Blog />', () => {
  test('renders blog`s title and author', () => {
    const { container } = render(<Blog blog={testBlog} />)
    const div = container.querySelector('.titleAndAuthor')
    expect(div).toHaveTextContent('testing that blog renders correctly tester')

  })
  test('renders blog`s url, likes and, user after clicking the button view', async () => {
    const { container } = render(<Blog blog={testBlog} />)

    const div = container.querySelector('.allInfo')
    expect(div).toHaveStyle('display: none')

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const allInfoDiv = container.querySelector('.allInfo')
    expect(allInfoDiv).not.toHaveStyle('display: none')

    const elem1 = screen.getByText('https://')
    const elem2 = screen.getByText('likes 3000')
    const elem3 = screen.getByText('James Bond')
  })
  test('if user presses like button twice then the mock function gets called twice', async () => {
    const likeBlog = jest.fn()
    render(<Blog blog={testBlog} likeBlog={likeBlog} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})