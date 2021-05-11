import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./style.css";
import NavBar from '../../headers/nav'


export default function Signin() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const {signin} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await signin(emailRef.current.value, passwordRef.current.value)
      history.push("/signedaccueil")
    } catch {
      setError("Failed to login")
    }

    setLoading(false)
  }

  return (
    <div> 
      <NavBar />
    <div id="container" className="d-flex " >
      <Card id="Card2">
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form id="Form" onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button id="Button" disabled={loading} className="w-50" type="submit">
              Sign In
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
            <div className="w-100 text-center mt-2">
                You need an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Form> 
        </Card.Body>
      </Card>   
    </div>
    </div>
  )
}