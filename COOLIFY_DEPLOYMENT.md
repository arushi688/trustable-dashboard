# Coolify Deployment Guide

This guide will help you deploy the Trustable UI application on Coolify.

## What is Coolify?

Coolify is a self-hosted platform that allows you to deploy applications, databases, and services with ease. It's an open-source alternative to Heroku, Netlify, and Vercel.

## Prerequisites

1. A running Coolify instance (self-hosted or cloud)
2. Git repository (GitHub, GitLab, or Gitea)
3. Your Trustable UI code pushed to the repository

## Deployment Options

### Option 1: Automatic Deployment (Recommended)

1. **Log into Coolify**
   - Navigate to your Coolify dashboard

2. **Create a New Project**
   - Click "New Project"
   - Give it a name (e.g., "Trustable UI")

3. **Add New Resource**
   - Click "Add Resource"
   - Select "Application"

4. **Connect Your Repository**
   - Choose your Git provider (GitHub, GitLab, etc.)
   - Select the repository containing this code
   - Choose the branch (usually `main` or `master`)

5. **Configure Build Settings**
   - **Build Pack:** Select "Dockerfile" or "Docker Compose"
   - **Port:** `3000`
   - **Dockerfile Location:** `./Dockerfile` (default)

6. **Environment Variables (Optional)**
   ```
   NODE_ENV=production
   PORT=3000
   ```

7. **Deploy!**
   - Click "Deploy"
   - Coolify will:
     - Clone your repository
     - Build the Docker image
     - Start the container
     - Set up SSL certificate (if domain is configured)
     - Provide a public URL

### Option 2: Manual Deployment via CLI

If you prefer using the command line:

```bash
# Build the image locally
docker build -t trustableui .

# Tag for your registry
docker tag trustableui your-registry.com/trustableui:latest

# Push to registry
docker push your-registry.com/trustableui:latest
```

Then in Coolify, use the "Docker Image" option and provide your registry URL.

## Configuration Details

### Port Configuration
- **Container Port:** 3000
- **Public Port:** Automatic (assigned by Coolify)

### Health Check
The Dockerfile includes an automatic health check that pings the server every 30 seconds.

### Domain Setup
1. In Coolify, go to your application settings
2. Click on "Domains"
3. Add your custom domain
4. Coolify will automatically set up SSL via Let's Encrypt

### Persistent Data
This application doesn't require persistent storage, but if you need to add volumes:
- Configuration files
- Custom assets
- Logs

Add volumes in Coolify's "Storages" section.

## Post-Deployment

### Verify Deployment
1. Check the deployment logs in Coolify
2. Visit your application URL
3. Test the QR code functionality
4. Verify PDF download works

### Monitoring
Coolify provides:
- Real-time logs
- Resource usage (CPU, Memory)
- Health check status
- Automatic restarts on failure

### Scaling
To handle more traffic:
1. Increase container resources in Coolify
2. Enable multiple replicas (if available in your Coolify version)
3. Use a load balancer for horizontal scaling

## Troubleshooting

### Container Won't Start
- Check logs in Coolify dashboard
- Verify port 3000 is exposed
- Ensure all environment variables are set correctly

### Build Fails
- Check if `package-lock.json` is committed
- Verify Dockerfile syntax
- Review build logs for specific errors

### Application Not Accessible
- Verify port mapping is correct (3000)
- Check firewall rules
- Ensure domain DNS is pointing to your server

### Health Check Failing
- Check if the application is responding on port 3000
- Review application logs
- Verify the health check endpoint

## Updates and Redeployment

### Automatic Deployment
If you've enabled webhooks:
1. Push changes to your repository
2. Coolify automatically detects changes
3. Rebuilds and redeploys

### Manual Redeployment
1. Go to your application in Coolify
2. Click "Restart" or "Redeploy"
3. Wait for the build to complete

## Performance Optimization

### Image Size
The Docker image is optimized using:
- Multi-stage builds
- Alpine Linux base image
- Production-only node_modules

### Runtime Performance
- Application runs as non-root user for security
- Health checks ensure reliability
- NODE_ENV set to production

## Security Considerations

1. **Environment Variables**
   - Never commit secrets to Git
   - Use Coolify's environment variable management

2. **SSL/HTTPS**
   - Coolify automatically provisions SSL certificates
   - Ensure your domain is properly configured

3. **Updates**
   - Keep dependencies updated
   - Regularly rebuild and redeploy
   - Monitor security advisories

## Support

### Coolify Documentation
- [Official Docs](https://coolify.io/docs)
- [Discord Community](https://coolify.io/discord)
- [GitHub Issues](https://github.com/coollabsio/coolify)

### Application Issues
- Check application logs in Coolify
- Review `README.md` for local development
- Verify all configuration files are correct

## Quick Reference

```bash
# Local Docker test (if Docker is installed)
docker build -t trustableui .
docker run -p 3000:3000 trustableui

# Docker Compose test
docker-compose up -d
docker-compose logs -f
docker-compose down

# Access logs
docker logs <container-id>
```

## Production Checklist

- [ ] Repository pushed to Git provider
- [ ] Coolify instance accessible
- [ ] Domain configured (optional)
- [ ] Environment variables set
- [ ] Dockerfile present in repository
- [ ] Port 3000 configured in Coolify
- [ ] Deploy and verify health check
- [ ] Test all features (QR codes, PDF download)
- [ ] SSL certificate active (if using domain)
- [ ] Monitoring enabled

---

**Note:** This application is production-ready and optimized for Coolify deployment. The Docker configuration includes health checks, security best practices, and automatic error handling.
