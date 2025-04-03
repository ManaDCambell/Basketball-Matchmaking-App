from ultralytics import YOLO
import cv2
import os

# Load trained YOLOv5 model
model = YOLO("runs/train/exp4/weights/best.pt")  # Replace with your trained model file

# Process extracted frames
frame_folder = "frames"
for frame_file in os.listdir(frame_folder):
    frame_path = os.path.join(frame_folder, frame_file)
    
    # Run YOLO detection
    results = model(frame_path)
    
    # Display results (optional)
    for r in results:
        im_array = r.plot()  # Draw bounding boxes on the frame
        cv2.imshow("YOLOv5 Detection", im_array)
        cv2.waitKey(1)

cv2.destroyAllWindows()