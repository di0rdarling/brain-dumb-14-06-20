import * as React from "react";
import Homepage from "./components/homepage";
import GlobalBoardProvider from "./context/globalBoardProvider";
import BoardProvider from "./context/boardContext";

export default function App() {
  return (
    <BoardProvider>
      <GlobalBoardProvider>
        <Homepage />
      </GlobalBoardProvider>
    </BoardProvider>
  );
}
