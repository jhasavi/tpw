#!/bin/bash

# Automated Vercel Environment Variables Setup
# This script sets all environment variables from .env.local to Vercel

echo "🚀 Setting up Vercel Environment Variables..."
echo "=============================================="

# Source the .env.local file
if [ ! -f .env.local ]; then
  echo "❌ Error: .env.local file not found!"
  exit 1
fi

# Link to Vercel project first
echo "🔗 Linking to Vercel project..."
vercel link --yes --project prj_sNIVpOwJsHQXzv6gAfSoF9le4eUy

echo ""
echo "📝 Setting environment variables..."
echo ""

# Function to set env var in Vercel
set_env_var() {
  local key=$1
  local value=$2
  echo "Setting: $key"
  echo "$value" | vercel env add "$key" production --force
}

# Read .env.local and set each variable
while IFS='=' read -r key value; do
  # Skip empty lines and comments
  [[ -z "$key" || "$key" =~ ^#.* ]] && continue
  
  # Remove leading/trailing whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)
  
  # Skip if key is empty
  [[ -z "$key" ]] && continue
  
  # Set the variable
  set_env_var "$key" "$value"
  
done < .env.local

echo ""
echo "✅ Environment variables setup complete!"
echo ""
echo "📋 Verify with: vercel env ls"
echo "🚀 Deploy with: vercel --prod"
