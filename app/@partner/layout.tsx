'use client';

import {useEffect, useState} from 'react';
import {usePartner} from "@/context/PartnerContext";
import {Alert, Button} from "@heroui/react";
import {clearCookiesAndRedirect} from "@/utils/clearCookiesAndRedirect";
import AppHeader from "@/components/header/page";
import FooterSiteUniUnica from "@/components/footer/page";

export default function InternoLayout({children, }: {children: React.ReactNode;}) {
    const { partnerData, loading } = usePartner();
    const [isLocalhost, setIsLocalhost] = useState(false);

    useEffect(() => {
        if (!document.querySelector('script#hs-script-loader')) {
            const hsScript = document.createElement('script');
            hsScript.async = true;
            hsScript.defer = true;
            hsScript.id = 'hs-script-loader';
            hsScript.src = '//js.hs-scripts.com/47678762.js';
            document.head.appendChild(hsScript);
        }

        if (typeof window !== 'undefined') {
            setIsLocalhost(window.location.hostname === 'localhost');
        }
    }, []);

    return (
        <>
            <AppHeader />
            <div className="relative flex flex-col h-screen">
                <div className="fixed bottom-0 left-0 z-50 m-4">
                    {isLocalhost && (
                        <Alert
                            color="warning"
                            description={`do parceiro ${partnerData?.responsible.name}`}
                            endContent={
                                <Button color="warning" size="sm" variant="flat" onClick={clearCookiesAndRedirect}>
                                    Sair do site
                                </Button>
                            }
                            title="Você está navegando no site"
                            variant="faded"
                        />
                    )}
                </div>
                {children}
            </div>
            <FooterSiteUniUnica />
            
        </>
    );
}
