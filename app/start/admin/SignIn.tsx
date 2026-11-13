/** The onboarding admin sign-in (ADMIN_KEY). Posts to /api/start/admin/login. */
export default function SignIn({ next, error = false }: { next: string; error?: boolean }) {
  return (
    <section className="pb-20 pt-32 sm:pt-36">
      <div className="mx-auto max-w-sm px-6">
        <h1 className="text-2xl font-bold tracking-tight">Onboarding admin</h1>
        <form method="post" action="/api/start/admin/login" className="mt-6 space-y-3">
          <input type="hidden" name="next" value={next} />
          <label htmlFor="admin-key" className="block text-sm font-medium">
            Admin key
          </label>
          <input
            id="admin-key"
            name="key"
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />
          {error && <p className="text-sm text-rose-600">That key didn&rsquo;t match.</p>}
          <button className="w-full rounded-full bg-violet-600 py-2.5 font-semibold text-white hover:bg-violet-700">Sign in</button>
        </form>
      </div>
    </section>
  );
}
