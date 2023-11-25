import { Button } from "@web-client/common";

import Confirm from "./components/confirm/Confirm";
import { useConfirm } from "./hooks/useConfirm";

function App() {
  const confirm = useConfirm();

  const confirmClick = async () => {
    await confirm.open(<div>테스트입니다.</div>);
  };

  return (
    <>
      <Button onClick={confirmClick} />
      <Confirm />
    </>
  );
}

export default App;
