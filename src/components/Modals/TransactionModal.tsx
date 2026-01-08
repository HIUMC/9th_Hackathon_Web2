import { useState } from 'react';
import BaseModal from './BaseModal';
import { useActiveModal, useModalActions } from '../../hooks/useModalStore';
import RightArrow from '../../assets/icons/icon_arrow_right.svg?react'

const TransactionModal = () => {
  const activeModal = useActiveModal();
  const { closeModal } = useModalActions();
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    memo: ''
  });

  const categories = [
    { name: '식비', icon: '🍽️' },
    { name: '월급', icon: '💰' },
    { name: '쇼핑', icon: '🛍️' },
    { name: '생활', icon: '🏠' },
    { name: '교통', icon: '🚗' },
    { name: '문화생활', icon: '🎭' },
    { name: '교육', icon: '📚' },
    { name: '기타', icon: '💳' }
  ];

  const isFormValid = formData.amount && formData.category && formData.date;

  const handleCategorySelect = (categoryName: string) => {
    setFormData({ ...formData, category: categoryName });
    setIsCategoryDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 저장 로직
    console.log('Transaction data:', { ...formData, type: activeTab });
    closeModal();
    // 폼 초기화
    setFormData({
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      memo: ''
    });
    setActiveTab('income');
    setIsCategoryDropdownOpen(false);
  };

  const handleClose = () => {
    closeModal();
    setFormData({
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      memo: ''
    });
    setActiveTab('income');
    setIsCategoryDropdownOpen(false);
  };

  return (
    <BaseModal
      isOpen={activeModal === 'transaction'}
      onClose={handleClose}
      title="수입·지출 내역 추가"
      width="w-[693px]"
    >
      {/* 탭 */}
      <div className="grid grid-cols-2 gap-0 -mt-6 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('income')}
          className={`py-3 font-semibold transition-colors relative ${
            activeTab === 'income'
              ? 'text-main'
              : 'text-color-600'
          }`}
        >
          수입
          {activeTab === 'income' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('expense')}
          className={`py-3 font-semibold transition-colors relative ${
            activeTab === 'expense'
              ? 'text-error'
              : 'text-color-600'
          }`}
        >
          지출
          {activeTab === 'expense' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-error" />
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 금액 */}
        <div>
          <label className="block text-sm font-semibold text-color-900 mb-2">
            금액 <span className="text-error">* 금액을 입력해주세요</span>
          </label>
          <input
            type="text"
            value={formData.amount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setFormData({ ...formData, amount: value });
            }}
            placeholder="예: 15000"
            className="w-full px-4 py-3 border border-color-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            required
          />
        </div>

        {/* 카테고리 */}
        <div className="relative">
          <label className="block text-sm font-semibold text-color-900 mb-2">
            카테고리 <span className="text-error">* 카테고리를 선택해주세요</span>
          </label>
          <button
            type="button"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="w-full px-4 py-3 border border-color-200 rounded-lg text-left hover:border-main transition-colors flex items-center justify-between"
          >
            <span className={formData.category ? 'text-color-900' : 'text-color-400'}>
              {formData.category || '월급'}
            </span>
            <RightArrow className='rotate-90'/>
          </button>

          {/* 드롭다운 */}
          {isCategoryDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-color-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => handleCategorySelect(category.name)}
                  className="w-full px-4 py-3 text-left hover:bg-color-100 transition-colors flex items-center gap-3"
                >
                  <span className="text-color-900">{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 날짜 */}
        <div>
          <label className="block text-sm font-semibold text-color-900 mb-2">
            날짜 <span className="text-error">*</span>
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 border border-color-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            required
          />
        </div>

        {/* 메모 */}
        <div>
          <label className="block text-sm font-semibold text-color-900 mb-2">
            메모
          </label>
          <textarea
            value={formData.memo}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
            placeholder="예: 내 최애 햄버거 먹고 99,999,999,999원"
            rows={3}
            className="w-full px-4 py-3 border border-color-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-main"
          />
        </div>

        {/* 팁 */}
        <div className="bg-color-100 rounded-lg p-4 text-sm text-color-600 text-center">
          정확한 사용 금액이 불가, 카드는 선택 비율로 자칫 반환 해주세요.
          <button type="button" className="block w-full mt-2 text-color-600 underline">
            파일 선택
          </button>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="
            flex-1 py-3 border border-color-200
            rounded-[8px] font-semibold text-900 text-[24px]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`flex-1 py-3 rounded-[8px] font-semibold transition-all text-[24px]
              ${
              !isFormValid 
                ? 'text-white bg-600' 
                : activeTab === 'income' 
                  ? 'bg-main text-white ' 
                  : 'bg-error text-white' 
            }`}
          >
            저장
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default TransactionModal;