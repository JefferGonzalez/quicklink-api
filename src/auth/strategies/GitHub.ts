import env from '@/env.js'
import { type GitHubProfile } from '@/types.js'
import { type Strategy } from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { VerifyCallback } from 'passport-google-oauth20'

export const GitHub: Strategy = new GitHubStrategy(
  {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackURL: env.GITHUB_CALLBACK_URL
  },
  (_: string, __: string, profile: GitHubProfile, done: VerifyCallback) => {
    done(null, { profile })
  }
)
