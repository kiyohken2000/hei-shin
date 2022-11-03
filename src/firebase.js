import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { firebaseConfig } from './key';

const app = initializeApp(firebaseConfig);
const firestore = initializeFirestore(app, {useFetchStreams: false, experimentalForceLongPolling:true})

//const firestore = getFirestore(app);

export { firestore }