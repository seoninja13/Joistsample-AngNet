export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  firebase: {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-messaging-sender-id',
    appId: 'your-app-id'
  },
  stripe: {
    publishableKey: 'your-stripe-publishable-key'
  },
  googleDrive: {
    clientId: 'your-google-client-id'
  }
};