import { GetCurrentUser } from '@/components/getCurrentUser'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <GetCurrentUser />
      </SessionProvider>
    </RecoilRoot>
  )
}
