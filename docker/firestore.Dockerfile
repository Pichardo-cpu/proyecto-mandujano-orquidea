# Firebase Emulator Suite: Firestore + Auth + Storage. Java 21 requerido.
FROM node:22-alpine
RUN apk add --no-cache openjdk21-jre-headless \
 && npm install --global firebase-tools@14.22.0
WORKDIR /firebase
COPY docker/firebase.json ./firebase.json
COPY firestore.rules storage.rules ./
COPY docker/start-firestore.sh ./start-firestore.sh
RUN chmod +x start-firestore.sh && firebase setup:emulators:firestore
EXPOSE 8080 9099 9199
CMD ["sh", "./start-firestore.sh"]
