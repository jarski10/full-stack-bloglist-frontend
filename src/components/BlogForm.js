import { useState } from 'react'
import PropTypes from 'prop-types'



const BlogForm = ({ createBlog }) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewnewUrl] = useState('')

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }


  return (

    <div>
      <div style={hideWhenVisible}>
        <button id="add-blog-button" onClick={() => setBlogFormVisible(true)}>add blog</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <div>
            Title
            <input
              id="title"
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            Author
            <input
              id="author"
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            Url
            <input
              id="url"
              value={newUrl}
              onChange={({ target }) => setNewnewUrl(target.value)}
            />
          </div>
          <button id="submit-button" type="submit">save</button>
        </form>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}



export default BlogForm