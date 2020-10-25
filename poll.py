from lib import GUI

class Poll:
    def __init__( self, question, option_a, option_b ) :
        self.q = question
        self.options = ( option_a, option_b )
        self.results = ( 0, 0 )
    
    def display_question( self ) :
        pass

    def display_results( self ) :
        pass