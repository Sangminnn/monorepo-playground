import { create } from "zustand";

export interface OpenConfirmProps {
  content: React.ReactNode;
  confirmText?: React.ReactNode | string;
  cancelText?: React.ReactNode | string;
}

interface ConfirmState {
  isOpen: boolean;
  content: React.ReactNode;
}

interface ConfirmAction {
  confirmText?: React.ReactNode | string;
  cancelText?: React.ReactNode | string;
  openConfirm: ({ content, confirmText, cancelText }: OpenConfirmProps) => void;
  closeConfirm: () => void;
}

export type ConfirmStore = ConfirmState & ConfirmAction;

/** @TODO 아래와 같이 key, value구조에서 value에 변수할당해주는 구문이 들어가는 템플릿이 맞는지 체크하기 */
const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  content: null,
  confirmText: "확인",
  cancelText: "취소",
  openConfirm: ({ content, confirmText, cancelText }) =>
    set(() => ({
      isOpen: true,
      content,
      confirmText: confirmText ?? "확인",
      cancelText: cancelText ?? "취소",
    })),
  closeConfirm: () =>
    set(() => ({
      isOpen: false,
      content: null,
      confirmText: "확인",
      cancelText: "취소",
    })),
}));

export default useConfirmStore;
