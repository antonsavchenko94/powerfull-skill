import {FlowRouter} from "meteor/kadira:flow-router";
import React from "react";
import {mount} from "react-mounter";

import MainContainer from "../../ui/containers/MainContainer";
import LoginContainer from "../../ui/containers/LoginContainer";

import LoginView from "../../ui/components/login-view/LoginView";
import Card from "../../ui/components/dictionary/Card";
import WordsView from "../../ui/components/dictionary/words/WordsView";
import PublicDictionaries from "../../ui/components/dictionary/PublicDictionaries";
import UserCards from "../../ui/components/users/UserCards";
import Quizzes from "../../ui/components/quizzes/Quizzes";
import Quiz from "../../ui/components/quizzes/Quiz";
import SignIn from "../../ui/components/authentication/sign-in/SignIn";
import SignUp from "../../ui/components/authentication/sign-up/SignUp";
import UserSettings from "../../ui/components/user-settings/UserSettings";
import FAQ from "../../ui/components/FAQ";

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
        mount(LoginContainer, {
            mainView: <LoginView form={<SignUp/>}/>,
        });
    }
});

loggedOut.route('/', {
    name: "Main",
    action: (params, queryParams) => {
        mount(LoginContainer, {
            mainView: <LoginView form={<SignIn/>}/>,
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
        mount(MainContainer, {
            mainView: <PublicDictionaries/>,
        });

    }
});

loggedIn.route('/logout', {
    name: "logout",
    action: (params, queryParams) => {
        Meteor.logout(() => {
            mount(LoginContainer, {
                mainView: <LoginView form={<SignIn/>}/>,
            });
        })

    }
});

loggedIn.route('/settings', {
    name: "logout",
    action: (params, queryParams) => {
        mount(MainContainer, {
            mainView: <UserSettings/>,
        });
    }
});

loggedIn.route('/dictionaries', {
    name: "dictionaries",
    action: (params, queryParams) => {
        mount(MainContainer, {
            mainView: <Card/>,
        });
    }
});

loggedIn.route('/view/:dictionaryId', {
    name: "dictionary-view",
    action: (params, queryParams) => {
        mount(MainContainer, {
            mainView: <WordsView id={params.dictionaryId}/>,
        });
    }
});

loggedIn.route('/user/:id/view/:dictionaryId', {
    name: "user-view-dictionaries",
    action: (params, queryParams) => {
        mount(MainContainer, {
            mainView: <WordsView id={params.dictionaryId}/>,
        });
    }
});

loggedIn.route('/user/:userId', {
    name: "some-user-dictionaries",
    action: (params, queryParams) => {
        mount(MainContainer, {
            mainView: <UserCards id={params.userId}/>,
        });
    }
});

loggedIn.route('/quizzes', {
    name: "quizzes",
    action: (params, queryParams) => {
        mount(MainContainer, {
            mainView: <Quizzes/>,
        });
    }
});

loggedIn.route('/quiz/:id', {
    name: "quiz",
    action: (params, queryParams) => {
        mount(MainContainer, {
            mainView: <Quiz id={params.id}/>,
        });
    }
});

loggedIn.route('/faq', {
    name: "faq",
    action: (params, queryParams) => {
        mount(MainContainer, {
            mainView: <FAQ/>,
        });
    }
});
