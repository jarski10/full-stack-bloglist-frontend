import { useState } from 'react'
import blogService from '../services/blogs'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewnewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }


  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        Url
        <input
          value={newUrl}
          onChange={({ target }) => setNewnewUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm