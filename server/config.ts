export const PORT: number = parseInt(process.env.PORT as string, 10);

export const DB_NAME: string  = process.env.DB_NAME as string;
export const DB_PASSWORD: string = process.env.DB_PASSWORD as string;
export const DB_SSL: boolean = process.env.DB_SSL === 'true';
export const DB_USERNAME: string = process.env.DB_USERNAME as string;
export const DB_HOST: string = process.env.DB_HOST as string;
export const DB_PORT: number = parseInt(process.env.DB_PORT as string, 10);
