import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add icons from Remix icon (as used in the design)
const linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css";
document.head.appendChild(linkElement);

// Add title
const titleElement = document.createElement("title");
titleElement.textContent = "Secure Next-of-Kin Vault";
document.head.appendChild(titleElement);

createRoot(document.getElementById("root")!).render(<App />);
