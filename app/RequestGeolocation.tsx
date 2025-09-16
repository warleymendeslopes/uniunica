"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";

async function getLocation(payload: any) {
    const res = await fetch(
        `${process.env.API_ADDRESS}/reverse?lat=${payload.lat}&lon=${payload.lng}&format=json`
    );
    const data = await res.json();
    localStorage.setItem("userLocation", JSON.stringify(data));
    try {
        Cookies.set("userLocation", JSON.stringify(data), { expires: 7, sameSite: "Lax" });
    } catch { }
    console.log('localizacao:', data);
}
export function RequestGeolocation(): null {
    useEffect((): void => {
        if (typeof window === "undefined") return;
        if (!("geolocation" in navigator)) return;
        try {
            const cookieLocation = Cookies.get("userLocation");
            if (cookieLocation && cookieLocation.length > 0) {
                return;
            }
        } catch { }
        try {
            navigator.geolocation.getCurrentPosition(
                (position): void => {
                    const { latitude, longitude, accuracy } = position.coords;
                    const payload = {
                        lat: latitude,
                        lng: longitude,
                        accuracy,
                        timestamp: position.timestamp,
                    };
                    getLocation(payload).catch()
                },
                (): void => {
                    try {
                        localStorage.setItem("userLocationDenied", "1");
                        Cookies.set("userLocationDenied", "1", { expires: 1, sameSite: "Lax" });
                    } catch { }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000,
                }
            );
        }
        catch { }
    }, []);
    return null;
}


