import * as functions from 'firebase-functions';
import app from './services/api'

export const api = functions.region("asia-northeast1").https.onRequest(app)