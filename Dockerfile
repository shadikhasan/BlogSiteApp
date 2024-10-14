# Stage 1: Django Backend
FROM python:3.10-slim AS backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /backend

# Install dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy project files to the working directory
COPY backend/ ./

# Stage 2: React Frontend
FROM node:20-alpine AS frontend

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY frontend/ ./

# Final Stage: Expose ports for both apps
EXPOSE 8000
EXPOSE 5173

# Start the applications
CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:8000 & npm run dev"]
