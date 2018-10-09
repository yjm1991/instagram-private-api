'use strict';

var Client = require('./client/v1');
var device = new Client.Device('wtf12362');
// var storage = new Client.CookieFileStorage(__dirname + './cookies/wtf12362.json');
var storage = new Client.CookieMemoryStorage();


var medias = [
    {
        type: 'photo',
        size: [400, 400],
        data: 'test.jpg'
    }, 
    {
        type: 'photo',
        size: [400, 400],
        data: 'test2.jpg',
    }
    // {
    //     type: 'video',
    //     size: [720, 720],
    //     thumbnail: 'test2.jpg',
    //     data: 'wtf.mp4'
    // } // ... up to 10 media files (photo/video)
], disabledComments = true;

// MP4 is the only supported format now, pull request for any other format welcomed!
Client.Session.create(device, storage, 'wtf12362', 'QazPlm,./#123', 'http://127.0.0.1:1087')
    .then(function(session) {

        return [session,Client.Upload.album(session, medias)]
    })
    .spread(function(session,payload){
        return Client.Media.configureVideo(session, payload, 'akward caption', disabledComments);
    })
    .then(function() {

    });