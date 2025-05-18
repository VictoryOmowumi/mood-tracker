import { User } from 'firebase/auth'

declare global {
  interface Window {
    _firebaseApp?: firebase.app.App
  }
}

declare module 'firebase/auth' {
  interface User {
    // Add any custom user properties here
    customProperty?: string
  }
}