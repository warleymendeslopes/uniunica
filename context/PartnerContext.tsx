// context/PartnerContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { PartnerInfo } from '@/types/PartnerInfo';

interface PartnerContextType {
    partnerData: PartnerInfo | null;
    loading: boolean;
}

const PartnerContext = createContext<PartnerContextType>({
    partnerData: null,
    loading: true,
});

export const usePartner = () => useContext(PartnerContext);

export const PartnerProvider = ({ codSite, children }: { codSite: string; children: ReactNode }) => {
    const [partnerData, setPartnerData] = useState<PartnerInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const res = await fetch(`http://localhost:5001/partner-polos/${codSite}`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWIwMDUxNjY1NGU4MGQyYTI2YzcxZDIiLCJ1c2VybmFtZSI6InBpbmNlbF9hdG9taWNvIiwiaWF0IjoxNzA2MDM0NDU1fQ.62DfpzfuX208RRmblolDJO3dJOhMB7kDdSpj-Wuv6Nk',
                    },
                });
                const data = await res.json();
                setPartnerData(data);
            } catch (err) {
                console.error('Erro ao buscar dados do parceiro:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPartner();
    }, [codSite]);

    return (
        <PartnerContext.Provider value={{ partnerData, loading }}>
            {children}
        </PartnerContext.Provider>
    );
};
