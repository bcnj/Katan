import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Container } from 'semantic-ui-react'
import { db } from '../firebase'
import { updateMessageStart } from '../utils/index'

class MessageTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      text: ''
    }
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.renderChat = this.renderChat.bind(this)
  }

  handleMessageChange = (e, { message, value }) =>
    this.setState({ [message]: value })


  handleMessageSubmit = () => {
    const gameId = window.location.href.slice(-20)
    const game = db.collection('games').doc(gameId)
    let time = new Date()
    time = time.toLocaleTimeString()
    let messageUpdate = {}
    let messageCountUpdate = {}
    //player should be grabbed from user, so hardcoded for now
    messageUpdate[`messages.${this.props.messageCount}`] = {
      player: 'Scott',
      time: time,
      content: this.state.message,
      loadMessages: 1
    }
    //updates message count to make sure the correct messages are dispalayed in the case of overflow
    game.get().then(doc => {
      let messageCount = doc.data().game.messageCount
      messageCount = messageCount + 1
      messageCountUpdate[`game.messageCount`] = messageCount
      game.update(messageUpdate)
      game.update(messageCountUpdate)
      this.setState({ message: '' })
      this.renderChat()
    })
  }

  renderChat = () => {
    const gameId = window.location.href.slice(-20)
    const game = db.collection('games').doc(gameId)

    //when users works properly color can easily be extracted
    // let userName = this.props.user.name
    // let colorFilter = '',
    //  players = this.props.players
    // for(var player in players) {
    //     if(players[player].name === userName) {
    //         colorFilter = players[player].color
    //     }
    // }

    //basically tried to make it all a string but realized that semantics wasn't being friendly in that regard so I made a bunch of Segments
    game
      .get()
      .then(doc => {
        let messages = doc.data().messages
        let mapMessagesObjToSegments = [],
          str = ''
        for (let message in messages) {
          if (parseInt(message) < this.props.messageStart) {
          } else {
            str =
              messages[message].time +
              ':  ' +
              messages[message].player +
              ' - ' +
              messages[message].content
            mapMessagesObjToSegments.push(
              <Segment style={{ color: 'black', height: '5.33%' }}>
                {str}
              </Segment>
            )
          }
        }
        //this is used to be sure to only display 13 messages at a time
        if (mapMessagesObjToSegments.length >= 13) {
          updateMessageStart()
        }
        return mapMessagesObjToSegments
      })
      .then(text =>
        this.setState({
          text
        })
      )
  }

  componentDidMount() {
    this.renderChat()
  }

  render() {
    const { message, text } = this.state
    return (
      <Container style={{ height: '90%' }}>
        <Segment.Group>{text}</Segment.Group>
        <Form
          style={{ height: '20%' }}
          onSubmit={this.handleMessageSubmit}
          widths={false}
        >
          <Form.Group>
            <Form.Input
              placeholder="Message"
              message="message"
              value={message}
              onChange={this.handleMessageChange}
            />

            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

export default MessageTab
