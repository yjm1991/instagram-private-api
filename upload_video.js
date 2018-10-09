'use strict';

var Client = require('./client/v1');
var device = new Client.Device('wtf12362');
// var storage = new Client.CookieFileStorage(__dirname + './cookies/wtf12362.json');
var storage = new Client.CookieMemoryStorage();

// MP4 is the only supported format now, pull request for any other format welcomed!
Client.Session.create(device, storage, 'wtf12362', 'QazPlm,./#123', 'http://127.0.0.1:1087')
    .then(function(session) {
        return [session,Client.Upload.video(session, 'wtf.mp4','test.jpg')]
    })
    .spread(function(session,upload){
        console.log(upload.uploadId);
        return Client.Media.configureVideo(session, upload.uploadId, 'akward caption', upload.durationms);
    })
    .then(function(medium) {
        // we configure medium, it is now visible with caption
        console.log(medium.params)
    });