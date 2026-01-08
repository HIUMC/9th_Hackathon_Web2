import { useState } from "react";
import { useNavigate } from "react-router-dom";

import wallet from "../assets/icons/material-symbols_wallet.svg";

const LoginPage = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const isPasswordValid = /^\d{6}$/.test(password);
  const showPasswordError = password.length > 0 && !isPasswordValid;
  const buttonValid = nickname.trim().length > 0 && isPasswordValid;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-center">
      {/* 로고 영역 */}
      <div className="flex items-center gap-[22px] mb-[69px]">
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
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-[480px] h-[55px] bg-[#D9D9D9] rounded-[10px] px-5 font-sans text-[24px] font-medium leading-normal text-[#666B76] opacity-80 placeholder:text-[#666B76] placeholder:opacity-80 outline-none"
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          inputMode="numeric"
          placeholder="비밀번호(숫자 6자리)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={6}
          className="w-[480px] h-[55px] bg-[#D9D9D9] rounded-[10px] px-5 font-sans text-[24px] font-medium leading-normal text-[#666B76] opacity-80 placeholder:text-[#666B76] placeholder:opacity-80 outline-none"
        />
        {showPasswordError && (
          <p className="mt-[-12px] px-1 font-sans text-[24px] font-medium text-[#FF3B30]">
            비밀번호는 숫자6자리여야 합니다.
          </p>
        )}

        {/* 로그인 버튼 */}
        <button
          disabled={!buttonValid}
          onClick={() => {
            if (!buttonValid) return;
            navigate("/home", { replace: true });
          }}
          className="w-full h-[53px] bg-[#4F5BFF] text-white rounded-[100px] mt-8 flex items-center justify-center disabled:bg-[#D6DBFF] disabled:text-[#9AA0B0] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="text-right font-['Pretendard Variable'] text-[20px] font-semibold leading-normal">
            로그인
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
