from flask import Flask, request, jsonify
import os
import subprocess

app = Flask(__name__)

UPLOAD_FOLDER = '../BasketApp/assets/Videos'
VIDEO_FILENAME = 'uploaded_video.MOV'
SUMMARY_FILE = 'summary.txt'

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video uploaded'}), 400

    video = request.files['video']
    save_path = os.path.join(UPLOAD_FOLDER, VIDEO_FILENAME)
    video.save(save_path)

    # Wait for file to be fully written
    import time
    wait_time = 0
    while not os.path.exists(save_path) or os.path.getsize(save_path) == 0:
        time.sleep(0.2)
        wait_time += 0.2
        if wait_time > 5:
            return jsonify({'error': 'Video did not save properly'}), 500

    # Run pipeline
    try:
        result = subprocess.run(['python', '../yolov5/run_pipeline.py'], capture_output=True, text=True)
        print("STDOUT:\n", result.stdout)
        print("STDERR:\n", result.stderr)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Read summary score
    try:
        with open("summary.txt", "r") as f:
            score = int(f.read().strip())
    except:
        score = 0

    # Clean up files
    try:
        if os.path.exists(save_path):
            os.remove(save_path)
        if os.path.exists("summary.txt"):
            os.remove("summary.txt")
    except Exception as cleanup_error:
        print("Cleanup error:", cleanup_error)

    return jsonify({'message': 'Video processed', 'score': score})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
