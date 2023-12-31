import type { ActionFunctionArgs } from '@remix-run/cloudflare'
import { redirect } from '@remix-run/cloudflare'

import { authenticator } from '~/services/auth.server'

export async function loader() {
  return redirect('/login')
}

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate('github', request)
}
