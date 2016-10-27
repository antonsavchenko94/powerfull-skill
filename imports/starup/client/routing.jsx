import {FlowRouter} from "meteor/kadira:flow-router";
import React from "react";
import {mount} from "react-mounter";

import AppContainer from "../../ui/App";
import Home from "../../ui/home/Home";
import UserSidebarContainer from "../../ui/user-sidebar/UserSidebar";
import CardContainer from "../../ui/dictionary/Card";
import WordsViewContainer from "../../ui/dictionary/words/WordsView";
import PublicDictionaries from "../../ui/dictionary/PublicDictionaries";
import UserCardsContainer from "../../ui/users/UserCards";
import QuizzesContainer from "../../ui/quizzes/Quizzes";
import QuizContainer from "../../ui/quizzes/Quiz";

let loggedOut = FlowRouter.group({
    name: "loggedOut",
    triggersEnter: [(context, redirect, stop) => {
        if (Meteor.userId()) {
            redirect(FlowRouter.path("/all-dictionaries"))
        }
    }]
});

loggedOut.route('/sign-up', {
    name: "sign",
    action: (params, queryParams) => {
        mount(AppContainer, {
            mainView: (<Home singIn={false}/>),
        });
    }
});

loggedOut.route('/', {
    name: "Main",
    action: (params, queryParams) => {
        mount(AppContainer, {
            mainView: (<Home singIn={true}/>),
        });
    }
});

let loggedIn = FlowRouter.group({
    triggersEnter: [function (context, redirect) {
        if (!Meteor.userId()) {
            FlowRouter.go('/sign-up')
        }
    }]
});

loggedIn.route('/all-dictionaries', {
    name: "all-dictionaries",
    action: (params, queryParams) => {
        mount(AppContainer, {
            userSidebar: (<UserSidebarContainer/>),
            mainView: (<PublicDictionaries/>),
        });

    }
});

loggedIn.route('/logout', {
    name: "logout",
    action: (params, queryParams) => {
        Meteor.logout(() => {
            mount(AppContainer, {
                mainView: (<Home singIn={false}/>),
            });
        })

    }
});

loggedIn.route('/dictionaries', {
    name: "dictionaries",
    action: (params, queryParams) => {
        mount(AppContainer, {
            userSidebar: (<UserSidebarContainer/>),
            mainView: (<CardContainer/>),
        });
    }
});

loggedIn.route('/view/:dictionaryId', {
    name: "dictionary-view",
    action: (params, queryParams) => {
        mount(AppContainer, {
            userSidebar: (<UserSidebarContainer/>),
            mainView: (<WordsViewContainer id={params.dictionaryId}/>),
        });
    }
});

loggedIn.route('/user/:id/view/:dictionaryId', {
    name: "user-view-dictionaries",
    action: (params, queryParams) => {
        mount(AppContainer, {
            userSidebar: (<UserSidebarContainer/>),
            mainView: (<WordsViewContainer id={params.dictionaryId}/>),
        });
    }
});

loggedIn.route('/user/:id', {
    name: "some-user-dictionaries",
    action: (params, queryParams) => {
        mount(AppContainer, {
            userSidebar: (<UserSidebarContainer/>),
            mainView: (<UserCardsContainer id={params.id}/>),
        });
    }
});

loggedIn.route('/quizzes', {
    name: "quizzes",
    action: (params, queryParams) => {
        mount(AppContainer, {
            userSidebar: (<UserSidebarContainer/>),
            mainView: (<QuizzesContainer/>),
        });
    }
});

loggedIn.route('/quiz/:id', {
    name: "quiz",
    action: (params, queryParams) => {
        mount(AppContainer, {
            userSidebar: (<UserSidebarContainer/>),
            mainView: (<QuizContainer id={params.id}/>),
        });
    }
});
