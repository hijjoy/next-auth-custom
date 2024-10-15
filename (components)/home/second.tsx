export default function SecondComponent() {
  return (
    <div className="h-[800px] w-full flex flex-col py-16 px-28 gap-10">
      <div className="flex flex-col gap-4">
        <p className="text-pink-500 font-extrabold text-2xl">
          매일의 작은 성취를 통한 습관 형성
        </p>
        <h1 className="text-5xl font-black">크래빗 챌린지</h1>
      </div>

      <div className="flex gap-5 justify-center w-full">
        <div className="flex flex-col bg-black text-white rounded-2xl p-10 w-full h-96 gap-4 break-keep">
          <h1 className="font-bold text-xl">성취감</h1>
          <p>챌린지 기능을 통해 매일 소소한 성취감을 선물합니다.</p>
        </div>
        <div className="flex flex-col bg-black text-white rounded-2xl p-10 w-full h-96 gap-4 mt-20 break-keep">
          <h1 className="font-bold text-xl">성취감</h1>
          <p>챌린지 기능을 통해 매일 소소한 성취감을 선물합니다.</p>
        </div>
        <div className="flex flex-col bg-black text-white rounded-2xl p-10 w-full h-96 gap-4 break-keep">
          <h1 className="font-bold text-xl">성취감</h1>
          <p>챌린지 기능을 통해 매일 소소한 성취감을 선물합니다.</p>
        </div>
      </div>
    </div>
  );
}
