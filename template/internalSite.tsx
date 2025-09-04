'use client'
import {ReactNode} from "react";
import AppHeader from "@/components/header/page";
import FooterSiteUniUnica from "@/components/footer/page";

export default function InternalSite({children}: {children :ReactNode}){
    return(
        <>
            <AppHeader />
            {children}
            <FooterSiteUniUnica />
        </>
    )
}