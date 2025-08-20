import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export interface Environment {
    url: string;
    username: string;
    password: string;
}

export function getEnvironment(envNumber?: string): Environment {
    // Use CURRENT_ENV from .env file if no specific environment is provided
    const currentEnv = envNumber || process.env.CURRENT_ENV || '1';
    
    const url = process.env[`URL_SITE_${currentEnv}`];
    const username = process.env[`USERNAME_${currentEnv}`];
    const password = process.env[`PASSWORD_${currentEnv}`];

    if (!url || !username || !password) {
        throw new Error(`Environment ${currentEnv} is not properly configured. Please check your .env file.`);
    }

    return {
        url,
        username,
        password
    };
}

// Export individual environment getters for convenience
export const getEnv1 = () => getEnvironment('1');
export const getEnv2 = () => getEnvironment('2');
export const getEnv3 = () => getEnvironment('3');
export const getEnv4 = () => getEnvironment('4');
