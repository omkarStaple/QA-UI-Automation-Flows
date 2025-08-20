# Environment Configuration Guide

This project uses environment variables to manage different testing environments and credentials.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your actual credentials for each environment:
   - Environment 1: app.staple.io
   - Environment 2: us.staple.io  
   - Environment 3: eu.staple.io
   - Environment 4: dash.stapleai.cn

3. Set the `CURRENT_ENV` variable to the environment you want to use (1, 2, 3, or 4).

## Usage

### Method 1: Using CURRENT_ENV (Recommended)
Simply set `CURRENT_ENV=2` in your `.env` file to use Environment 2, then run your tests normally:
```bash
npx playwright test
```

### Method 2: Programmatic Environment Selection
You can also specify the environment directly in your test code:
```typescript
import { getEnv1, getEnv2, getEnv3, getEnv4 } from '../utils/environment';

// Use specific environment
const env = getEnv2(); // This will use Environment 2 regardless of CURRENT_ENV
```

### Method 3: Runtime Environment Selection
You can pass the environment number as a parameter:
```typescript
import { getEnvironment } from '../utils/environment';

// Use environment 3
const env = getEnvironment('3');
```

## Environment Variables Structure

Each environment has three variables:
- `URL_SITE_X`: The login URL for environment X
- `USERNAME_X`: The username for environment X  
- `PASSWORD_X`: The password for environment X

Where X is 1, 2, 3, or 4.

## Security

- The `.env` file is already added to `.gitignore` to prevent accidentally committing credentials
- Never commit the `.env` file to version control
- Use `.env.example` as a template for other team members
