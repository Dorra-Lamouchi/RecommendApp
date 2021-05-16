import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./style.css";
import NavBar from "../../headers/nav"


export default function Signup() {
  const nameRef = useRef()
  const phoneRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    if ((parseInt(phoneRef.current.value).toString().length !== phoneRef.current.value.length) || (phoneRef.current.value.length !== 8)) {
      return setError("Phone number invalid")
    }

    if (passwordRef.current.value.length < 6) {
      return setError("Password too short")
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div>
      <NavBar />
      <div id="container" className="d-flex " >
        <Card id="Card">
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form id="Form" onSubmit={handleSubmit}>
              <Form.Group id="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required />
              </Form.Group>
              <Form.Group id="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" ref={phoneRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <Button id="Button" disabled={loading} className="w-50" type="submit">
                Sign Up
            </Button>
              <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/signin">Log In</Link>
              </div>
            </Form>

          </Card.Body>
        </Card>

      </div>
    </div>
  )
}