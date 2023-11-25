import { Button } from "@web-client/common";

import Confirm from "./components/confirm/Confirm";

import useConfirmStore from "./store/confirmStore";

import { useConfirm } from "./hooks/useConfirm";

function App() {
  const confirm = useConfirm();
  const { closeConfirm } = useConfirmStore((state) => ({
    closeConfirm: state.closeConfirm,
  }));

  const confirmClick = async () => {
    const isConfirmed = await confirm.open(<div>테스트입니다.</div>);

    if (isConfirmed) {
      console.log("확인 완료", isConfirmed);
      closeConfirm();
    } else {
      console.log("실패 완료", isConfirmed);
      closeConfirm();
    }
  };

  return (
    <>
      <Button onClick={confirmClick} />
      <Confirm />
    </>
  );
}

export default App;
