
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

    retrieveData();

    $("#new-poll").slideToggle( 0, function(){} );

    console.log(database);

    $("#next-poll").click(function() {
        while( true && polls.length > 1 ) { 
            var nextPoll = polls[Math.floor(Math.random() * polls.length)];
            if( nextPoll != currentPoll && nextPoll ) {
                console.log("curr: ", currentPoll);
                currentPoll = nextPoll;
                console.log("next: ", currentPoll);
                currentPoll.showOptions( false );
                break;
            }
        }
    });

    $("#return-to-polls").click(function(){
        $("#new-poll").fadeOut( 150, function() {
            $("#polls").slideDown( 350, function() {
            });
        });

        currentPoll.showOptions( false );
    });

    $("#add-poll").click(function(){
        $("#polls").fadeOut( 150, function() {
            $("#new-poll").slideDown( 350, function() {
            });
        });

        populateOptions();
    });

    $("#add-option").click( function() {
        var index = $("#new-options-container").children().length+1;
        var cls = "option option-" + index;
        var val = "Option " + index;
        var op = $('<input type="text" class="'+cls+'" value="'+ val +'" />');
        $("#new-options-container").append( op );
    });

    $("#submit-poll").click(function() {
        var ops = [];
        var children = $("#new-options-container").children();
        
        for( var child of children ) {
            ops.push($(child).val());
        }

        polls.push(new Poll( $("#question-input").val(), ops, true ));

        currentPoll = polls[0];

        populateOptions();

        alert("Poll submitted!");
    });
});

function populateOptions() {
    $("#question-input").val("New Poll");
    $("#new-options-container").html("");

    for( var i = 1; i <= 2; i ++ ) {
        var cls = "option option-" + i;
        var val = "Option " + i;
        var op = $('<input type="text" class="'+cls+'" value="'+ val +'" />');
        $("#new-options-container").append( op );
    }
}

function storeData( poll ) {
    var data = {
        id: poll.id,
        question: poll.q,
        options: poll.options,
        data: poll.data
    };

    database.ref("polls").push(data);
}

function updateDB( id ) {
    var ref = database.ref("polls");
    ref.on( 'value', getData, getError );
}

function getData( data ) {

    var pollRefs = data.val();
    var keys = Object.keys( pollRefs );

    for( var i = 0; i < keys.length; i++ ) {
        var k = keys[i];
        var refId = pollRefs[k].id;
        for( var j = 0; j < polls.length; j++ ) {
            if( polls[j].id == refId ) {
                database.ref("polls/"+k).update({
                    data: polls[j].data
                });
            }
        }
    }
}

function getError( err ) {
    console.log("Error: " + err);
}

function retrieveData() {
    var ref = database.ref("polls")
    ref.on( 'value', loadData, getError );
    setTimeout(() => {
        currentPoll = polls[0];
        currentPoll.showOptions( false );
    }, 500);
}

function loadData( data ) {    var pollRefs = data.val();
    var keys = Object.keys( pollRefs );

    polls = [];

    for( var i = 0; i < keys.length; i++ ) {
        var k = keys[i];
        var refQ = pollRefs[k].question;
        var refO = pollRefs[k].options;
        var refD = pollRefs[k].data;

        var poll = new Poll( refQ, refO, false )
        poll.data = refD;
        polls.push( poll );
    }
}