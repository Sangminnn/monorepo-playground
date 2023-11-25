import { SingleTonEventEmitter as eventEmitter } from "../main";
import useConfirmStore from "../store/confirmStore";

export function useConfirm() {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const open = (content: React.ReactNode) => {
    return new Promise((resolve) => {
      eventEmitter.on("confirm-result", (isConfirmed: boolean) =>
        resolve(isConfirmed)
      );
      openConfirm(content);
    });
  };

  return {
    open,
  };
}
