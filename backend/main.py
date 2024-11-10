from fastapi import FastAPI, UploadFile
from pymongo import MongoClient
import json
import os

app = FastAPI()


@app.on_event("startup")
async def startup_event():
    with open(".env") as f:
        secrets = json.load(f)
        mongo_cnx_string = secrets["MONGO_CNX_STRING"]
        app.client = MongoClient(mongo_cnx_string)
        app.db = app.client["PosePal"]


# Define the directory where files will be saved
UPLOAD_DIR = "uploads"

# Ensure the upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    # Define the full path where the file will be saved
    file_location = os.path.join(UPLOAD_DIR, file.filename)

    # Read and write the file to the local drive
    with open(file_location, "wb") as f:
        f.write(await file.read())

    return {"filename": file.filename, "location": file_location}
