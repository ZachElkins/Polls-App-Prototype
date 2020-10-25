from lib import Tk

class GUI:
    def __init__(self, master) :
        self.master = master
        master.title("A simple GUI")

        self.label = Tk.Label(master, text="This is our first GUI!")
        self.label.pack()

        self.greet_button = Tk.Button(master, text="Greet", command=self.greet)
        self.greet_button.pack()

        self.close_button = Tk.Button(master, text="Close", command=master.quit)
        self.close_button.pack()

    def greet(self) :
        print("Greetings!")