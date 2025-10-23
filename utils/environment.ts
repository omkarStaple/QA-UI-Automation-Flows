import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export interface Environment {
    url: string;
    username: string;
    password: string;
    id: string;
    name: string;
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

    // Map environment names
    const envNames: { [key: string]: string } = {
        '1': 'app.staple.io',
        '2': 'us.staple.io', 
        '3': 'eu.staple.io',
        '4': 'dash.stapleai.cn'
    };

    return {
        url,
        username,
        password,
        id: currentEnv,
        name: envNames[currentEnv] || `Environment ${currentEnv}`
    };
}

// Get all available environments
export function getAllEnvironments(): Environment[] {
    const environments: Environment[] = [];
    
    for (let i = 1; i <= 4; i++) {
        try {
            const env = getEnvironment(i.toString());
            environments.push(env);
        } catch (error) {
            console.warn(`Skipping environment ${i}: ${error}`);
        }
    }
    
    return environments;
}

// Export individual environment getters for convenience
export const getEnv1 = () => getEnvironment('1');
export const getEnv2 = () => getEnvironment('2');
export const getEnv3 = () => getEnvironment('3');
export const getEnv4 = () => getEnvironment('4');

// Environment iterator for testing all environments
export async function* iterateEnvironments(): AsyncGenerator<Environment> {
    const environments = getAllEnvironments();
    for (const env of environments) {
        yield env;
    }
}
