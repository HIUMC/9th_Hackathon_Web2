import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

// 1. 차트용 데이터 (예시)
const expenseData = [
  { name: '식비', value: 99999999, color: '#F2A44B' }, // 오렌지
  { name: '금융', value: 99999999, color: '#42C563' }, // 그린
];

const totalIncome = 199999999999;
const totalExpense = 100999999998;
const remainingBudget = 99000000000;

const MonthPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // 2025년 12월

  // 최대 지출 카테고리 찾기 (가운데 표시용)
  const maxExpenseCategory = expenseData.reduce((prev, current) => {
    return (prev.value > current.value) ? prev : current;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#F4F6F8] min-h-screen">
      
      {/* 1. 헤더 (타이틀 + 월 선택) */}
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-[20px] font-bold text-[#1A1A1A]">월별 통계</h1>
        
        {/* 월 선택 드롭다운 (디자인만 구현) */}
        <div className="relative">
          <select 
            className="appearance-none bg-white border border-[#E2E4E8] rounded-lg py-2 pl-4 pr-10 text-[14px] font-medium text-[#1A1A1A] focus:outline-none cursor-pointer"
            value={format(currentDate, 'yyyy-MM')}
            onChange={() => {}} // 실제 날짜 변경 로직은 여기에
          >
            <option value="2025-12">2025년 12월</option>
            <option value="2026-01">2026년 1월</option>
          </select>
          {/* 커스텀 화살표 아이콘 */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. 메인 컨텐츠 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* 좌측: 분류별 지출 (차트) - 3칸 차지 */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-8 min-h-[400px]">
          <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-8">분류별 지출</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* 도넛 차트 */}
            <div className="relative w-[280px] h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%" // 중심 X 좌표
                    cy="50%" // 중심 Y 좌표
                    innerRadius={100} // 내부 반지름 (도넛 구멍 크기)
                    outerRadius={110} // 외부 반지름 (도넛 두께 결정)
                    paddingAngle={0}  // 조각 사이 간격
                    dataKey="value"
                    startAngle={90}   // 시작 각도 (12시 방향)
                    endAngle={-270}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* 차트 가운데 텍스트 (Absolute Positioning) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[12px] text-[#A9ACB2] mb-1">최대지출 카테고리</span>
                <span className="text-[24px] font-bold text-[#1A1A1A] mb-1">{maxExpenseCategory.name}</span>
                <span className="text-[16px] text-[#666B76]">
                  {maxExpenseCategory.value.toLocaleString()} 원
                </span>
              </div>
            </div>

            {/* 범례 (Legend) */}
            <div className="flex flex-col gap-4 min-w-[200px]">
              {expenseData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }} 
                    />
                    <span className="text-[#666B76] font-medium">{item.name}</span>
                  </div>
                  <span className="text-[#666B76]">
                    {item.value.toLocaleString()} 원
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 우측: 요약 정보 - 2칸 차지 */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* 총 수입 카드 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-[14px] font-semibold text-[#1A1A1A] mb-2">총 수입</h3>
            <p className="text-[20px] font-bold text-[#4F5BFF] mb-4">
              {totalIncome.toLocaleString()} 원
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-[14px] text-[#666B76]">
                <span>월급</span>
                <span>99,999,999,999 원</span>
              </div>
              <div className="flex justify-between text-[14px] text-[#666B76]">
                <span>용돈</span>
                <span>99,999,999,999 원</span>
              </div>
            </div>
          </div>

          {/* 총 지출 카드 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-[14px] font-semibold text-[#1A1A1A] mb-2">총 지출</h3>
            <p className="text-[20px] font-bold text-[#F24B4B] mb-4">
              {totalExpense.toLocaleString()} 원
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-[14px] text-[#666B76]">
                <span>월급</span>
                <span>99,999,999,999 원</span>
              </div>
              <div className="flex justify-between text-[14px] text-[#666B76]">
                <span>용돈</span>
                <span>99,999,999,999 원</span>
              </div>
            </div>
          </div>

          {/* 남은 예산 카드 */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex-1">
            <h3 className="text-[14px] font-semibold text-[#1A1A1A] mb-2">이번 달 남은 예산</h3>
            <p className="text-[20px] font-bold text-[#4F5BFF]">
              {remainingBudget.toLocaleString()} 원
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MonthPage;