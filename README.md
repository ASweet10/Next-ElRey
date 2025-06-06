# El Rey restaurant site
## Tech
- Next.js
- Tailwind CSS
- Express/Node.js
- MongoDB
- Stripe checkout
- Google credentials signup
- Context API for cart/orders
- Custom admin panel for owners

## Demo
[El Rey](https://next-js-food-order-el-rey.vercel.app)

## Notes
### Stripe backend:
- stripe login
- stripe listen --forward-to localhost:3000/api/webhook
- Test card: 4242 4242 4242 4242

### Google credentials authentication
- next-auth.js.org/providers/google
- Create app https://console.cloud.google.com/; Search oauth consent; Click External & Create
- Enter name & emails; Continue; Credentials tab: Add OAuth Client ID; App Type: Web app
- Add http://localhost:3000/api/auth/callback/google to authorized redirect URIs
- Change to {productionURL}/api/auth/callback/url for production server
- Credentials tab: ID & Secret; Add these to .env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
- Add Google Provider to NextAuth handler in route.js
