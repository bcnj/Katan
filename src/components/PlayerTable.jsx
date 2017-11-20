import React from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Card, Segment, Icon, Image } from 'semantic-ui-react';

const PlayerTable = (props) => {

    return (
        // overall row wrapper
        <Grid container={true} style={{ height: '106%' }}>
            {/* player name and stats box */}
            <Grid.Column
                width={3}
            // stretched={true}
            // style={{ height: '100%' }}
            >
                <Card style={{ height: '100%', width: '100%' }}>
                    <Image src='//insert image url' />
                    <Card.Content>
                        <Card.Header>
                            Player Name
                 </Card.Header>
                        <Card.Description>
                            VP Points: 0
                </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>

            {/* player resource cards */}
            <Grid.Column width={13} >
                <Segment style={{ height: '100%', width: '100%' }} >
                    <Grid columns={5}>
                        <Grid.Row>
                            <Grid.Column>
                                Brick: 0
                            </Grid.Column>

                            <Grid.Column>
                                Wood: 0
                            </Grid.Column>

                            <Grid.Column>
                                Sheep: 0
                            </Grid.Column>

                            <Grid.Column>
                                Wheat: 0
                            </Grid.Column>

                            <Grid.Column>
                                Ore: 0
                            </Grid.Column>
                        </Grid.Row>
                        </Grid>
                </Segment>
            </Grid.Column>
        </Grid>
                );
};

// const mapState = (state) => {
//     return {
//     };
// };

// const mapDispatch = (dispatch) => {
//     return {
//     };
// };

// export default connect(mapState, mapDispatch)(PlayerTable);
export default (PlayerTable);

