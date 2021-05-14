import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./AuthContext"
import Alert from 'react-bootstrap/Alert'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <div id="container3">
        <Alert variant="danger">
          <Alert.Heading>You don't have access!</Alert.Heading>
          <p> Please sign in to see this content</p>
          <Alert.Link href="/signin">Click here</Alert.Link>
        </Alert>
        </div>
      }}
      >
      
      
    </Route>
  )
}