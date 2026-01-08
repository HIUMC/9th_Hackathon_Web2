import { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import Footer from '../components/Footer';
import RightArrow from '../assets/icons/icon_arrow_right.svg?react'
import LeftArrow from '../assets/icons/icon_arrow_left.svg?react'

interface Transaction {
  id: string;
  date: Date;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  memo?: string;
}

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock 데이터
  const transactions: Transaction[] = [
    {
      id: '1',
      date: new Date(2025, 0, 15),
      category: '식비',
      amount: 15000,
      type: 'expense',
      memo: '점심 식사'
    },
    {
      id: '2',
      date: new Date(2025, 0, 15),
      category: '월급',
      amount: 3000000,
      type: 'income',
      memo: '1월 급여'
    }
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderCalendar = () => {
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const dayTransactions = transactions.filter(t => 
          isSameDay(t.date, currentDay)
        );
        
        const isCurrentMonth = isSameMonth(currentDay, monthStart);
        const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
        const hasTransaction = dayTransactions.length > 0;

        days.push(
          <div
            key={day.toString()}
            className={`min-h-[100px] border border-color-200 p-2 cursor-pointer transition-colors ${
              !isCurrentMonth ? 'bg-color-100 text-color-400' : 'bg-white hover:bg-color-100'
            } ${isSelected ? 'ring-2 ring-main' : ''}`}
            onClick={() => setSelectedDate(currentDay)}
          >
            <div className="font-medium mb-1">{format(currentDay, 'd')}</div>
            {hasTransaction && isCurrentMonth && (
              <div className="text-xs space-y-1">
                {dayTransactions.map(t => (
                  <div
                    key={t.id}
                    className={`px-2 py-1 rounded ${
                      t.type === 'income' ? 'bg-finance/10 text-finance' : 'bg-eat/10 text-eat'
                    }`}
                  >
                    {t.category}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
    }

    return days;
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income' && isSameMonth(t.date, currentDate))
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense' && isSameMonth(t.date, currentDate))
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense' && isSameMonth(t.date, currentDate))
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* 헤더 */}
        <div className="flex items-center gap-4">
          <LeftArrow className='cursor-pointer' onClick={handlePrevMonth}/>
          <span className="text-[24px] font-normal text-center">
            {format(currentDate, 'yyyy년 M월', { locale: ko })}
          </span>
          <RightArrow className='cursor-pointer' onClick={handleNextMonth}/>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day} className="text-center font-semibold text-color-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* 달력 */}
        <div className="grid grid-cols-7 gap-0 border-l border-t border-color-200">
          {renderCalendar()}
        </div>

        {/* 월별 통계 */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-color-900">
            {format(currentDate, 'M월', { locale: ko })} 통계
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* 수입 */}
            <div className="bg-color-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-finance rounded flex items-center justify-center">
                  <span className="text-white text-xs">↑</span>
                </div>
                <span className="font-semibold text-color-900">수입</span>
              </div>
              <div className="text-2xl font-bold text-finance">
                +{totalIncome.toLocaleString()} 원
              </div>
            </div>

            {/* 지출 */}
            <div className="bg-color-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-eat rounded flex items-center justify-center">
                  <span className="text-white text-xs">↓</span>
                </div>
                <span className="font-semibold text-color-900">지출</span>
              </div>
              <div className="text-2xl font-bold text-eat">
                -{totalExpense.toLocaleString()} 원
              </div>
            </div>
          </div>

          {/* 카테고리별 지출 */}
          {Object.keys(expenseByCategory).length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-color-900">카테고리별 지출</h3>
              {Object.entries(expenseByCategory).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between py-2 border-b border-color-200">
                  <div className="flex items-center gap-2">
                    <span className="text-color-900">{category}</span>
                  </div>
                  <span className="font-semibold text-eat">{amount.toLocaleString()} 원</span>
                </div>
              ))}
            </div>
          )}

          {/* 잔액 */}
          <div className="bg-main/5 rounded-lg p-4 border border-main/20">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-color-900">이번 달 잔액</span>
              <span className="text-2xl font-bold text-main">
                {(totalIncome - totalExpense).toLocaleString()} 원
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;