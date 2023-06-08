import os
from flask import Flask, request, send_from_directory, url_for
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['UPLOAD_FOLDER'] = os.path.abspath("uploads")

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/upload', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def upload_file():
    if 'image' not in request.files:
        return 'No image in the request', 400

    file = request.files['image']

    if file.filename == '':
        return 'No selected file', 400

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return {'url': url_for('uploaded_file', filename=filename)}

@app.route('/uploads/<filename>')
@cross_origin()
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
