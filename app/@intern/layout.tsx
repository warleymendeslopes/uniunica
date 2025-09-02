'use client';

import AppHeader from "@/components/header/page";
import FooterSiteUniUnica from "@/components/footer/page";

export default function InternoLayout({ children }: { children: React.ReactNode }) {
  return (
   <>
    <AppHeader />   
    <div className="relative flex flex-col min-h-screen font-sans antialiased bg-background text-foreground">
      
      <main className="flex-grow">{children}</main>
      <FooterSiteUniUnica />
    </div>
   </>
  );
}
