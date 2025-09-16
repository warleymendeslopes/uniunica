'use client';

import type { PartnerInfo } from '@/types/PartnerInfo';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

const COOKIE_KEY = process.env.NEXT_PUBLIC_COOKIE_KEY!;
const ENCRYPTION_SECRET = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET!;

interface PartnerContextType {
    partnerData: PartnerInfo | null;
    loading: boolean;
}

const PartnerContext = createContext<PartnerContextType>({
    partnerData: null,
    loading: true,
});

export const usePartner = () => useContext(PartnerContext);

export const PartnerProvider = ({
    codSite,
    children,
}: {
    codSite: string;
    children: ReactNode;
}) => {
    const [partnerData, setPartnerData] = useState<PartnerInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartner = async () => {
            setLoading(true);

            try {
                const encryptedCookie = Cookies.get(COOKIE_KEY);
                if (encryptedCookie) {
                    const decrypted = CryptoJS.AES.decrypt(encryptedCookie, ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
                    try {
                        const parsedData = JSON.parse(decrypted) as PartnerInfo;
                        if (parsedData.agency === codSite) {
                            setPartnerData(parsedData);
                            setLoading(false);
                            return;
                        }
                    } catch (parseErr) {
                        console.warn('[PartnerContext] ⚠️ Erro ao parsear cookie:', parseErr);
                    }
                }

                const res = await fetch(`https://r82nushnh3.us-east-1.awsapprunner.com/partner-polos/${codSite}`, {
                    headers: {
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWIwMDUxNjY1NGU4MGQyYTI2YzcxZDIiLCJ1c2VybmFtZSI6InBpbmNlbF9hdG9taWNvIiwiaWF0IjoxNzA2MDM0NDU1fQ.62DfpzfuX208RRmblolDJO3dJOhMB7kDdSpj-Wuv6Nk',
                    },
                });
                const data = await res.json();
                const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_SECRET).toString();
                Cookies.set(COOKIE_KEY, encrypted, { expires: 1 }); // 1 dia

                setPartnerData(data);
            } catch (err) {
                console.error('[PartnerContext] ❌ Erro ao buscar/parsing dados do parceiro:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPartner().catch();
    }, [codSite]);

    return (
        <PartnerContext.Provider value={{ partnerData, loading }}>
            {children}
        </PartnerContext.Provider>
    );
};
