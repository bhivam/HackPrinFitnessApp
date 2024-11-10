import numpy as np
import tensorflow as tf
import numpy as np
import json
KEYPOINT_DICT = {
    'nose': 0,
    'left_eye': 1,
    'right_eye': 2,
    'left_ear': 3,
    'right_ear': 4,
    'left_shoulder': 5,
    'right_shoulder': 6,
    'left_elbow': 7,
    'right_elbow': 8,
    'left_wrist': 9,
    'right_wrist': 10,
    'left_hip': 11,
    'right_hip': 12,
    'left_knee': 13,
    'right_knee': 14,
    'left_ankle': 15,
    'right_ankle': 16
}


def angle(A,B):
    return np.degrees(np.arccos((A@B.T)/(tf.norm(A)*tf.norm(B))))

def ret_message_dwd(tensor):
    hip_angle_mean = 72.2092514038086
    hip_angel_std = 19.020007748505865
    hip_knee_angle_mean = 53.25288009643555
    hip_knee_angle_std = 9.459600906739375
    shoulder_hip_angle_mean = 53.25288009643555
    shoulder_hip_angle_std = 9.459600906739375
    elbow_angle_mean=121.30525207519531
    elbow_angle_std=33.23693158728679
    knees_angle_mean=143.659912109375
    knees_angle_std=24.6822233432572
    
    temp = tensor.squeeze(0) #=> 17x3
    #need to check all angle types
    if isleft(temp):
        
        hip_coordinate = temp[KEYPOINT_DICT["left_hip"]]

        knee_coordinate = temp[KEYPOINT_DICT["left_knee"]]

        shoulder_coordinate = temp[KEYPOINT_DICT["left_shoulder"]]
        
        hand_coordinate = temp[KEYPOINT_DICT["left_wrist"]]
        
        elbow_coordinate = temp[KEYPOINT_DICT["left_elbow"]]
        
        ankle_coordinate = temp[KEYPOINT_DICT["left_ankle"]]

        
    else:
        
        hip_coordinate = temp[KEYPOINT_DICT["right_hip"]]

        knee_coordinate = temp[KEYPOINT_DICT["right_knee"]]

        shoulder_coordinate = temp[KEYPOINT_DICT["right_shoulder"]]
        
        hand_coordinate = temp[KEYPOINT_DICT["right_wrist"]]
        
        elbow_coordinate = temp[KEYPOINT_DICT["right_elbow"]]
        
        ankle_coordinate = temp[KEYPOINT_DICT["right_ankle"]]

        

    knee_hip_vector = knee_coordinate - hip_coordinate
    shoulder_hip_vector = shoulder_coordinate - hip_coordinate
    shoulder_knees_angle = angle(knee_hip_vector,shoulder_hip_vector)
    if shoulder_knees_angle > hip_angle_mean + hip_angel_std:
        print("err")
    hip_shoulder_vector = - shoulder_hip_vector
    knees_shoulder_vector = knee_coordinate - shoulder_coordinate
    hip_knees_angel = angle(hip_shoulder_vector,knees_shoulder_vector)
    if hip_knees_angel > hip_angel_std + hip_angle_mean:
        print("err")
    shoulder_knees_vector = -knees_shoulder_vector
    hip_knees_vector = -knee_hip_vector
    hip_shoulder_angle = angle(hip_knees_vector,shoulder_knees_vector)
    if hip_shoulder_angle > hip_knee_angle_mean + hip_knee_angle_std:
        print("err")
    hand_elbow_vector = hand_coordinate - elbow_coordinate
    shoulder_elbow_vector = shoulder_coordinate - elbow_coordinate
    elbow_angle = angle(hand_elbow_vector,shoulder_elbow_vector)
    if elbow_angle < elbow_angle_mean - elbow_angle_std:
        print("err")
    
    ankle_knee_vector = ankle_coordinate - knee_coordinate
    knees_angle = angle(hip_knees_vector, ankle_knee_vector)
    if knees_angle < knees_angle_mean - knees_angle_std:
        print("yeah")
    
    
    
    
    
    
    
    
    