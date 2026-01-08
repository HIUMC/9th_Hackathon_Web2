import { Link } from "react-router-dom";
import wallet from "../assets/icons/material-symbols_wallet.svg";

const NavBar = () => {
  return (
    <div className="px-[48px] py-[20px] w-[1440px] border-b border-white bg-white">
      <Link to="/" className="flex items-center gap-[12px] cursor-pointer">
        {/* 지갑 아이콘 */}
        <img src={wallet} alt="wallet" className="w-[32px] h-[32px] shrink-0 aspect-square" />

        {/* 로고 텍스트 */}
        <span className="text-main font-sans text-[28px] font-semibold leading-[150%] tracking-[-0.56px]">
          Pocket safe
        </span>
      </Link>
    </div>
  );
};

export default NavBar;
