import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createGame, fetchGames } from '../reducers/game'
import dummyData from './dummyData'
import {db} from '../firebase'


class Welcome extends Component {
  componentDidMount() {
    // db.collection('games').add(dummyData)
    // db.collection('user').doc('something').add({rand: 'e3'})
    fetchGames()
  }

  render(){
    return(
    <div>
    <div className='landing'>
      <div className='mx-auto'>
        <div className='display-4 pb-3'> Settlers of Catan </div>
        <div>
          <div style={{ textAlign: 'around' }}>
            <Link to='/lobby'>
              <Button secondary> Join Game </Button></Link>
            <Link to='/lobby'>
              <Button secondary onClick={createGame}> Create Game </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className='background-overlay'></div>
  </div>
)
}
}




// const mapState = (state) => ({

// })

// const mapDispatch = (dispatch, ownProps) => {
//   return {
//     handleCreate: ()=> {
//       createGame(dummyData)
//     }
//   }
// }

export default connect()(Welcome)