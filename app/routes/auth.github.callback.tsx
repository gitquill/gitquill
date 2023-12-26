// app/routes/auth/github/callback.tsx
import type { LoaderFunctionArgs } from '@remix-run/cloudflare'

import { authenticator } from '~/services/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate('github', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
