import { SingleTonEventEmitter as eventEmitter } from "../main";

import useConfirmStore from "../store/confirmStore";
import type { OpenConfirmProps } from "../store/confirmStore";
export function useConfirm() {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const open = ({ content, confirmText, cancelText }: OpenConfirmProps) => {
    return new Promise((resolve) => {
      eventEmitter.on("confirm-result", (isConfirmed: boolean) =>
        resolve(isConfirmed)
      );
      openConfirm({ content, confirmText, cancelText });
    });
  };

  return {
    open,
  };
}
