// src/lib/config-loader.ts
export const loadConfig = (env: string) => {
    const base = {
        payment: {
            url: "https://sandbox.payment.com",
            key: "test_key"
        }
    };

    if (env === "production") {
        // BUG: This overwrites the whole object if we aren't careful, or maybe it's doing a shallow merge which is failing in some other way. 
        // Let's verify the bug is that it DOES overwrite, but maybe we want to only overwrite 'url' and keep other defaults?
        // Or let's say the bug is:
        const prod = {
            payment: {
                url: "https://api.payment.com"
            }
        };
        // If we use Object.assign, it replaces the 'payment' object entirely, losing 'key' if we didn't specify it in prod?
        // Or if we want to merge.
        return Object.assign({}, base, prod);
    }
    return base;
};
