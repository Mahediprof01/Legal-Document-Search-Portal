#!/bin/bash

echo "======================================"
echo "Legal Document Search Portal - Setup"
echo "======================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "Docker is running"
echo ""

# Build and start services
echo "Building and starting services..."
echo ""

docker-compose up --build

# If user stops with Ctrl+C, clean up
trap 'echo ""; echo "Stopping services..."; docker-compose down; exit' INT

echo ""
echo "Setup complete!"
echo ""
echo "Access the application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the services."
