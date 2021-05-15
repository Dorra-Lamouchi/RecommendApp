import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./style.css";

export default function RecruterSignup() {
  const nameRef = useRef()
  const phoneRef = useRef()
  const domaineRef = useRef()
  const companyRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {signupRec} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const initialFieldValues = {
    Nom: '',
    Phone:'',
    Email: '',
    Password: '',
    Field: '',
    Company: '',
    Status: 'recruter',
    Preferences:''
    }
  const [Values, setValues] = useState(initialFieldValues)
  const handleInputChange = e => {
    var { name, value } = e.target
    setValues({
            ...Values,
            [name]: value
        })
      }

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
      await signupRec(Values)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div>
    <div id="container2" className="d-flex " >
      <Card id="CardRecruter">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up Recruter</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form id="Form" onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" ref={nameRef} name='Nom' onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" ref={phoneRef} name='Phone' onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group id="domaine">
              <Form.Label>Field</Form.Label>
              <Form.Control type="text" ref={domaineRef} name='Field' onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group id="societe">
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" ref={companyRef} name='Company' onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} name='Email' onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} name='Password' onChange={handleInputChange} required />
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
            <div className="w-100 text-center mt-2">
              You want a regular user account? <Link to="/signup">Regular Version</Link>
            </div>
          </Form>
         
        </Card.Body>
      </Card>
      
    </div>
    </div>
  )
  }