import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const titleElement = document.createElement("title");
titleElement.textContent = "Daniel Egunjobi Ololade | Authority Brand";
document.head.appendChild(titleElement);

createRoot(document.getElementById("root")!).render(<App />);
