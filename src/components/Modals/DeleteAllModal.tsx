import BaseModal from './BaseModal';
import { useActiveModal, useModalActions } from '../../hooks/useModalStore';
const DeleteAllModal = () => {
  const activeModal = useActiveModal();
  const { closeModal } = useModalActions();

  const handleDelete = () => {
    // TODO: 실제 전체 삭제 로직
    console.log('Delete all data');
    closeModal();
  };

  return (
    <BaseModal
      isOpen={activeModal === 'deleteAll'}
      onClose={closeModal}
      title="전체 내역 삭제"
      width="w-[432px]"
    >
      <div className="flex flex-col items-center gap-6">
        <p className="text-color-900 text-center">
          전체 내역을 정말 삭제하시겠습니까?
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

export default DeleteAllModal;