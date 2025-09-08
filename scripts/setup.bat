@echo off
echo 🌤️  Setting up Weather GT...

echo 📦 Installing dependencies...
npm install

echo 📁 Creating public directory...
if not exist public mkdir public

echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Run 'npm run dev' to start development server
echo 2. Install shadcn/ui components as needed
echo 3. Start building your weather components!
echo 4. Add PWA features later in development
echo.
echo 🚀 Happy coding!
pause
