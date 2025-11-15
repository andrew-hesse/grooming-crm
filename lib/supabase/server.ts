import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Creates a Supabase client for use in Server Components and Server Actions
 * Handles cookie management for authentication
 *
 * @returns Promise resolving to Supabase client instance for server use
 *
 * @example
 * ```tsx
 * import { createClient } from '@/lib/supabase/server';
 *
 * export async function MyServerComponent() {
 *   const supabase = await createClient();
 *   const { data } = await supabase.from('table').select();
 *   // ...
 * }
 * ```
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
