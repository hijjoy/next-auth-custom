export default function FirstComponent() {
  return (
    <div className="bg-gray-100 w-full flex flex-col items-center h-[700px] justify-center gap-16">
      <div />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-black">학습 습관 형성의 출발점</h1>
        <div className="felx flex-col items-center">
          <p className="text-center">
            Crabit은 'Craft Your Habit' 의 합성어로,
          </p>
          <p className="text-center">
            지속가능한 학습 습관을 형성할 수 있도록 지원합니다.
          </p>
        </div>
      </div>
      <ul className="flex justify-center w-5/6 gap-2 h-28 text-white font-bold">
        <li className="w-1/4 flex flex-col items-center justify-center bg-pink-500 rounded-2xl gap-2 p-2 text-center max-w-52">
          <span className="text-xl">디자인</span>
          <p className="text-sm">스스로를 디자인하는 학습 습관</p>
        </li>
        <li className="w-1/4 flex flex-col items-center justify-center bg-pink-500 rounded-2xl gap-2 p-2 text-center max-w-52 ">
          <span className="text-xl">디자인</span>
          <p className="text-sm">스스로를 디자인하는 학습 습관</p>
        </li>
        <li className="w-1/4 flex flex-col items-center justify-center bg-pink-500 rounded-2xl gap-2 p-2 text-center max-w-52">
          <span className="text-xl">디자인</span>
          <p className="text-sm">스스로를 디자인하는 학습 습관</p>
        </li>
      </ul>
    </div>
  );
}
