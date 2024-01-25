interface Errors {
  message: string
  path?: Array<string | number>
}

export interface PayloadError {
  errors: Errors[]
  stack?: string
}

export interface GitHubProfile {
  id: string
  nodeId: string
  displayName: string
  username: string
  profileUrl: string
  photos: Photo[]
  provider: string
  _raw: string
  _json: JSON
}

interface JSON {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: null
  email: null
  hireable: boolean
  bio: null
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: Date
  updated_at: Date
}

interface Photo {
  value: string
}
