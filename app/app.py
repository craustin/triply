import os
from flask import Flask
from flask import make_response

app = Flask(__name__)

@app.route('/')
def triply():
	return make_response(open('app/templates/index.html').read())

if __name__ == '__main__':
	app.run()
