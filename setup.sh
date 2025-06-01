#!/bin/bash 

# Print colored output 
print_style() { 
    if [ "$2" == "info" ] ; then 
        COLOR="96m" 
    elif [ "$2" == "success" ] ; then 
        COLOR="92m" 
    elif [ "$2" == "warning" ] ; then 
        COLOR="93m" 
    elif [ "$2" == "error" ] ; then 
        COLOR="91m" 
    else 
        COLOR="0m" 
    fi 
    echo -e "\033[${COLOR}$1\033[0m" 
} 

# Check if Node.js is installed 
print_style "Checking Node.js installation..." "info" 
if ! command -v node &> /dev/null; then 
    print_style "Node.js is not installed. Please install Node.js first." "error" 
    exit 1 
fi 

# Check Node.js version 
NODE_VERSION=$(node -v | cut -d'v' -f2) 
if (( ${NODE_VERSION%%.*} < 16 )); then 
    print_style "Node.js version 16 or higher is required." "error" 
    exit 1 
fi 

# Install dependencies 
print_style "Installing dependencies..." "info" 
npm install 

if [ $? -eq 0 ]; then 
    print_style "Dependencies installed successfully!" "success" 
else 
    print_style "Failed to install dependencies." "error" 
    exit 1 
fi 

# Setup git hooks 
print_style "Setting up git hooks..." "info" 
npx husky install 

if [ $? -eq 0 ]; then 
    print_style "Git hooks setup completed!" "success" 
else 
    print_style "Failed to setup git hooks." "warning" 
fi 

# Run type check 
print_style "Running type check..." "info" 
npm run type-check 

if [ $? -eq 0 ]; then 
    print_style "Type check passed!" "success" 
else 
    print_style "Type check failed. Please fix type errors." "error" 
    exit 1 
fi 

# Run tests 
print_style "Running tests..." "info" 
npm test -- --watchAll=false 

if [ $? -eq 0 ]; then 
    print_style "All tests passed!" "success" 
else 
    print_style "Tests failed. Please fix failing tests." "error" 
    exit 1 
fi 

print_style "Project setup completed successfully! 🎉" "success" 
print_style "Run 'npm start' to start the development server." "info" 
