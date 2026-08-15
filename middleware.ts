import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },

        set(name, value, options) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },

        remove(name, options) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  /*
   * ==========================================
   * PUBLIC PAGES
   * ==========================================
   *
   * These pages can be accessed without login.
   */

  const isPublicPage =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/cookies") ||
    pathname.startsWith("/support");

  /*
   * ==========================================
   * AUTH PAGES
   * ==========================================
   *
   * If the user is already logged in,
   * they should not return to Login/Register.
   */

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/reset-password");

  /*
   * ==========================================
   * PROTECTED PAGES
   * ==========================================
   *
   * Everything that is not public requires
   * authentication.
   */

  if (!session && !isPublicPage) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  /*
   * ==========================================
   * LOGGED-IN USER ON AUTH PAGE
   * ==========================================
   *
   * Send authenticated users back to the app.
   */

  if (session && isAuthPage) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};