import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
const BlogForm = ({ user, referenceFunc }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const newObj = {
      title,
      author,
      url,
    }
    dispatch(createBlog(newObj, user))
    referenceFunc.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}
export default BlogForm
