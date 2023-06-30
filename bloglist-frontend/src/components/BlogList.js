import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './Blog'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)
  const remove = (id, blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(id, blog))
    }
  }
  const like = (id, likes) => {
    dispatch(likeBlog(id, likes))
  }
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={like}
          deleteBlog={remove}
          user={user}
        />
      ))}
    </div>
  )
}
BlogList.propTypes = {
  user: PropTypes.object.isRequired,
}
export default BlogList
