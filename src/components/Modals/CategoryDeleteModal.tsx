import BaseModal from './BaseModal';
import { useActiveModal, useCategoryToDelete, useModalActions } from '../../hooks/useModalStore';

const CategoryDeleteModal = () => {
  const activeModal = useActiveModal();
  const categoryToDelete = useCategoryToDelete();
  const { closeModal } = useModalActions();

  const handleDelete = () => {
    // TODO: 실제 카테고리 삭제 로직
    console.log('Delete category:', categoryToDelete);
    closeModal();
  };

  return (
    <BaseModal
      isOpen={activeModal === 'categoryDelete'}
      onClose={closeModal}
      title={
        <span>
          <span className="text-eat">{categoryToDelete?.name || '식비'}</span> 카테고리 삭제
        </span>
      }
      width="w-[432px]"
    >
      <div className="flex flex-col items-center gap-6">
        <p className="text-color-900 text-center">
          <span className="text-eat font-semibold">{categoryToDelete?.name || '식비'}</span> 카테고리를 정말 삭제하시겠습니까?
        </p>

        <div className="flex gap-3 w-full">
          <button
            onClick={closeModal}
            className="flex-1 py-3 bg-color-100 text-color-900 rounded-lg font-semibold hover:bg-color-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-3 bg-error text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            삭제
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default CategoryDeleteModal;