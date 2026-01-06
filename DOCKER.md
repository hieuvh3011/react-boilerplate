# Docker Setup Guide

This project includes Docker configuration for both development and production environments.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

## Quick Start

### Development Mode

```bash
# Build and start development container
docker-compose up dev

# Or run in detached mode
docker-compose up -d dev

# View logs
docker-compose logs -f dev

# Stop container
docker-compose down
```

The app will be available at `http://localhost:3000` with hot reload enabled.

### Production Mode

```bash
# Build and start production container
docker-compose up prod

# Or run in detached mode
docker-compose up -d prod

# Stop container
docker-compose down
```

The app will be available at `http://localhost:80`.

## Docker Commands

### Build Images

```bash
# Build development image
docker build -t react-boilerplate:dev .

# Build production image
docker build -f Dockerfile.prod -t react-boilerplate:prod .
```

### Run Containers

```bash
# Run development container
docker run -p 3000:3000 -v $(pwd)/src:/app/src react-boilerplate:dev

# Run production container
docker run -p 80:80 react-boilerplate:prod
```

### Manage Containers

```bash
# List running containers
docker ps

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# Remove image
docker rmi react-boilerplate:dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

For production, update accordingly:

```env
VITE_API_URL=https://api.yourapp.com
VITE_ENV=production
```

## Docker Compose Services

### Development Service (`dev`)
- **Port**: 3000
- **Hot Reload**: Enabled via volume mounts
- **Node Version**: 20 (Alpine)
- **Use Case**: Local development

### Production Service (`prod`)
- **Port**: 80
- **Web Server**: Nginx
- **Optimized**: Multi-stage build
- **Use Case**: Production deployment

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Permission Issues

```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Or run with sudo
sudo docker-compose up dev
```

### Clear Cache and Rebuild

```bash
# Remove all containers and images
docker-compose down --rmi all

# Rebuild without cache
docker-compose build --no-cache

# Start fresh
docker-compose up dev
```

### Node Modules Issues

```bash
# Remove node_modules and reinstall inside container
docker-compose run dev rm -rf node_modules
docker-compose run dev npm install --legacy-peer-deps
```

## Production Deployment

### Deploy to Cloud

#### Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag react-boilerplate:prod yourusername/react-boilerplate:latest

# Push to Docker Hub
docker push yourusername/react-boilerplate:latest
```

#### AWS ECR

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag react-boilerplate:prod <account-id>.dkr.ecr.us-east-1.amazonaws.com/react-boilerplate:latest

# Push to ECR
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/react-boilerplate:latest
```

### Deploy to Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-boilerplate
spec:
  replicas: 3
  selector:
    matchLabels:
      app: react-boilerplate
  template:
    metadata:
      labels:
        app: react-boilerplate
    spec:
      containers:
      - name: react-boilerplate
        image: yourusername/react-boilerplate:latest
        ports:
        - containerPort: 80
```

## Best Practices

1. **Use .dockerignore**: Exclude unnecessary files from build
2. **Multi-stage builds**: Keep production images small
3. **Layer caching**: Order Dockerfile commands for optimal caching
4. **Security**: Don't include secrets in images
5. **Health checks**: Add health check endpoints
6. **Logging**: Use proper logging for debugging

## Performance Tips

1. **Use Alpine images**: Smaller image size
2. **Minimize layers**: Combine RUN commands
3. **Use .dockerignore**: Faster builds
4. **Cache dependencies**: Copy package.json before source code
5. **Optimize nginx**: Enable gzip and caching

## Monitoring

### Check Container Health

```bash
# View container stats
docker stats

# Check logs
docker-compose logs -f dev

# Execute commands in container
docker-compose exec dev sh
```

### Nginx Access Logs

```bash
# View nginx logs in production container
docker-compose exec prod tail -f /var/log/nginx/access.log
```

---

**Need help?** Check the [main README](README.md) or [open an issue](https://github.com/yourusername/react-typescript-boilerplate/issues).
