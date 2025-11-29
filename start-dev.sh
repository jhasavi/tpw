#!/bin/bash

# The Purple Wings - Development Server Startup Script
# This script ensures the server starts on port 3000 and handles cleanup

echo "🦋 Starting The Purple Wings Development Server..."
echo "=================================================="

# Kill any existing process on port 3000
echo "🔍 Checking for existing processes on port 3000..."
PID=$(lsof -ti:3000)
if [ ! -z "$PID" ]; then
  echo "⚠️  Found process on port 3000 (PID: $PID)"
  echo "🛑 Stopping existing process..."
  kill -9 $PID 2>/dev/null
  sleep 1
  echo "✅ Port 3000 is now free"
else
  echo "✅ Port 3000 is available"
fi

# Clear Next.js cache for fresh start
echo ""
echo "🧹 Clearing Next.js cache..."
rm -rf .next
echo "✅ Cache cleared"

# Start the development server
echo ""
echo "🚀 Starting development server on http://localhost:3000"
echo "=================================================="
echo ""

# Export PORT environment variable
export PORT=3000

# Start Next.js dev server
npm run dev
