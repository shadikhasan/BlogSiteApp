# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /frontend

# Copy frontend dependencies
COPY ./frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend project files
COPY ./frontend ./

# Build frontend assets
RUN npm run build

# Stage 2: Setup Django backend
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory for backend
WORKDIR /app

# Install backend dependencies
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy backend project files
COPY ./backend ./

# Copy built frontend assets to backend static folder
COPY --from=frontend-build /frontend/build ./static/

# Expose backend port
EXPOSE 8000

# Run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
