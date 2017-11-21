import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Test extends Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }
    render() {
        return(
            <div>
                <Button>Roll dice</Button>
            </div>
        )
    }
}



export default connect(null, actions)(Test)
