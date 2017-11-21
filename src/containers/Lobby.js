import React, { Component } from 'react'
import IndividualRoom from '../components/IndividualRoom'
import {connect} from 'react-redux'
import { db } from '../firebase'
import { Container } from 'semantic-ui-react'
import { fetchGames } from '../actions'

class Lobby extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.props.fetchGames()
  }

  render() {
    console.log(this.props)
    return (
    <Container style={{marginTop: '10vh'}}>
      <IndividualRoom allGames={this.props.allGames} />
    </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allGames: state.games
  }
}

const mapDispatchToProps = { fetchGames }

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)