class Poll {
    constructor( question, options, newPoll=false ) {
        this.q = question;
        this.options = options;
        this.data = [];
        for( let option of options ) {
            this.data.push( 0 );
        }

        this.id = sha256(this.q);

        if( newPoll ) {
            storeData( this );
        }
    }

    showOptions( showData ) {
        $("#title").html(this.q);

        $("#current-options-container").html("");

        for( let i = 0; i < this.options.length; i ++ ) {
            var id = "option-"+i;
            var val = this.options[i];
            if( showData ) {
                val += " | " + this.data[i];
            }
            var op = $('<input type="button" class="'+id+' option" id="'+id+'" value="'+ val +'"  />')

            $("#current-options-container").append( op );

            op.click(function() {
                currentPoll.data[i]++;
                currentPoll.showOptions( true );
                var children = $("#current-options-container").children();
                for( var child of children ) {
                    child.disabled = true;
                }
                updateDB( this.id );
            });
            
        }
    }
}
