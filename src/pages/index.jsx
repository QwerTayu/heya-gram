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
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="w-[450px] flex-col justify-center items-start gap-20 inline-flex">
          <div><span className="text-white text-[40px] font-bold font-['Inter'] leading-[56px]">Heyaをシェアする。<br /></span><span className="text-white text-[40px] font-bold font-['Inter'] leading-[56px]">汚部屋の現状確認して<br />一緒に掃除する。</span></div>
          <div className="self-stretch text-white text-base font-normal font-['Inter'] leading-normal">お部屋の掃除をしたいけど、なかなか始められない。<br />でも友達が遊びに来るときは掃除を始められる。<br />この現象を使って色んなことを共有したいZ世代向けにお掃除を促すSNSアプリができました。</div>
        </div>
        <div className="w-[450px] px-[50px] py-[100px] bg-white bg-opacity-25 rounded-[40px] flex-col justify-center items-center gap-[30px] inline-flex">
          <Image src="/heyagram.svg" height={75} width={200} />
          <div className="flex-col justify-center items-center gap-5 flex">
            <div className="px-10 py-2.5 bg-white rounded-[100px] justify-center items-center gap-2.5 inline-flex">
              <button className="text-black text-base font-normal font-['Inter'] leading-normal"
                onClick={() => signIn('google')}
              >
                Googleでログイン
              </button>
            </div>
            <div className="px-10 py-2.5 bg-white rounded-[100px] justify-center items-center gap-2.5 inline-flex">
              <button className="text-black text-base font-normal font-['Inter'] leading-normal"
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
