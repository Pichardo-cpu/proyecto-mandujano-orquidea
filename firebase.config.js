const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

if (getApps().length === 0) {
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    // Modo Docker / clon limpio: emulador local de Firestore, sin credenciales.
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || "demo-refricaz"
    });
  } else {
    // Modo normal: llave real (NO está en Git).
    const serviceAccount = require("./firebase-service-account.json");

    initializeApp({
      credential: cert(serviceAccount)
    });
  }
}

const db = getFirestore();

module.exports = db;
