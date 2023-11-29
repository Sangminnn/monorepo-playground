import { SingleTonEventEmitter as eventEmitter } from "../../main";

import useConfirmStore from "../../store/confirmStore";
import { useShallow } from "zustand/react/shallow";

function Confirm() {
  /** @TODO shallow option 추가하기 */
  const { isOpen, content, confirmText, cancelText } = useConfirmStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      content: state.content,
      confirmText: state.confirmText,
      cancelText: state.cancelText,
    }))
  );

  return isOpen ? (
    <section>
      <div>{content}</div>
      <button onClick={() => eventEmitter.emit("confirm-result", true)}>
        {confirmText}
      </button>
      <button onClick={() => eventEmitter.emit("confirm-result", false)}>
        {cancelText}
      </button>
    </section>
  ) : null;
}

export default Confirm;
