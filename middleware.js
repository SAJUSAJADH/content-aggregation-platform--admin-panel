import { NextResponse, NextRequest } from 'next/server'

 

export function middleware(request) {


    const path = request.nextUrl.pathname
    const publicPath = path === '/auth/signin';
    const token = request.cookies.get('token')?.value || '' 

    if(publicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!publicPath && !token){
        return NextResponse.redirect(new URL('/auth/signin',request.nextUrl))
    }

}
 

export const config = {
  matcher: [
    '/',
    '/auth/signin',
    '/content',
    '/community',
    '/forms/newpost'
  ]
}

