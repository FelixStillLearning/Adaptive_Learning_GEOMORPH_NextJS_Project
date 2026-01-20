
#!/bin/bash

# Start Backend
echo "Starting Backend..."
cd backend
# Create virtual environment if not exists
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt
python main.py &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting Frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo "Project is running!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"

# Cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

wait
