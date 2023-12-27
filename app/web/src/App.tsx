import { Button, Tooltip, Spacing } from "@web-client/common";

import Confirm from "./components/confirm/Confirm";

import useConfirmStore from "./store/confirmStore";
import { useShallow } from "zustand/react/shallow";

import { useConfirm } from "./hooks/useConfirm";

function App() {
  const confirm = useConfirm();
  const { closeConfirm } = useConfirmStore(
    useShallow((state) => ({
      closeConfirm: state.closeConfirm,
    }))
  );

  const confirmClick = async () => {
    const isConfirmed = await confirm.open({
      content: <div>테스트입니다.</div>,
      confirmText: "테스트 확인",
      cancelText: "테스트 취소",
    });

    if (isConfirmed) {
      console.log("확인 완료", isConfirmed);
      closeConfirm();
    } else {
      console.log("실패 완료", isConfirmed);
      closeConfirm();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        width: "1000px",
      }}
    >
      <Button onClick={confirmClick} />
      <Confirm />

      <Spacing height={300} />

      <Tooltip
        placement={"top"}
        space={8}
        content={"테스트입니다."}
        tooltipStyle={{
          backgroundColor: "#666666",
        }}
        closeWhenOtherPlaceClick={false}
      >
        <div>테스트</div>
      </Tooltip>
    </div>
  );
}

export default App;
