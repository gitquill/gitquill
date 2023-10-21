import type { DataFunctionArgs } from '@remix-run/cloudflare'

import { authenticator } from '~/services/auth.server'

export const action = async ({ request, params }: DataFunctionArgs) => {
  let sleep = (ms: number) => new Promise<void>((res) => setTimeout(() => res(), ms))
  sleep(2000)

  let providerName = 'github'

  return await authenticator.authenticate(providerName, request)
}

export async function loader() {
  throw new Response('Not found', { status: 404 })
}
