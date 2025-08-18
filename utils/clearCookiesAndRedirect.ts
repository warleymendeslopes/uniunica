'use client';

export function clearCookiesAndRedirect() {
    if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    }

    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.search = '';
        window.location.href = url.toString();
    }
}
