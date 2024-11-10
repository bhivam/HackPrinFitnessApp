import numpy as np
import tensorflow as tf
from utils import *
from model import *


import sys
import os

def open_video(file_path):
    """Opens the video file using the default system player."""

    if sys.platform == "win32":
        os.startfile(file_path)
    else:
        os.system(f"open {file_path}")







if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide the video file path as an argument.")
    else:
        video_file = sys.argv[1]
        key_points = detect_pose_sequence(video_file)
        
        for i in range(key_points.shape[0]):
            ret_message_dwd(key_points[i])
            
        
        