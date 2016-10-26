import React from 'react';
import { Meteor } from 'meteor/meteor';
import {render} from 'react-dom';

import './routing';

Meteor.startup(() => {
    render(<AppContainer />, document.getElementById('main'));
});