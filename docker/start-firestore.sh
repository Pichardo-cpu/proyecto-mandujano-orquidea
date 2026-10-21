#!/bin/sh
set -eu
# Se importa el respaldo si existe. Al detener limpiamente, se exporta al volumen.
mkdir -p /data
if [ -f /data/firebase-export-metadata.json ]; then
  exec firebase emulators:start --only firestore,auth,storage --project "${FIREBASE_PROJECT_ID:-demo-refricaz}" --import=/data --export-on-exit=/data
fi
exec firebase emulators:start --only firestore,auth,storage --project "${FIREBASE_PROJECT_ID:-demo-refricaz}" --export-on-exit=/data
