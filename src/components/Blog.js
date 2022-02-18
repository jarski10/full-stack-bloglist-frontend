import { useState } from 'react'
//import blogService from '../services/blogs'
import React from 'react'

const Blog = ({ blog, updateBlog, viewChange }) => {
  const [infoVisible, setInfoVisible] = useState(false)

const infoHandler = () => {
  setInfoVisible(!infoVisible)
  viewChange(blog)
}

// function likeHandler(e) {
//   e.preventDefault();
//   blogService.update(blog.id, 
//     {title: blog.title,
//     author: blog.author,
//     url: blog.url,
//     likes: blog.likes + 1})
//     window.location.reload()
// }

const handleLike = () => {
  updateBlog(blog)
};

  // return (
  //   <div>
  //     <div>{blog.title}
  //     <div style={hideWhenVisible} className='blog'>
  //       <button onClick={() => setInfoVisible(true)}>View</button>
  //     </div>
  //     </div>
  //     <div style={showWhenVisible}>
  //       <div>{blog.url}</div><div>{blog.likes}</div> <div>{blog.author}</div> <button onClick={() => setInfoVisible(false)}>Hide</button>
  //     </div>
  //     <button onClick={likeHandler}>Like</button>
  //   </div>
  // )

  return (
    <div>
      
      <div className='blog'>
      {infoVisible === false ?
      <div><div>{blog.title}</div><button onClick={infoHandler}>View</button></div> :
      <div><div>{blog.title}</div><div>{blog.url}</div><div>{blog.likes}</div> <div>{blog.author}</div> <button onClick={infoHandler}>Hide</button></div>
      }
      </div>
      <button onClick={handleLike}>Like</button>
    </div>
  )
}

export default Blog