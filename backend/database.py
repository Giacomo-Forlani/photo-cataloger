from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

class Pose(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(500), unique=True, nullable=False)
    nose_score = db.Column(db.Float, nullable=False)
    leftEye_score = db.Column(db.Float, nullable=False)
    rightEye_score = db.Column(db.Float, nullable=False)
    leftEar_score = db.Column(db.Float, nullable=False)
    rightEar_score = db.Column(db.Float, nullable=False)
    leftShoulder_score = db.Column(db.Float, nullable=False)
    rightShoulder_score = db.Column(db.Float, nullable=False)
    leftElbow_score = db.Column(db.Float, nullable=False)
    rightElbow_score = db.Column(db.Float, nullable=False)
    leftWrist_score = db.Column(db.Float, nullable=False)
    rightWrist_score = db.Column(db.Float, nullable=False)
    leftHip_score = db.Column(db.Float, nullable=False)
    rightHip_score = db.Column(db.Float, nullable=False)
    leftKnee_score = db.Column(db.Float, nullable=False)
    rightKnee_score = db.Column(db.Float, nullable=False)
    leftAnkle_score = db.Column(db.Float, nullable=False)
    rightAnkle_score = db.Column(db.Float, nullable=False)
