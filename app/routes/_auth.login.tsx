import type { DataFunctionArgs, HeadersFunction, MetaFunction } from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'

import { authenticator } from '~/services/auth.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'Login' },
    {
      name: 'description',
      content: 'Login',
    },
  ]
}

export const headers: HeadersFunction = () => ({
  'Cache-Control': 'private, max-age=3600',
  Vary: 'Cookie',
})

export async function loader({ request }: DataFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })

  return null
}

export default function Login() {
  return (
    <Form method="POST" action="/auth/github">
      <button>Login</button>
    </Form>
  )
}

// async function action({ request }: DataFunctionArgs) {
//   const session = await sessionStorage.getSession(
//     request.headers.get("cookie"),
//   );

//   throw redirectBack(request, {
//     ...responseInit,
//     headers: combineHeaders(
//       {
//         "set-cookie": await sessionStorage.destroySession(session),
//       },
//       responseInit?.headers,
//     ),
//     fallback: "/",
//   });
//   };
// }
