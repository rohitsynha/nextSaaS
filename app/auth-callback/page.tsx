"use client"

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { trpc } from "../_trpc/client";

const AuthCallback = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const origin = searchParams.get("origin");

    const { isSuccess } = trpc.authCallback.useQuery(undefined, {
        retry: (failureCount, error) => {
            if (failureCount > 5) {
                return false;
            }
            if (error.data?.code === "UNAUTHORIZED") {
                router.push("/sign-in");
                return false;
            }
            return true;
        },
        retryDelay: 500,
    })

    if (isSuccess) {
        router.push(origin ? `/${origin}` : '/dashboard')
    }

    return (
        <div className='w-full mt-24 flex justify-center'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
            <h3 className='font-semibold text-xl'>
              Setting up your account...
            </h3>
            <p>You will be redirected automatically.</p>
          </div>
        </div>
      )
}

const Page = () => {
    return (
        <Suspense>
            <AuthCallback />
        </Suspense>
    )
}

export default Page;