import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Stage } from 'react-konva'
import { Container, Grid, Button, Menu, Segment } from 'semantic-ui-react'

import Board from '../components/Board';

import PlayerTab from '../components/PlayerTab'
import MessageTab from '../components/MessageTab'
import LogTab from '../components/LogTab'

import BuildBtn from '../components/BuildBtn'
import DevCardBtn from '../components/DevCardBtn'
import EndTurnBtn from '../components/EndTurnBtn'
import TradeBtn from '../components/TradeBtn'

class GamePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'players'
        }
        this.handelWheel = this.handleWheel.bind(this)
        this.handlePanelClick = this.handlePanelClick.bind(this)
    }

    // function for board zooming
    handleWheel(thisEvent, thisStage) {
        let e = thisEvent.evt;
        let stage = thisStage._stage;
        var scaleBy = 1.03;
        e.preventDefault();

        var oldScale = stage.scaleX();

        var mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });

        var newPos = {
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        };
        stage.position(newPos);
        stage.batchDraw();
    }

    // function for panel menu selection
    handlePanelClick(e, { name }) {
        this.setState({ activeItem: name })
    }


    render() {

        //controls which panel tab appears based on menu selection
        let section;
        if (this.state.activeItem === 'players') { section = <PlayerTab />; }
        if (this.state.activeItem === 'messages') { section = <MessageTab />; }
        if (this.state.activeItem === 'log') { section = <LogTab />; }

        //local state governing current panel selection
        const { activeItem } = this.state

        return (

            <Grid padded>
                {/* this row contains game map, players, chat, log */}
                <Grid.Row
                    style={{ height: '80vh' }}
                >
                    {/* Konva map column */}
                    <Grid.Column
                        textAlign={'center'}
                        color={'red'}
                        width={11}
                    >
                        {/*do not abtract stage as separate component due to zoom and panning functions */}
                       <Board />
                    </Grid.Column>

                    {/* right-side panel column */}
                    <Grid.Column
                        textAlign={'center'}
                        color={'blue'}
                        width={5}
                    >
                        {/* do not abtract due to local state (unless we transition to using redux store) */}
                        <Menu pointing secondary>
                            <Menu.Item name='players' active={activeItem === 'players'} onClick={this.handlePanelClick} />
                            <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handlePanelClick} />
                            <Menu.Item name='log' active={activeItem === 'log'} onClick={this.handlePanelClick} />
                            <Menu.Menu position='right'>
                                <Menu.Item name='quit' active={activeItem === 'quit'} onClick={this.handlePanelClick} />
                            </Menu.Menu>
                        </Menu>

                        {/* section depends on menu selection */}
                        {section}

                    </Grid.Column>
                </Grid.Row>

                {/* contains the players table and action buttons */}
                <Grid.Row
                    style={{ height: '20vh' }}
                    color={'yellow'}
                >
                    {/* players table column */}
                    <Grid.Column width={11} color={'black'}>
                    </Grid.Column>

                    {/* action buttons column */}
                    <Grid.Column width={5} color={'grey'}>
                        <Grid.Row style={{ height: '50%' }}>
                            <BuildBtn />
                            <TradeBtn />
                        </Grid.Row>

                        <Grid.Row style={{ height: '50%' }}>
                            <DevCardBtn />
                            <EndTurnBtn />
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default GamePage;
