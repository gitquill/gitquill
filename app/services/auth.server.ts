// app/services/auth.server.ts
import { Authenticator } from 'remix-auth'
import { GitHubStrategy } from 'remix-auth-github'

import { sessionStorage } from '~/services/session.server'

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage, {
  sessionErrorKey: 'my-error-key',
})

export type User = {
  id: string
  email: string
  username?: string
  name?: string
  imageUrl?: string
}

let gitHubStrategy = new GitHubStrategy(
  {
    clientID: 'Iv1.555b5922a5c7f134',
    clientSecret: '',
    callbackURL: 'http://localhost:8788/auth/github/callback',
  },
  async ({ accessToken, extraParams, profile }: { accessToken: string; extraParams: any; profile: any }) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value }
    console.log(profile)
    return {
      id: profile.id,
      email: profile.emails[0].value,
      username: profile.username,
      name: profile.displayName,
      imageUrl: profile.photos[0].value,
    }
  }
)

authenticator.use(gitHubStrategy)
