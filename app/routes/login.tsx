import { Form } from '@remix-run/react'

export default function Page() {
  return (
    <Form action="/auth/github" method="post">
      <button>Login with GitHub</button>
    </Form>
  )
}
