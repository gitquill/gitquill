import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
// import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/router'

import { authenticator } from '~/services/auth.server'
import { commitSession, getSession } from '~/services/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    // failureRedirect: '/login',
  })
  let session = await getSession(request.headers.get('cookie'))
  let error = session.get(authenticator.sessionErrorKey)
  console.log(session.data)
  return json(
    { error },
    {
      headers: {
        'Set-Cookie': await commitSession(session), // You must commit the session whenever you read a flash
      },
    }
  )
}

export default function Page() {
  return <div></div>
}
