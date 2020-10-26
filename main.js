
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAsKaYuPC1KE0FKQQXgiWFRl3QzUTfMRmA",
    authDomain: "polls-app-632df.firebaseapp.com",
    databaseURL: "https://polls-app-632df.firebaseio.com",
    projectId: "polls-app-632df",
    storageBucket: "polls-app-632df.appspot.com",
    messagingSenderId: "558142086666",
    appId: "1:558142086666:web:460d66905ed9050f51c9f3",
    measurementId: "G-4LL1N19416"
};

// Initialize Firebase
var fb = firebase.initializeApp(firebaseConfig);

var database = firebase.database();
firebase.analytics();

var polls = [];
var currentPoll;

$(function() {
    console.log("here we go");
    console.log(database);

    $("#option-a").click(function() {
        currentPoll.data[0]++;
    });
    $("#option-b").click(function() {
        currentPoll.data[1]++;
    });
    $("#new-poll").click(function() {
        while( true && polls.length > 1 ) { 
            var nextPoll = polls[Math.floor(Math.random() * polls.length)];
            if( nextPoll != currentPoll ) {
                currentPoll = nextPoll;
                currentPoll.show();
                break;
            }
        }

    });
    $("#submit-poll").click(function() {
        polls.push(new Poll( $("#new-title").val(), $("#new-option-a").val(), $("#new-option-b").val()));
        currentPoll = polls[0];
        currentPoll.show();
        $("#new-title").val("")
        $("#new-option-a").val("")
        $("#new-option-b").val("")
    });
});