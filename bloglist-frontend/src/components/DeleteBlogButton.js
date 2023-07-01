import PropTypes from 'prop-types'

const DeleteBlogButton = ({ deleteMethod, blog, user }) => {
  if (!user) {
    return null
  }
  if (blog.user.username !== user.username) {
    return null
  }
  return (
    <div>
      <button className="removeBtn" onClick={() => deleteMethod(blog.id, blog)}>
        remove
      </button>
    </div>
  )
}
DeleteBlogButton.propTypes = {
  deleteMethod: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
export default DeleteBlogButton
