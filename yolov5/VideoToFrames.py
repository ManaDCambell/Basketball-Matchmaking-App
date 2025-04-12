import cv2
import os

# Load the video

video_path = "../BasketApp/assets/Videos/uploaded_video.MOV"

print("Reading video from:", os.path.abspath(video_path))

cap = cv2.VideoCapture(video_path)

# Adjust how often to save frames
frame_interval = 25  # Save every 25th frame (adjust as needed)
frame_count = 0
saved_count = 0

# Create folder for frames
os.makedirs("frames", exist_ok=True)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    if frame_count % frame_interval == 0:
        frame_filename = f"frames/frame_{saved_count}.jpg"
        cv2.imwrite(frame_filename, frame)
        saved_count += 1

    frame_count += 1

cap.release()
cv2.destroyAllWindows()

print(f"Frames saved: {saved_count}")
