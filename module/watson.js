'use strict';

const config = require('../config/config');
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

const conversation = new ConversationV1({
    username: config.CONVERSATION.USER_NAME,
    password: config.CONVERSATION.PASSWORD,
    version: config.CONVERSATION.VERSION,
    version_date: config.CONVERSATION.VERSION_DATE
});

const discovery = new DiscoveryV1({
    username: config.DISCOVERY.USER_NAME,
    password: config.DISCOVERY.PASSWORD,
    version: config.DISCOVERY.VERSION,
    version_date: config.DISCOVERY.VERSION_DATE
});

exports.conversation_init = () => {
    return new Promise((resolve, reject) => (
        conversation.message({
            workspace_id: config.CONVERSATION.WORKSPACE_ID,
            input: {'text': ''}
        }, function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        })
    ));
};

exports.send_message = (msg, context) => {
    return new Promise((resolve, reject) => {
        conversation.message({
            workspace_id: config.CONVERSATION.WORKSPACE_ID,
            input: {'text': msg},
            context: context
        }, function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        })
    });
};

exports.natural_language_query = (query) => {
    return new Promise((resolve, reject) => {
        discovery.query({
            environment_id: config.DISCOVERY.ENVIRONMENT_ID,
            collection_id: config.DISCOVERY.COLLECTION_ID,
            natural_language_query: query,
            count: 3
        }, function(err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    })
};