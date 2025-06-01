# Build stage 
FROM node:16-alpine as build 

# Set working directory 
WORKDIR /app 

# Add package files 
COPY package*.json ./ 

# Install dependencies 
RUN npm ci 

# Copy source files 
COPY . . 

# Build application 
RUN npm run build 

# Production stage 
FROM nginx:alpine 

# Copy build files 
COPY --from=build /app/build /usr/share/nginx/html 

# Copy nginx configuration 
COPY nginx.conf /etc/nginx/conf.d/default.conf 

# Expose port 
EXPOSE 80 

# Health check 
HEALTHCHECK --interval=30s --timeout=3s \ 
  CMD wget -qO- http://localhost/ || exit 1 

# Start nginx 
CMD ["nginx", "-g", "daemon off;"] 
