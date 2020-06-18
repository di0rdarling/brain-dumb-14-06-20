import * as React from "react";
import Homepage from "./components/homepage";
import BoardProvider from "./context/boardContext";

export default function App() {
  return (
    <BoardProvider>
      <Homepage />
    </BoardProvider>
  );
}
