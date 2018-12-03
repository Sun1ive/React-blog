export const PORT: number = parseInt(process.env.PORT as string, 10);

export const DB_NAME: string | undefined = process.env.DB_NAME;
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
export const DB_SSL: boolean = process.env.DB_SSL === 'true';
export const DB_USERNAME: string | undefined = process.env.DB_USERNAME;
export const DB_HOST: string | undefined = process.env.DB_HOST;
export const DB_PORT: number = parseInt(process.env.DB_PORT as string, 10);
