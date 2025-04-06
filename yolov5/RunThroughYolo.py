import torch
import cv2
import os
from collections import defaultdict

# Absolute path to the yolov5 directory where hubconf.py is
yolov5_path = os.path.abspath(os.path.dirname(__file__))
best_model_path = os.path.join(yolov5_path, 'best.pt')

print("Loading YOLOv5 from:", yolov5_path)
print("Using model file:", best_model_path)

model = torch.hub.load(yolov5_path, 'custom', path=best_model_path, source='local')
names = model.names

# Folder with frames
frame_folder = "frames"
detection_summary = defaultdict(int)

# Process each frame
for frame_file in os.listdir(frame_folder):
    if not frame_file.lower().endswith(('.jpg', '.png')):
        continue

    frame_path = os.path.join(frame_folder, frame_file)
    results = model(frame_path)

    # print(f"\n[Frame: {frame_file}]")
    # results.print()

    for pred in results.pred:
        for *box, conf, cls in pred:
            class_name = names[int(cls)]
            detection_summary[class_name] += 1
            # print(f"Detected: {class_name} | Confidence: {conf:.2f}")

    results.render()
    for img in results.ims:
        img_bgr = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        cv2.imshow("YOLOv5 Detection", img_bgr)
        cv2.waitKey(1)

cv2.destroyAllWindows()

for class_name, count in detection_summary.items():
    if class_name == "RightScore":
        print(f"RightScore: {count} detections")

# Clear out the frames folder
for file in os.listdir(frame_folder):
    file_path = os.path.join(frame_folder, file)
    if os.path.isfile(file_path):
        os.remove(file_path)
        
print("========== Detection Summary ==========")
for class_name, count in detection_summary.items():
    if class_name == "RightScore":
        print(f"{class_name}: {count} detections")
        
score = detection_summary.get("RightScore", 0)
with open("summary.txt", "w") as f:
    f.write(str(score))

