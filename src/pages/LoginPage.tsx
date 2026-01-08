import wallet from "../assets/icons/material-symbols_wallet.svg";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-center">
      {/* 로고 영역 */}
      <div className="flex items-center gap-3 mb-12">
        <img src={wallet} alt="wallet" className="w-[69px] h-[69px]" />
        <span className="text-main font-sans text-[64px] font-semibold leading-[1.5] tracking-[-1.28px]">
          Pocket safe
        </span>
      </div>

      {/* 로그인 폼 */}
      <div className="flex flex-col gap-5 w-[480px]">
        {/* 닉네임 입력 */}
        <input
          type="text"
          placeholder="닉네임"
          className="w-full h-[55px] bg-[#D9D9D9] rounded-[10px] px-5 font-sans text-[24px] font-medium text-[#666B76] placeholder:text-[#666B76] placeholder:opacity-80 outline-none"
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="비밀번호(6자리)"
          className="w-full h-[55px] bg-[#D9D9D9] rounded-[10px] px-5 font-sans text-[24px] font-medium text-[#666B76] placeholder:text-[#666B76] placeholder:opacity-80 outline-none"
        />

        {/* 로그인 버튼 */}
        <button className="w-full h-[53px] bg-main rounded-[100px] mt-8 flex items-center justify-center">
          <span className="text-white font-sans text-[20px] font-semibold opacity-80">로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
