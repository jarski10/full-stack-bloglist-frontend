import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Test init info', () => {
  const blog = {
    title: "wafeaswfwetgerw",
    author: "Jarkko",
    url: "thIS IS URL",
    likes: 5
  }

  render(<Blog blog={blog} />)

  const element1 = screen.queryByText("wafeaswfwetgerw")
  const element2 = screen.queryByText("Jarkko")
  const element3 = screen.queryByText("thIS IS URL")
  const element4 = screen.queryByText(5)
  
  expect(element1).toBeDefined()
  expect(element2).toBeNull()
  expect(element3).toBeNull()
  expect(element4).toBeNull()
})

test('Test expanded info', () => {
  const blog = {
    title: "wafeaswfwetgerw",
    author: "Jarkko",
    url: "thIS IS URL",
    likes: 5
  }

  const mockHandler = jest.fn()
  render(<Blog blog={blog} viewChange={mockHandler} />)

  const button = screen.getByText('View')
  userEvent.click(button)


  expect(mockHandler.mock.calls).toHaveLength(1)
  

  const element1 = screen.getByText("wafeaswfwetgerw")
  const element2 = screen.getByText("Jarkko")
  const element3 = screen.getByText("thIS IS URL")
  const element4 = screen.getByText(5)
  
  expect(element1).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeDefined()
  expect(element4).toBeDefined()
})

test('Test likes', () => {
  const blog = {
    title: "wafeaswfwetgerw",
    author: "Jarkko",
    url: "thIS IS URL",
    likes: 5
  }

  const mockHandler = jest.fn()
  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const button = screen.getByText('Like')
  userEvent.click(button)
  userEvent.click(button)


  expect(mockHandler.mock.calls).toHaveLength(2)
})

