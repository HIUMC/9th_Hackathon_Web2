import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import Footer from '../components/Footer';
import RightArrow from '../assets/icons/icon_arrow_right.svg?react'
import LeftArrow from '../assets/icons/icon_arrow_left.svg?react'
import TrashcanIcon from '../assets/icons/icon_trashcan.svg?react'
import TransactionModal from '../components/Modals/TransactionModal';
import FloatingButton from '../components/FlaotingButton';

interface Transaction {
  id: string;
  date: Date;
  category: string;
  amount: number;
  type: "income" | "expense";
  memo?: string;
}

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const mockData: Transaction[] = [
        { id: "1", date: new Date(year, month, 5), category: "식비", amount: 12000, type: "expense", memo: "점심" },
        { id: "2", date: new Date(year, month, 15), category: "월급", amount: 3000000, type: "income", memo: "급여" },
        {
          id: "3",
          date: new Date(year, month, 15),
          category: "교통/차량",
          amount: 50000,
          type: "expense",
          memo: "주유",
        },
        { id: "4", date: new Date(year, month, 25), category: "쇼핑", amount: 150000, type: "expense", memo: "의류" },
      ];
      setTransactions(mockData);
    };
    fetchMonthlyData();
  }, [currentDate]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // 선택된 날짜 필터링
  const dailyTransactions = selectedDate ? transactions.filter((t) => isSameDay(t.date, selectedDate)) : [];

  const dailyIncome = dailyTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);

  const dailyExpense = dailyTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

  const handleRemove = () => {
    // 지출 내역 삭제 핸들러
  };

  const renderCalendar = () => {
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;

        // 1. 현재 날짜(currentDay)의 거래 내역 필터링
        const dayTransactions = transactions.filter((t) => isSameDay(t.date, currentDay));

        // 2. [추가] 현재 날짜의 수입/지출 합계 계산 (여기가 핵심입니다!)
        const dayIncome = dayTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);

        const dayExpense = dayTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

        const isCurrentMonth = isSameMonth(currentDay, monthStart);
        const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
        const hasTransaction = dayTransactions.length > 0;

        days.push(
          <div
            key={day.toString()}
            className={`
              flex flex-col items-start w-full h-[120px] px-4 py-3 gap-[10px] rounded-[8px] 
              border border-[#E2E4E8] cursor-pointer transition-colors 
              ${!isCurrentMonth ? "bg-100" : "bg-white"} 
              ${isSelected ? "bg-mainvariant border border-main" : ""}`}
            onClick={() => setSelectedDate(currentDay)}
          >
            <div className="font-medium mb-1">{format(currentDay, "d")}</div>

            {hasTransaction && isCurrentMonth && (
              <div
                className="
                leading-normal tracking-[-0.28px]
                text-[14px] font-normal space-y-1 w-full overflow-hidden flex flex-col items-center"
              >
                {/* 3. [수정] dailyIncome 대신 위에서 계산한 dayIncome 사용 */}
                {dayIncome > 0 && (
                  <div className="text-main font-medium truncate w-full">+{dayIncome.toLocaleString()}</div>
                )}

                {/* 4. [수정] dailyExpense 대신 위에서 계산한 dayExpense 사용 */}
                {dayExpense > 0 && (
                  <div className="text-error font-medium truncate w-full">-{dayExpense.toLocaleString()}</div>
                )}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
    }
    return days;
  };

  return (
    <div className="max-w-7xl mx-auto mb-20">
      {/* 달력 섹션 */}
      <div className="bg-[#E2E4E8] rounded-[8px] shadow-sm p-6">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-6">
          <LeftArrow className="cursor-pointer" onClick={handlePrevMonth} />
          <span className="text-[24px] font-normal text-center">
            {format(currentDate, "yyyy년 M월", { locale: ko })}
          </span>
          <RightArrow className="cursor-pointer" onClick={handleNextMonth} />
        </div>

        {/* 요일 */}
        <div className="grid grid-cols-7 mb-2 gap-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="text-center font-semibold text-color-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* 달력 */}
        <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
      </div>
      {/* 상세 내역 섹션 */}
      <div className=" bg-white rounded-[8px] shadow-sm p-6 mt-16">
        {selectedDate && (
          <div className="">
            {/* 날짜 헤더 */}
            <h2 className="text-[24px] font-normal text-900 mb-4">{format(selectedDate, "M/d (E)", { locale: ko })}</h2>

            {/*  거래 내역 리스트 (사진 스타일) */}
            <div className="w-full">
              {dailyTransactions.length > 0 ? (
                dailyTransactions.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between py-4 border-b border-mainvariant last:border-0"
                  >
                    <div className="flex items-center gap-4 ">
                      <span className="text-[24px] font-normal text-900">{t.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[24px] font-semibold ${t.type === "income" ? "text-main" : "text-error"}`}>
                        {t.type === "income" ? "+" : "-"} {t.amount.toLocaleString()} 원
                      </span>
                      {/* 삭제 버튼 */}
                      <button
                        className="
                        flex
                        px-3 py-[12px] bg-100 rounded-[8px] text-[20px] text-800 
                        gap-[8px] pl-4 pr-5
                        hover:bg-gray-200 transition-colors"
                      >
                        <TrashcanIcon />
                        <p>삭제</p>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-400 bg-gray-50 rounded-lg">내역이 없습니다.</div>
              )}
            </div>

            {/* 3. 하단 합계 */}
            <div
              className="
              flex justify-between items-center mt-6 pt-4 
              text-600 text-[20px] font-normal
              leading-normal tracking-[-0.4px]
              border-t border-mainvariant"
            >
              <div className="flex gap-1">
                <span>수입 합계 : {dailyIncome.toLocaleString()} 원</span>
              </div>
              <div className="flex gap-1">
                <span>지출 합계 : {dailyExpense.toLocaleString()} 원</span>
              </div>
            </div>
          </div>
        )}
        </div>
        {/* Global Modals */}
      <TransactionModal />
      
      {/* Floating Action Button */}
      <FloatingButton />
      <Footer />

    </div>
  );
};

export default HomePage;
