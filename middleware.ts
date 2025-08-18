// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { validatePartner } from "@/utils/validatePartner"

export async function middleware(request: NextRequest) {
    const url = request.nextUrl
    const partnerId = url.searchParams.get('agencyPartner')

    const res = NextResponse.next()

    if (partnerId && await validatePartner(partnerId)) {
        res.headers.set('x-user-site-type', 'partner')
        res.headers.set('x-partner-id', partnerId)
    } else {
        res.headers.set('x-user-site-type', 'internal')
    }

    return res
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api).*)'],
}
