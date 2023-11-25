import { create } from "zustand";

interface ConfirmStore {
  isOpen: boolean;
  content: React.ReactNode;
  openConfirm: (content: React.ReactNode) => void;
  closeConfirm: () => void;
}

/** @TODO 아래와 같이 key, value구조에서 value에 변수할당해주는 구문이 들어가는 템플릿이 맞는지 체크하기 */
const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  content: null,
  openConfirm: (content) =>
    set((state) => ({
      isOpen: (state.isOpen = true),
      content: (state.content = content),
    })),
  closeConfirm: () =>
    set((state) => ({
      isOpen: (state.isOpen = false),
      content: (state.content = null),
    })),
}));

export default useConfirmStore;
