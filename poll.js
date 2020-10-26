class Poll {
    constructor( question, optionA, optionB ) {
        this.q = question;
        this.options = [ optionA, optionB ];
        this.data = [ 0, 0 ];
    }

    show() {
        $("#title").html(this.q);
        $("#option-a").val(this.options[0]);
        $("#option-b").val(this.options[1]);
    }
}