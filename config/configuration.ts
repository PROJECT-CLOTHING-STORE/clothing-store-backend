export default () => ({
    NODE_ENV: process.env.NODE_ENV || 'development',
    database: {
        url:
            process.env.DATABASE_URL ||
            'postgresql://postgres:postgres@localhost:5432/clothing_store?schema=public',
    },
});
