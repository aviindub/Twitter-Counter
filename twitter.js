var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');
var client = redis.createClient();

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

t.stream(
    'statuses/filter',
    { track: ['awesome', 'cool', 'rad', 'gnarly', 'groovy'] }, //words to be tracked by twitter stream
    function(stream) { //check for each tracked word in the tweet and incr redis count if found
        stream.on('data', function(tweet) {
            console.log(tweet.text);                                                                        
            if(tweet.text.match(/awesome/)) {
                client.incr('awesome');
            }
			else if(tweet.text.match(/cool/)) {
                client.incr('cool');
            }
			else if(tweet.text.match(/rad/)) {
                client.incr('rad');
            }
			else if(tweet.text.match(/gnarly/)) {
                client.incr('gnarly');
            }
			else if(tweet.text.match(/groovy/)) {
                client.incr('groovy');
            }
        });
    }
);