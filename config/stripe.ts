export const PLANS = [
    {
        name: "Free",
        slug: "free",
        quota: 10,
        pagesPerPdf: 5,
        maxSizeInMB: 4,
        price: {
            amount: 0,
            priceIds: {
                test: "",
                production: "",
            }
        }
    },
    {
        name: "Pro",
        slug: "pro",
        quota: 50,
        pagesPerPdf: 25,
        maxSizeInMB: 16,
        price: {
            amount: 99,
            priceIds: {
                test: "price_1OkyVQSHh03cByZFTXiUMrHJ",
                production: "",
            }
        }
    }
]

export const getPlanConfig = (plan: string) => {
    return PLANS.find((p) => p.slug === plan)!
}