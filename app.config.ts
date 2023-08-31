import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    extra: {
      API_URL:process.env.API_HOST+"/api",
      SUPABASE_URL:process.env.SUPABASE_URL,
      SUPABASE_KEY:process.env.SUPABASE_KEY,
      universalLinks: [],
    },
  }
}