# Stripe Backend
1. stripe login
2. stripe listen --forward-to localhost:3000/api/webhook
3. Test card: 4242 4242 4242 4242

# Google credentials authentication (next-auth.js.org/providers/google)
1. Create new app https://console.cloud.google.com/; Search oauth consent; Click External & Create
2. Enter name & emails; Continue; Credentials tab: Add OAuth Client ID; App Type: Web app
3. Add http://localhost:3000/api/auth/callback/google to authorized redirect URIs
4. Change to {productionURL}/api/auth/callback/url for production server
5. Credentials tab: ID & Secret; Add these to .env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
6. Add Google Provider to NextAuth handler in route.js