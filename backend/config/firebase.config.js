"use strict";
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

if (getApps().length === 0) {
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    // El SDK Admin usa Firestore local sin credenciales reales.
    initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID || "demo-refricaz" });
  } else {
    // El despliegue normal mantiene su mecanismo original.
    // Nunca se sube el JSON privado al repositorio.
    const serviceAccount = require("./firebase-service-account.json");
    initializeApp({ credential: cert(serviceAccount) });
  }
}
module.exports = getFirestore();
