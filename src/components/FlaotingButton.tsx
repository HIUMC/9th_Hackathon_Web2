import { useModalActions } from '../hooks/useModalStore';

const FloatingButton = () => {
  const { openModal } = useModalActions();

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* 메인 FAB 버튼 */}
      <button
        onClick={() => openModal('transaction')}
        className="w-14 h-14 rounded-full bg-main text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default FloatingButton;