'use strict';

var Client = require('./client/v1');
var device = new Client.Device('wtf12362');
var storage = new Client.CookieFileStorage('./cookies/wtf12362.json');
// var storage = new Client.CookieMemoryStorage();

var schedule = require('node-schedule');
schedule.scheduleJob('*/5 * * * *', function(){
    console.log('every five minutes invoke');
    Client.Session.create(device, storage, 'wtf12362', 'QazPlm,./#123', 'http://127.0.0.1:1087')
        .then(function(session) {
            // JPEG is the only supported format now, pull request for any other format welcomed!
            // return Client.Upload.photo(session, './test.jpg');
            return [session,Client.Upload.photo(session,'test2.jpg')]
        })
        .spread(function(session,upload){
            console.log(upload.params.uploadId);
            return Client.Media.configurePhoto(session, upload.params.uploadId, 'i\'m a caption ');
        })
        .then(function(medium) {
            // we configure medium, it is now visible with caption
            console.log(medium.params)
        });
});

