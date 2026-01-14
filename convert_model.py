
import onnx
from onnx import version_converter
import os

model_path = os.path.join("backend", "app", "ml_models", "emotion-ferplus-8.onnx")
output_path = os.path.join("backend", "app", "ml_models", "emotion-ferplus-12.onnx")

print(f"Loading input model: {model_path}")
try:
    model = onnx.load(model_path)
    print("Model loaded successfully. Converting to Opset 12...")
    converted_model = version_converter.convert_version(model, 12)
    onnx.save(converted_model, output_path)
    print(f"Success! Saved to {output_path}")
except Exception as e:
    print(f"Conversion failed: {e}")
