from flask import Flask, current_app
from flask import render_template

app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

@app.route('/', methods=["GET"])
def hello_world():
    return "Hi Manne!"

@app.route('/test', methods=["GET"])
def test():
    return current_app.send_static_file('test.html')

@app.route('/test.html', methods=["GET"])
def testhtml():
    return "bestanden"
