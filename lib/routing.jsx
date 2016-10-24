import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import AppContainer from '../imports/ui/App'
import Home from '../imports/ui/home/Home'
import UserSidebarContainer from '../imports/ui/user-sidebar/UserSidebar'
import CardConteiner from '../imports/ui/dictionary/Card'

let loggedOut = FlowRouter.group({
    name: "loggedOut",
    triggersEnter: [(context, redirect, stop) => {
        if (Meteor.userId()){
            redirect(FlowRouter.path("dictionary"))
        }
    }]
});

loggedOut.route('/', {
    name:"Main",
    action:(params, queryParams) => {
        mount(AppContainer, {
            mainView: (<Home singIn={false}/>),
        });
    }
});

loggedOut.route('/sing-in', {
    name:"Main",
    action:(params, queryParams) => {
        mount(AppContainer, {
            mainView: (<Home singIn={true}/>),
        });
    }
});

let loggedIn= FlowRouter.group({
    triggersEnter: [function(context, redirect) {
        if (!Meteor.userId()){
            FlowRouter.go('/sing-in')
        }
    }]
});

loggedIn.route('/logout', {
    name:"logout",
    action:(params, queryParams) => {
        Meteor.logout(() => {
            mount(AppContainer, {
                mainView: (<Home singIn={false}/>),
            });
        })

    }
});

loggedIn.route('/dictionary', {
    name:"dictionary",
    action:(params, queryParams) => {
        mount(AppContainer, {
            userSidebar: (<UserSidebarContainer/>),
            mainView: (<CardConteiner/>),
        });
    }
});
