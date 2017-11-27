import React from 'react'

import firebase from '../firebase'

const google = new firebase.auth.GoogleAuthProvider()
const email = new firebase.auth.EmailAuthProvider()

// If you want to request additional permissions, you'd do it
// like so:
//
// google.addScope('https://www.googleapis.com/auth/plus.login')

export default ({ auth }) => (
  // signInWithPopup will try to open a login popup, and if it's blocked, it'll
  // redirect. If you prefer, you can signInWithRedirect, which always
  // redirects.
  <button className="google login" onClick={() => auth.signInWithPopup(google)}>
    Login with Google
  </button>
)
