import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {createContainer} from "meteor/react-meteor-data";

class FAQ extends Component {
    render () {
        return (
            <div>
                <Button>
                    <a  href="/files/example.xls" target="_blank">Download pattern for xls</a>
                </Button>
            </div>
        )
    }

}

export default FAQ;