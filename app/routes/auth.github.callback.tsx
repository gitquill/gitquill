import type { DataFunctionArgs } from '@remix-run/cloudflare'

import { authenticator } from '~/services/auth.server'

export const loader = async ({ request, params }: DataFunctionArgs) => {
  let providerName = 'github'

  return authenticator.authenticate(providerName, request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}
