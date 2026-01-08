import { useState } from 'react';
import BaseModal from './BaseModal';
import { useActiveModal, useModalActions } from '../../hooks/useModalStore';

const CategoryAddModal = () => {
  const activeModal = useActiveModal();
  const { closeModal } = useModalActions();
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 카테고리 추가 로직
    console.log('New category:', categoryName);
    closeModal();
    setCategoryName('');
  };

  const handleClose = () => {
    closeModal();
    setCategoryName('');
  };

  return (
    <BaseModal
      isOpen={activeModal === 'categoryAdd'}
      onClose={handleClose}
      title="카테고리 추가"
      width="w-[432px]"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold text-color-900 mb-2">
            카테고리명
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="예: 월급"
            className="w-full px-4 py-3 border border-color-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-3 bg-color-100 text-color-900 rounded-lg font-semibold hover:bg-color-200 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-main text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            추가
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default CategoryAddModal;