import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [, setNewTitle] = useState('')
  const [, setNewAuthor] = useState('')
  const [, setNewnewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('logged in')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("error")
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewnewUrl('')
      })
  }

  addBlog.PropTypes = {
    blogObject: PropTypes.object.isRequired
  }


  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  function handleLogoutButton(e) {
    e.preventDefault();
    window.localStorage.clear()
    window.location.reload()
  }

  const viewChange = async (blog) => {

  };

  const updateBlog = async (blog) => {
    blogService.update(blog.id, 
    {title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1})
    
    const newBlogs = [...blogs];
    newBlogs[newBlogs.findIndex(x => x.id === blog.id)].likes += 1;
    setBlogs(newBlogs);
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Login</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in<button onClick={handleLogoutButton}>logout</button></p>
          <BlogForm createBlog={addBlog}/>
        </div>
      }
      
      <h2>blogs</h2>
      <div id="blog-list">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} viewChange={viewChange}/>
      )}
      </div>
    </div>
  )
}

export default App