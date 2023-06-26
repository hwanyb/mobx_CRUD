import React from "react";

import MemberTable from "./components/MemberTable";
import { Provider } from "mobx-react";
import { memberStore } from "./stores/MemberStore";

export default function App() {
  return (
    <Provider memberStore={memberStore}>
      <MemberTable />
    </Provider>
  );
}
