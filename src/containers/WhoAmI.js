import React, {Component} from 'react'
import firebase from '../firebase'
import { setUser } from '../actions'
import Login from './Login'
import { connect } from 'react-redux'
const auth = firebase.auth()

export const name = user => {
  if (!user) return 'Nobody'
  if (user.isAnonymous) return 'Anonymous'
  return user.displayName || user.email
}

export const WhoAmI = ({user, auth}) =>
  <div className="whoami">
    <span className="whoami-user-name"> Hello, {name(user)}</span>
    {
      (!user || user.isAnonymous)?
      <Login auth={auth}/>
      : <button className='logout' onClick={() => auth.signOut()}>logout</button> }
  </div>

class Auth extends Component {
  componentDidMount() {
    const {auth} = this.props
    this.unsubscribe = auth.onAuthStateChanged(user => {
      this.props.setCurrentUser(user)
      this.setState({user})
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const {user} = this.state || {}
    return <WhoAmI user={user} auth={auth}/>
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return { setCurrentUser: user => {
    dispatch(setUser(user))
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)