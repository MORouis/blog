import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'

export default function Authentication() {
  const { data: session } = useSession()
  console.log(session);
  if (session) {
    return (
      <>
        <h2>Welcome {session.user.name}</h2>
        Signed in as {session.user.email} <br />
        <Image src={session.user.image} width={400} height={400} alt="graduation"/>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}