Stripe (Backend terminal)
1. stripe login
2. stripe listen --forward-to localhost:3000/api/webhook
3. Test card: 4242 4242 4242 4242

Next.js Pros
1. Static website generation (no server required)
2. Automatic TypeScript integration
3. Images optimized; faster loading & better performance
4. Server-side rendering: App can display page on server instead of rendering in browser
5. JS rendered server-side; fully-rendered page sent to client; Faster loading, better UX
6. Ideal for SEO; Search Engines easily index content because it's rendered before page is loaded
7. Efficiently loads pages for users with slow internet / old devices

Next.js Cons
1. Routing inflexible; Good for simple apps but difficult if many routes needed
2. Smaller dev community than react; less support
3. Server-side rendering: Costly & resource intensive; Server has to render all content
4. Rendering static HTML is efficient; Bigger apps can increase load times because of CPU bottleneck


NextJS new route
1. Create new folder in app directory; page.js inside
2. Endpoint is folder name (localhost:3000/register = register folder)
3. /api/users is api folder with users subdirectory

Google credentials authentication (next-auth.js.org/providers/google)

1. Create new app https://console.cloud.google.com/; Search oauth consent; Click External & Create
2. Enter name & emails; Continue; Credentials tab: Add OAuth Client ID; App Type: Web app
3. Add http://localhost:3000/api/auth/callback/google to authorized redirect URIs
4. Change to {productionURL}/api/auth/callback/url for production server
5. Credentials tab: ID & Secret; Add these to .env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
6. Add Google Provider to NextAuth handler in route.js