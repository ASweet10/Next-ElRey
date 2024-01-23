Run dev server: npm run dev
-http://localhost:3000

Edit page by modifying `app/page.tsx`

Transparent images: HiClipArt.com

Add new route
-create new folder with page.js inside
--Use endpoint as folder name (i.e. localhost:3000/register, folder Register)
-Same for Subdirectories (/api/user is api folder with user folder inside that)

#Next.js Pros
##-Can build sites to generate statically (no server required)
##-Comes with TypeScript integrated; everything set up & ready to go
-Images are optimized to load faster and with better performance
Server-side rendering (Pros)
--App's ability to display web page on server instead of rendering in browser
--JS rendered on server, then fully rendered page sent to client
--Makes pages load faster, improves UX
--Search Engines can easily index content because it's rendered before page is loaded; ideal for SEO
--Helps to efficiently load pages for users with slow internet / old devices

Next.js Cons
-Not flexible in terms of routing; Good for simple apps but difficult if many routes needed
-Next.js is harder to learn than React
Server-side rendering (Cons)
--Can be costly & resource intensive; Not default for websites & server has to render all content
--Rendering static HTML is efficient; rendering bigger apps server-side can increase load times because of CPU bottleneck
--

Next.js Use cases vs. React
-
-

Steps to add Google credentials authentication
Documentation: next-auth.js.org/providers/google

1. Create new app at https://console.cloud.google.com/
2. Search for oauth consent screen, click External & Create
3. Enter app name & emails; Continue
4. Go to Credentials tab; Add OAuth Client ID; App type: Web application
5. Add http://localhost:3000/api/auth/callback/google to authorized redirect URIs
5b. Change this to {productionURL}/api/auth/callback/url for production server
6. Find ID & Secret in credentials tab; Add secret to .env
6b. GOOGLE_CLIENT_ID = ""
6c. GOOGLE_CLIENT_SECRET = ""
7. Add Google Provider to NextAuth handler in route.js

Steps skipped in tutorial
1. At 2:39:00, Dawid mentions login problems and adds mongodb-adapter from next-auth; Both credential & Google logins working so skipped to
