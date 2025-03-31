
echo "Building Docker image..."
docker build -t cat-api .


echo "Running Docker container..."
docker run -p 3000:3000 --env-file .env cat-api


echo "API is running on http://localhost:3000"
