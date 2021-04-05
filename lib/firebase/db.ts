import * as admin from 'firebase-admin'
import getConfig from 'next/config'

const {
  serverRuntimeConfig: { firebaseAdminConfig },
} = getConfig()

const initialized = admin.apps.length > 0

if (!initialized) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
  })
}
export const db = admin.firestore()
