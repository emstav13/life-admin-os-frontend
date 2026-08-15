import { supabase } from "@/lib/supabase";
import { API_URL } from "@/lib/api";


export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
) {

  // =========================================================
  // GET CURRENT SESSION
  // =========================================================

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();


  if (error || !session?.access_token) {

    throw new Error(
      "User is not authenticated"
    );
  }


  // =========================================================
  // NORMALIZE ENDPOINT
  // =========================================================

  let normalizedEndpoint = endpoint.trim();


  /*
   * authFetch expects a relative API endpoint.
   *
   * Correct:
   *
   * /documents
   * /documents/123
   * /reminders
   *
   * Incorrect:
   *
   * http://127.0.0.1:8000/documents
   *
   * because API_URL will already be added below.
   */

  if (
    normalizedEndpoint.startsWith(
      API_URL
    )
  ) {

    normalizedEndpoint =
      normalizedEndpoint.slice(
        API_URL.length
      );
  }


  /*
   * Remove accidental leading API URL
   * if it appears more than once.
   */

  normalizedEndpoint =
    normalizedEndpoint.replace(
      /^https?:\/\/[^/]+/i,
      ""
    );


  /*
   * Make sure endpoint starts with /
   */

  if (
    !normalizedEndpoint.startsWith("/")
  ) {

    normalizedEndpoint =
      `/${normalizedEndpoint}`;
  }


  // =========================================================
  // BUILD FINAL URL
  // =========================================================

  const url =
    `${API_URL}${normalizedEndpoint}`;


  console.log(
    "AUTH FETCH:",
    url
  );


  // =========================================================
  // HEADERS
  // =========================================================

  const headers =
    new Headers(
      options.headers
    );


  headers.set(
    "Authorization",
    `Bearer ${session.access_token}`
  );


  /*
   * Only set Content-Type automatically
   * when the request has a body and the caller
   * hasn't already provided one.
   */

  if (
    options.body &&
    !headers.has("Content-Type")
  ) {

    headers.set(
      "Content-Type",
      "application/json"
    );
  }


  // =========================================================
  // REQUEST
  // =========================================================

  return fetch(
    url,
    {
      ...options,
      headers,
    }
  );
}