import * as React from 'react'
import Layout from '../components/Layout'
import { useAtom } from 'jotai'
import { userAtom } from '../states/user.state'
import ConnectUser from '../components/ConnectUser'
import OnlineOrderContainer from '../components/OnlineOrder'
export default function OnlineOrder() {
  const [user] = useAtom(userAtom)
  return (
    <div>
      <Layout />
      {!user ? <ConnectUser /> : <OnlineOrderContainer />}
    </div>
  )
}
