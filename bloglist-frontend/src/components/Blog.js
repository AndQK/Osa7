import { useState } from 'react'
import DeleteBlogButton from './DeleteBlogButton'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [showAll, setShowAll] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const toggleVisibility = () => {
    setShowAll(!showAll)
  }
  const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        <div style={blogStyle} className="titleAndAuthor">
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className="allInfo">
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div id="like-div">
            likes {blog.likes}
            <button
              id="like-button"
              onClick={() => likeBlog(blog.id, { likes: blog.likes + 1 })}
            >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          <DeleteBlogButton deleteMethod={deleteBlog} blog={blog} user={user} />
        </div>
      </div>
    </div>
  )
}

export default Blog
