import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client"
import { getSession } from "@auth0/nextjs-auth0";

export default function Home() {
  const { isLoading, error, user } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <>
      <Head>
        <title>Chat-G-Prit | Login or Signup</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen w-full bg-gray-800 text-white text-center">
        <div>
          {!!user && <Link href="/api/auth/logout">Logout</Link>}
          <>
            {!user && <Link href="/api/auth/login" className="btn">Login</Link>}
            {!user && <Link href="/api/auth/signup" className="btn">Sign Up</Link>}
          </>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = async (ctx)=>{
  const seassion = await getSession(ctx.req, ctx.res)

  if(!!seassion){
    return {
      redirect : { destination: "/chat"}
    }
  }
  return{
    props: {}
  }
}

