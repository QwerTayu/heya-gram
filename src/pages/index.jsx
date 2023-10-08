import { auth } from "@/lib/firebase";
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession()
  session && console.log(session.user)

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-rose-500 to-cyan-500 flex items-center">
      <div className="w-full max-w-5xl px-5 mx-auto flex flex-col md:flex-row items-center justify-center gap-[30px] md:justify-between">
        <div className="w-full md:w-max max-w-[400px] flex-col justify-center items-start gap-[30px] md:gap-[50px] inline-flex">
          <div className="text-white text-[32px] md:text-[40px] font-bold leading-normal">
            Heyaをシェアする。<br />
            汚部屋の現状確認して<br />
            一緒に掃除する。
          </div>
          <div className="self-stretch text-white text-base font-normal leading-normal">
            お部屋の掃除をしたいけど、なかなか始められない。
            でも友達が遊びに来るときは掃除を始められる。
            色んなことを共有したいZ世代向けに、この現象を使ったお掃除をサポートするSNSアプリができました！
          </div>
        </div>
        <div className="w-full max-w-[380px] md:w-[450px] px-[30px] md:px-[50px] py-[50px] md:py-[100px] bg-white bg-opacity-30 rounded-[40px] flex-col justify-center items-center gap-[30px] inline-flex">
          <img alt="logo" src="/heyagram.svg" className="w-[150px] md:w-[200px]" />
          <div className="flex-col justify-center items-center gap-5 flex">
            <div className="px-10 py-2.5 bg-rose-500 rounded-full flex justify-center items-center">
              <button className="text-white text-base font-normal leading-normal"
                onClick={() => signIn('google')}
              >
                Googleでログイン
              </button>
            </div>
            <div className="px-10 py-2.5 bg-cyan-600 rounded-full flex justify-center items-center">
              <button className="text-white text-base font-normal leading-normal"
                onClick={() => signIn('twitter')}
              >
                Twitterでログイン
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  }
};
