import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function Token() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      {session && session.user && <Text>{session.access_token}</Text>}
    </View>
  )
}