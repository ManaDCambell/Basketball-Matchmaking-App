import cv2
import os

# Load the video
video_path = "../BasketApp/assets/Videos/IMG_3221 (1).MOV"
cap = cv2.VideoCapture(video_path)

frame_rate = 30  # Extract 30 frames per second (adjust as needed)
frame_count = 0

# Create a folder to store frames
os.makedirs("frames", exist_ok=True)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    if frame_count % frame_rate == 0:  # Save every 30th frame
        frame_filename = f"frames/frame_{frame_count}.jpg"
        cv2.imwrite(frame_filename, frame)
    
    frame_count += 1

cap.release()
cv2.destroyAllWindows()
