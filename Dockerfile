# Stage 1: Django Backend
FROM python:3.10-slim AS backend

# Install dependencies
RUN apt-get update && apt-get install -y gcc libpq-dev

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app/backend

# Copy requirements and install
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy project files to the working directory
COPY backend/ ./

# Stage 2: React Frontend
FROM node:20-alpine AS frontend

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY frontend/ ./

# Final Stage: Combine Backend and Frontend
FROM python:3.10-slim

# Install PostgreSQL and Supervisor
RUN apt-get update && apt-get install -y supervisor postgresql postgresql-contrib

# Create necessary directories
RUN mkdir -p /var/lib/postgresql/data && chown postgres:postgres /var/lib/postgresql/data

# Copy the backend and frontend from previous stages
COPY --from=backend /app/backend /app/backend
COPY --from=frontend /app/frontend /app/frontend

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 7000
EXPOSE 8000
EXPOSE 6000

# Start Supervisor
CMD ["/usr/bin/supervisord"]
