import os
import pymysql  # Importa PyMySQL
pymysql.install_as_MySQLdb()  # Installa PyMySQL come MySQLdb

from flask import Flask, request, send_from_directory, url_for
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from database import db, migrate, Pose  # Aggiungi queste importazioni

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['UPLOAD_FOLDER'] = os.path.abspath("uploads")
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost:8889/photo-cataloger'  # Usa PyMySQL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Opzionale: disabilita un avviso

db.init_app(app)
migrate.init_app(app, db)

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

@app.route('/save-pose', methods=['POST'])
@cross_origin()
def save_pose():
    pose_data = request.json
    pose = Pose(
        image_url=pose_data['image_url'],
        nose_score=pose_data['nose_score'],
        leftEye_score=pose_data['leftEye_score'],
        rightEye_score=pose_data['rightEye_score'],
        leftEar_score=pose_data['leftEar_score'],
        rightEar_score=pose_data['rightEar_score'],
        leftShoulder_score=pose_data['leftShoulder_score'],
        rightShoulder_score=pose_data['rightShoulder_score'],
        leftElbow_score=pose_data['leftElbow_score'],
        rightElbow_score=pose_data['rightElbow_score'],
        leftWrist_score=pose_data['leftWrist_score'],
        rightWrist_score=pose_data['rightWrist_score'],
        leftHip_score=pose_data['leftHip_score'],
        rightHip_score=pose_data['rightHip_score'],
        leftKnee_score=pose_data['leftKnee_score'],
        rightKnee_score=pose_data['rightKnee_score'],
        leftAnkle_score=pose_data['leftAnkle_score'],
        rightAnkle_score=pose_data['rightAnkle_score']
    )
    db.session.add(pose)
    db.session.commit()

    return {'message': 'Pose saved successfully'}, 201
