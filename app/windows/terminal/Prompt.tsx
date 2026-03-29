import { TERMINAL_CONFIG } from "@constants";

export const Prompt = () => (
  <span className="font-roboto text-sm text-gray-700 dark:text-gray-300 select-none">
    <span className="text-amber-600">{TERMINAL_CONFIG.ps1_username}</span>
    <span className="text-gray-500 dark:text-gray-400">@</span>
    <span className="text-green-600">{TERMINAL_CONFIG.ps1_hostname}</span>
    <span className="text-gray-500 dark:text-gray-400">:$ ~ </span>
  </span>
);
