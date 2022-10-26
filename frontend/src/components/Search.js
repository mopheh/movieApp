import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
function SearchBox() {
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}/1`)
    } else {
      navigate("/")
    }
  }

  return (
    <Form onSubmit={submitHandler} className="form-inline">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search..."
        autoComplete="off"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-1 ml-sm-1 rounded-left"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2 rounded-right"
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
