
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, memoryLocalCache, CACHE_SIZE_UNLIMITED, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA3Z0k6Gs5jDQ60XRteI0YJLaOHCcSnIf4",
    authDomain: "inversionesmaryluis2019.firebaseapp.com",
    projectId: "inversionesmaryluis2019",
    storageBucket: "inversionesmaryluis2019.appspot.com",
    messagingSenderId: "785193017989",
    appId: "1:785193017989:web:c9c3ee86c9ef3c07873fec",
    measurementId: "G-T0YTSDPFRS"
};

const app = initializeApp(firebaseConfig);
initializeFirestore(app, {localCache: memoryLocalCache()})
export const db = getFirestore(app)