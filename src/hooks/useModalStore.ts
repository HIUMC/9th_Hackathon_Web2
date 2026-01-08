import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalActions {
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  setCategoryToDelete: (category: { id: string; name: string } | null) => void;
}

type ModalType =
  | "transaction"
  | "categoryAdd"
  | "categoryDelete"
  | "deleteAll"
  | null;

interface ModalState {
  activeModal: ModalType;
  categoryToDelete: { id: string; name: string } | null;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
  immer((set, _) => ({
    activeModal: null,
    categoryToDelete: null,
    actions: {
      openModal: (modalType) =>
        set((state) => {
          state.activeModal = modalType;
        }),
      closeModal: () =>
        set((state) => {
          state.activeModal = null;
          state.categoryToDelete = null;
        }),
      setCategoryToDelete: (category) =>
        set((state) => {
          state.categoryToDelete = category;
        }),
    },
  }))
);

export const useActiveModal = () => useModalStore((state) => state.activeModal);
export const useCategoryToDelete = () =>
  useModalStore((state) => state.categoryToDelete);
export const useModalActions = () => useModalStore((state) => state.actions);
