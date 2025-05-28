import { auth0 } from '@/lib/auth0';
import { redirect } from "next/navigation";

export const useAccessToken = async () => {

    const session = await auth0.getSession();
    if (!session?.user) {
        redirect(`/auth/login`);
    }
    const accessToken = session.tokenSet.accessToken;
    return accessToken

}