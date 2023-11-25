import { SingleTonEventEmitter as eventEmitter } from "../../main";
import useConfirmStore from "../../store/confirmStore";

function Confirm() {
  /** @TODO shallow option 추가하기 */
  const { isOpen, content } = useConfirmStore((state) => ({
    isOpen: state.isOpen,
    content: state.content,
  }));

  return isOpen ? (
    <section>
      <p>{content}</p>
      <button onClick={() => eventEmitter.emit("confirm-result", true)}>
        확인
      </button>
      <button onClick={() => eventEmitter.emit("confirm-result", false)}>
        취소
      </button>
    </section>
  ) : null;
}

export default Confirm;
