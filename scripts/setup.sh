#!/bin/bash

# Weather GT Setup Script
echo "🌤️  Setting up Weather GT..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create public directory for assets
echo "📁 Creating public directory..."
mkdir -p public

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start development server"
echo "2. Install shadcn/ui components as needed"
echo "3. Start building your weather components!"
echo "4. Add PWA features later in development"
echo ""
echo "🚀 Happy coding!"
