import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { cookies, headers } from "next/headers";
import { ReactNode } from "react";
import { PartnerProvider } from "@/context/PartnerContext";
import CryptoJS from "crypto-js";
import type { PartnerInfo } from "@/types/PartnerInfo";
import { SetAgencyParam } from "@/app/SetAgencyParam";
import FooterSiteUniUnica from "@/components/footer/page";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

interface RootLayoutProps {
    partner: ReactNode;
    intern: ReactNode;
    sellers: ReactNode;
    children: ReactNode;
}
const COOKIE_KEY = 'partnerData';
const ENCRYPTION_SECRET = 'chave-secreta-segura';

import { Krona_One, Poppins } from "next/font/google";

export const krona = Krona_One({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-krona",
});

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default async function RootLayout({
    children,
    partner
}: RootLayoutProps) {
    const cookieStore = await cookies();
    const encrypted = cookieStore.get(COOKIE_KEY)?.value;

    const headersList = await headers();
    let siteType = headersList.get("x-user-site-type") || "internal";
    let codSite = headersList.get("x-partner-id") || "";



    if (!codSite && encrypted) {
        const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
        try {
            const parsedData = JSON.parse(decrypted) as PartnerInfo;
            codSite = parsedData.agency;
            siteType = `partner` //depois podemos mudar para o type que recebemos da API
        } catch (parseErr) {
            console.warn('[PartnerContext] ⚠️ Erro ao parsear cookie:', parseErr);
        }
    }

    switch (siteType) {
        case 'partner':
            return (
                <html suppressHydrationWarning lang="en">
                    <head />
                    <body
                        className={clsx(
                            "min-h-screen text-foreground bg-background font-sans antialiased",
                            fontSans.variable,
                        )}
                    >
                        <SetAgencyParam codSite={codSite} />
                        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                            <PartnerProvider codSite={codSite}>
                                {partner}
                            </PartnerProvider>
                        </Providers>
                    </body>
                </html>
            );
        case 'internal':
            return (
                <html suppressHydrationWarning lang="pt-br">
                    <head />
                    <body
                        className={clsx(
                            "min-h-screen text-foreground bg-background font-sans antialiased",
                            fontSans.variable,
                        )}
                    >
                        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                            <div className="relative flex flex-col h-screen">
                                <Navbar />
                                <main className={`${krona.variable} ${poppins.variable} container mx-auto max-w-7xl pt-16 px-6 flex-grow`}>
                                    {children}
                                </main>
                                <FooterSiteUniUnica />
                            </div>
                        </Providers>
                    </body>
                </html>
            );
        default:
    }








}
