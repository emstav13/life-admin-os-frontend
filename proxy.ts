import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              request.cookies.set(
                name,
                value
              );
            }
          );

          supabaseResponse =
            NextResponse.next({
              request,
            });

          cookiesToSet.forEach(
            ({ name, value, options }) => {
              supabaseResponse.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  /*
   * Refresh / validate the Supabase session.
   *
   * The proxy keeps the refreshed session
   * synchronized between the browser and
   * server-side requests.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname =
    request.nextUrl.pathname;

  /*
   * PUBLIC PAGES
   */
  const isPublicPage =
  pathname === "/" ||
  pathname === "/life-aios-demo.mp4" ||
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
   * AUTH PAGES
   */
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/reset-password");

  /*
   * PROTECTED PAGES
   */
  if (!user && !isPublicPage) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  /*
   * LOGGED-IN USER ON AUTH PAGE
   */
  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL(
        "/",
        request.url
      )
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};