FROM nginx:alpine

# Supprime la config par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copie le front-end vers le serveur web
COPY . /usr/share/nginx/html

# Expose le port
EXPOSE 80

# Lancement automatique
CMD ["nginx", "-g", "daemon off;"]
