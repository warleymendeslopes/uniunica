"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
interface Props {
    codSite: string;
}

export const SetAgencyParam = ({ codSite }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!codSite) return;
        const currentParam = searchParams.get("agencyPartner");
        if (currentParam !== codSite) {
            const url = new URL(window.location.href);
            url.searchParams.set("agencyPartner", codSite);
            router.replace(url.toString());
        }
    }, [codSite, router, searchParams]);

    return null;
};
