import config from '@/config'
import { type GitHubProfile } from '@/types'
import { type Strategy } from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'

export const GitHub: Strategy = new GitHubStrategy(
  {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL
  },
  (_: string, __: string, profile: GitHubProfile, done: any) =>
    done(null, { profile })
)
