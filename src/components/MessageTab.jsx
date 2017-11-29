import React, { Component } from 'react'
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

  handleMessageChange = (e, { message, value }) => {
    this.setState({ [message]: value })
    this.renderChat(false)
  }

  handleMessageSubmit = () => {
    const gameId = window.location.href.slice(-20)
    const game = db.collection('games').doc(gameId)
    let time = new Date()
    time = time.toLocaleTimeString()
    let messageUpdate = {}
    let messageCountUpdate = {}
    //player should be grabbed from user, so hardcoded for now
    messageUpdate[`messages.${this.props.messageCount}`] = {
      player: `${localStorage.getItem(`${gameId}`)}`,
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
      this.renderChat(true)
    })
  }

  renderChat = (shouldUpdateMessageStart) => {
    const gameId = window.location.href.slice(-20)
    const game = db.collection('games').doc(gameId)

    //basically tried to make it all a string but realized that semantics wasn't being friendly in that regard so I made a bunch of Segments
    game
      .get()
      .then(doc => {
        let messages = doc.data().messages
        let mapMessagesObjToSegments = [],
          str = '',
          color='olive'
          for (let message in messages) {
            let name = messages[message].player
            if(name !== 'admin') {
              name = doc.data().players[messages[message].player].name
              color = doc.data().players[messages[message].player].color
              if(color === 'white') {
                color = 'black'
              }
            }
          if (parseInt(message) < this.props.messageStart) {
          } else {
            str =
              messages[message].time +
              ':  ' +
              name +
              ' - ' +
              messages[message].content
            mapMessagesObjToSegments.push(
              <Segment textAlign="left" color={color} style={{ height: '5.33%' }}>
                {str}
              </Segment>
            )
          }
        }
        //this is used to be sure to only display 13 messages at a time
        if(shouldUpdateMessageStart) {
          if (mapMessagesObjToSegments.length >= 13) {
            updateMessageStart()
          }
        }
        return mapMessagesObjToSegments
      })
      .then(text =>
        this.setState({
          text
        })
      )
  }

  componentWillMount() {
    console.log('Component will mount')
    const gameId = window.location.href.slice(-20)
    let chat = db.collection('games').doc(gameId)
    console.log('chat', chat)
    chat.onSnapshot(snap => {
      this.renderChat(false)
    })
  }

  render() {
    const { message, text } = this.state
    return (
      <Container style={{ height: '90%'}}>
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
