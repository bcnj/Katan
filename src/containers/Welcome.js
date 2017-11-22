import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { createGame } from '../actions'
// import dummyData from './dummyData'
import { db } from '../firebase'
import dummyData from '../dummyData'
// import * as actions from '../actions'
import {setRobberThunk} from '../actions/tiles'

class Welcome extends Component {
  constructor(props){
    super(props)
  }

  render(){
    this.props.setRobber(1, true)
    return(
    <div style={{ textAlign: 'center', marginTop: '40vh' }}>
        <h1> Settlers of Catan </h1>
        <div>
          <div style={{ textAlign: 'around' }}>
            <Link to={'/lobby'}>
              <Button secondary> Join Game </Button>
            </Link>
              <Button secondary onClick={this.props.handleCreate}> Create Game </Button>
          </div>
        </div>
  </div>
)
}
}

const mapStateToProps = (state) => {
  return {
    allGames: state.game,
    tiles: state.tiles
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleCreate: ()=> {
      db.collection('testGames').add(dummyData)
      ownProps.history.push('/lobby')
    },
    setRobber: (id, tF) {
      dispatch(setRobberThunk(id, tF))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
