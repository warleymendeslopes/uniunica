import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { cookies, headers } from "next/headers";
import { ReactNode } from "react";
import { PartnerProvider } from "@/context/PartnerContext";
import CryptoJS from "crypto-js";
import type { PartnerInfo } from "@/types/PartnerInfo";
import { SetAgencyParam } from "@/app/SetAgencyParam";

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
import Script from "next/script";
import InternoLayout from "./@intern/layout";

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
    intern,
    partner
}: RootLayoutProps) {
    const cookieStore = await cookies();
    const encrypted = cookieStore.get(COOKIE_KEY)?.value;

    const headersList = await headers();
    let siteType = headersList.get("x-user-site-type") || "intern";
    let codSite = headersList.get("x-partner-id") || "";



    if (!codSite && encrypted) {
        const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
        try {
            const parsedData = JSON.parse(decrypted) as PartnerInfo;
            codSite = parsedData.agency;
            siteType = `partner`
        } catch (parseErr) {
            console.warn('[PartnerContext] ⚠️ Erro ao parsear cookie:', parseErr);
        }
    }

   

    switch (siteType) {
        case 'partner':
            return (
                <html suppressHydrationWarning lang="en">
                    <head>
                        <Script src="https://js.hsforms.net/forms/embed/v2.js" strategy="afterInteractive" />
                    </head>
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
        case "intern":
            return (
                <html suppressHydrationWarning lang="pt-br">
                    <head>
                        <Script src="https://js.hsforms.net/forms/embed/v2.js" strategy="afterInteractive" />
                    </head>
                    <body
                        className={clsx(
                            "min-h-screen text-foreground bg-background font-sans antialiased",
                            fontSans.variable,
                        )}
                    >
                        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                            {intern}
                        </Providers>
                    </body>
                </html>
            );

        default:
    }
}
