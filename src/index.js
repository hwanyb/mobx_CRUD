import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "mobx-react";

import App from "./App";
import MemberStore from "./stores/MemberStore";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
