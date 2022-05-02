FROM nginx:alpine
# A container deployed in Kubernetes for a single HTML file is totally not overkill. 
COPY ./index.html /usr/share/nginx/html
EXPOSE 80