
echo "Building the Docker image..."
docker build -t vue-frontend ./

echo "Running the Docker container (Development mode)..."
docker run -d -p 5173:5173 --name vue-frontend-container vue-frontend

echo "Container is running. Access your app at http://localhost:5173"
docker logs -f vue-frontend-container



