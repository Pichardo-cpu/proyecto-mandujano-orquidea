
"use strict";

const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

let db = null;

if (getApps().length === 0) {
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || "demo-refricaz"
    });
    db = getFirestore();
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT
    );

    initializeApp({
      credential: cert(serviceAccount)
    });
    db = getFirestore();
  } else {
    console.warn("Firebase no configurado. Funciones de Firestore no disponibles.");
  }
} else {
  db = getFirestore();
}

module.exports = db;
