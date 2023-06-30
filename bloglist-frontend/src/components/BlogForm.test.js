import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('check if form calls prop callback function with the right parameters when adding a new blog', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog} />)
    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')

    const createButton = screen.getByText('create')
    await user.type(titleInput, 'testing title...')
    await user.type(authorInput, 'testing author...')
    await user.type(urlInput, 'testing url...')
    await user.click(createButton)
    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing title...')
    expect(createBlog.mock.calls[0][0].author).toBe('testing author...')
    expect(createBlog.mock.calls[0][0].url).toBe('testing url...')
  })
})