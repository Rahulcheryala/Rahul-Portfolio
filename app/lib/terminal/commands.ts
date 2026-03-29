import { TERMINAL_CONFIG, techStack } from "@constants";
import { getJoke, getQuote, getWeather } from "./api";
import useWindowStore from "@store/window";
import useTerminalStore from "@store/terminal";

export type CommandExecutor = (args: string[]) => Promise<string> | string;

// ─── Config ──────────────────────────────────────────────────────────────────

const config = TERMINAL_CONFIG;

// ─── Command Metadata ─────────────────────────────────────────────────────────

export const COMMAND_DESCRIPTIONS: Record<string, string> = {
  help: "You are looking at it!",
  about: "About me",
  banner: "Show welcome banner",
  sumfetch: "Summary card",
  skills: "Show tech stack",
  resume: "Open resume",
  email: "Open email client",
  github: "Open GitHub profile",
  linkedin: "Open LinkedIn profile",
  echo: "Print arguments",
  whoami: "Print username",
  date: "Current date & time",
  vi: "Vi editor",
  vim: "Vim editor",
  nvim: "Neovim editor",
  emacs: "Emacs editor",
  quote: "Random quote",
  weather: "Weather for city",
  joke: "Programming joke",
  clear: "Clear terminal",
  exit: "Close terminal window",
};

/** Commands shown in help and available for tab completion */
export const LISTED_COMMANDS = [
  // about me
  "about",
  "sumfetch",
  "resume",
  "email",
  "github",
  "linkedin",
  "skills",
  // general
  "whoami",
  "help",
  "banner",
  "clear",
  "date",
  "echo",
  "exit",
  "quote",
  "weather",
  "vi",
  "vim",
  "nvim",
  "emacs",
] as const;

/** Hidden Easter-egg commands – work but not listed in help */
const HIDDEN_COMMANDS = ["sudo", "joke", "party", "beer"] as const;

// ─── Assets ───────────────────────────────────────────────────────────────────

const COMPUTER_ASCII = [
  "             ,----------------,              ,---------,",
  '        ,-----------------------,          ,"        ,"|',
  '      ,"                      ,"|        ,"        ,"  |',
  '     +-----------------------+  |      ,"        ,"    |',
  "     |  .-----------------.  |  |     +---------+      |",
  "     |  |                 |  |  |     | -==----'|      |",
  "     |  |  I LOVE DOS!    |  |  |     |         |      |",
  "     |  |  Bad command or |  |  |/----|`---=    |      |",
  "     |  |  C:\\>_          |  |  |   ,/|==== ooo |      ;",
  '     |  |                 |  |  |  // |(((( [33]|    ,"',
  "     |  `-----------------'  |,\" .;'| |((((     |  ,\"",
  '     +-----------------------+  ;;  | |         |,"',
  "        /_)______________(_/  //'   | +---------+",
  "   ___________________________/___  `,",
  '  /  oooooooooooooooo  .o.  oooo /,   \\,"-----------',
  ' / ==ooooooooooooooo==.o.  ooo= //   ,`\\--{)B     ,"',
  "/_==__==========__==_ooo__ooo=_/'   /___________,\"",
  "`-----------------------------'",
].join("\n");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cmd(
  fn: (args: string[]) => Promise<string> | string,
): CommandExecutor {
  return fn;
}

// ─── Commands ─────────────────────────────────────────────────────────────────

// --- Display & Info ---

const banner = cmd((): string => {
  return `
<pre class="font-geist-mono text-amber-600 whitespace-pre text-sm sm:text-base">
██████╗  █████╗ ██╗  ██╗██╗   ██╗██╗
██╔══██╗██╔══██╗██║  ██║██║   ██║██║
██████╔╝███████║███████║██║   ██║██║
██╔══██╗██╔══██║██╔══██║██║   ██║██║
██║  ██║██║  ██║██║  ██║╚██████╔╝███████╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
</pre>

Type <span class="text-amber-600">help</span> for commands. Type <span class="text-amber-600">sumfetch</span> for summary.
`;
});

const help = cmd(async (): Promise<string> => {
  const entries = LISTED_COMMANDS.filter((c) => c !== "banner").map(
    (name) =>
      `<span class="text-amber-600">${name}</span><span class="text-gray-600 dark:text-gray-400">${COMMAND_DESCRIPTIONS[name] ?? ""}</span>`,
  );
  const half = Math.ceil(entries.length / 2);
  const rows = entries.slice(0, half).map((left, i) => {
    const right = entries[half + i];
    return `<span class="help-cmd-cell">${left}</span>${right ? `<span class="help-cmd-cell">${right}</span>` : ""}`;
  });

  return `<span class="text-gray-800 dark:text-gray-200">Welcome! Available commands:</span>

<div class="help-commands-grid">
${rows.join("\n")}
</div>

<span class="text-gray-600 dark:text-gray-400">[tab]</span> completion  <span class="text-gray-600 dark:text-gray-400">[ctrl+l]</span>/<span class="text-amber-600">clear</span> clear terminal

Type <span class="text-amber-600">sumfetch</span> for summary.`;
});

const sumfetch = cmd(async (): Promise<string> => {
  const computerEscaped = escapeHtml(COMPUTER_ASCII);
  const statsEntries = Object.entries(config.sumfetch).map(
    ([key, val]) =>
      `<span><span class="text-amber-600">${escapeHtml(key)}</span>: ${escapeHtml(val)}</span>`,
  );
  return `
<div class="ml-6 flex flex-col gap-4">
  <div class="flex flex-wrap gap-10 items-start">
    <pre class="font-geist-mono text-amber-600 whitespace-pre text-sm sm:text-base">${computerEscaped}</pre>
    <div class="flex flex-col gap-2 font-roboto text-sm">
      <span class="text-amber-600 font-bold text-lg">${config.name}</span>
      <div class="flex flex-col gap-0.5 mt-2 text-gray-700 dark:text-gray-300">
        ${statsEntries.join("\n        ")}
      </div>
      <span class="text-gray-600 dark:text-gray-400 mt-2">Type <span class="text-amber-600">resume</span> to open resume</span>
      <div class="flex flex-col gap-y-3 text-sm text-gray-600 dark:text-gray-400 pt-2">
        <a class="text-blue-600 dark:text-blue-400 hover:underline" href="mailto:${config.email}" target="_blank" rel="noopener noreferrer">${config.email}</a>
        <a class="text-blue-600 dark:text-blue-400 hover:underline" href="${config.repo}" target="_blank" rel="noopener noreferrer">github/${config.social.github}</a>
        <a class="text-blue-600 dark:text-blue-400 hover:underline" href="https://linkedin.com/in/${config.social.linkedin}" target="_blank" rel="noopener noreferrer">linkedin/${config.social.linkedin}</a>
      </div>
    </div>
  </div>
</div>
`;
});

const about = cmd(async (): Promise<string> => {
  return `<span class="text-gray-800 dark:text-gray-200">Hi, I am ${config.name}.</span>

Full-stack engineer who enjoys turning caffeine and vague product ideas into scalable software.
Curious by nature, slightly obsessed with clean systems, and happiest when things don&apos;t break in production.

<span class="text-amber-600">sumfetch</span> - short summary
<span class="text-green-600">resume</span> - open resume window`;
});

const skills = cmd(async (): Promise<string> => {
  const start = typeof performance !== "undefined" ? performance.now() : 0;
  const labelRow = `<div class="skills-label flex gap-4 mb-1"><span class="text-amber-600 w-32">Category</span><span class="text-amber-600">Technologies</span></div>`;
  const contentRows = techStack
    .map(
      ({ category, items }) =>
        `<div class="skills-row flex gap-4 items-start"><span class="text-green-600 w-32">✓ ${category}</span><span class="text-gray-700 dark:text-gray-300">${items.join(", ")}</span></div>`,
    )
    .join("");
  const renderMs =
    typeof performance !== "undefined"
      ? Math.round(performance.now() - start)
      : 0;
  const footnote = `<div class="skills-footnote flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400"><span>✓ ${techStack.length} of ${techStack.length} loaded successfully (100%)</span><span class="text-gray-800 dark:text-gray-200">Render time: ${renderMs}ms</span></div>`;

  return `<span class="text-gray-800 dark:text-gray-200 font-bold">@${config.ps1_username} %</span> <span class="text-gray-700 dark:text-gray-300">show tech stack</span>

${labelRow}
${contentRows}
${footnote}`;
});

// --- Navigation / Window ---

const resume = cmd(async (): Promise<string> => {
  if (typeof window !== "undefined") {
    useWindowStore.getState().openWindow("resume");
  }
  return '<span class="text-gray-800 dark:text-gray-200">Opening resume window...</span>';
});

const email = cmd(async (): Promise<string> => {
  if (typeof window !== "undefined") window.open(`mailto:${config.email}`);
  return `Opening mailto:<span class="text-blue-600 dark:text-blue-400">${config.email}</span>...`;
});

const github = cmd(async (): Promise<string> => {
  if (typeof window !== "undefined")
    window.open(`https://github.com/${config.social.github}/`);
  return '<span class="text-gray-800 dark:text-gray-200">Opening github...</span>';
});

const linkedin = cmd(async (): Promise<string> => {
  if (typeof window !== "undefined")
    window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
  return '<span class="text-gray-800 dark:text-gray-200">Opening linkedin...</span>';
});

const exit = cmd(async (): Promise<string> => {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      useTerminalStore.getState().resetTerminal();
      useWindowStore.getState().closeWindow("terminal");
    }, 100);
  }
  return '<span class="text-gray-600 dark:text-gray-400">Closing terminal...</span>';
});

// --- Utilities ---

const echo = cmd(async (args: string[]): Promise<string> => args.join(" "));
const whoami = cmd(async (): Promise<string> => config.ps1_username);
const date = cmd(async (): Promise<string> => new Date().toString());

// --- Editor jokes ---

const vi = cmd(
  async (): Promise<string> =>
    "<span class=\"text-gray-600 dark:text-gray-400\">woah, you still use 'vi'? just try 'vim'.</span>",
);
const vim = cmd(
  async (): Promise<string> =>
    "<span class=\"text-gray-600 dark:text-gray-400\">'vim' is so outdated. how about 'nvim'?</span>",
);
const nvim = cmd(
  async (): Promise<string> =>
    "<span class=\"text-gray-600 dark:text-gray-400\">'nvim'? too fancy. why not 'emacs'?</span>",
);
const emacs = cmd(
  async (): Promise<string> =>
    '<span class="text-gray-600 dark:text-gray-400">you know what? just use vscode.</span>',
);

// --- API-backed ---

const quote = cmd(async (): Promise<string> => getQuote());

const weather = cmd(async (args: string[]): Promise<string> => {
  const city = args.join(" ");
  if (!city)
    return '<span class="text-amber-600">Usage:</span> weather [city]. <span class="text-gray-600 dark:text-gray-400">Example: weather london</span>';
  return getWeather(city);
});

const joke = cmd(async (): Promise<string> => getJoke());

// --- Easter eggs ---

const sudo = cmd(async (): Promise<string> => {
  if (typeof window !== "undefined")
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  return '<span class="text-amber-600">Permission denied: with little power comes... no responsibility?</span>';
});

const party = cmd(async (): Promise<string> => {
  if (typeof window !== "undefined") {
    useTerminalStore.getState().setShowConfetti(true);
    setTimeout(() => useTerminalStore.getState().setShowConfetti(false), 5000);
  }
  return '<span class="text-amber-600">🎉 Party time!</span>';
});

const beer = cmd(async (): Promise<string> => {
  return '<span class="text-gray-600 dark:text-gray-400">Nope i don\'t drink</span>';
});

// ─── Command Registry ─────────────────────────────────────────────────────────

export const COMMANDS: Record<string, CommandExecutor> = {
  // display & info
  banner,
  help,
  sumfetch,
  about,
  skills,
  // navigation / window
  resume,
  email,
  github,
  linkedin,
  exit,
  // utilities
  echo,
  whoami,
  date,
  // editor jokes
  vi,
  vim,
  nvim,
  emacs,
  // api-backed
  quote,
  weather,
  joke,
  // easter eggs
  sudo,
  party,
  beer,
};

// ─── Public Helpers ───────────────────────────────────────────────────────────

export function getCommand(name: string): CommandExecutor | null {
  return COMMANDS[name.toLowerCase()] ?? null;
}

export function isApiCommand(name: string): boolean {
  return ["quote", "weather", "joke"].includes(name.toLowerCase());
}

export function getBanner(): string {
  return (COMMANDS.banner([]) as string).trim();
}

// ─── Command Executor ─────────────────────────────────────────────────────────

export async function executeCommand(
  raw: string,
  onOutput: (command: string, output: string) => void,
  onCommandClear: () => void,
  onClearScreen: () => void,
  onExecuting?: (v: boolean) => void,
): Promise<void> {
  const trimmed = raw.trim();
  const args = trimmed ? trimmed.split(/\s+/) : [];
  const cmdName = args[0]?.toLowerCase() ?? "";

  if (cmdName === "clear") {
    onClearScreen();
    onCommandClear();
    return;
  }

  if (!trimmed) {
    onOutput("", "");
    onCommandClear();
    return;
  }

  const executor = getCommand(cmdName);
  if (!executor) {
    onOutput(
      trimmed,
      `<span class="text-red-600 dark:text-red-400">shell: command not found: ${cmdName}</span>. Try <span class="text-amber-600">help</span>`,
    );
    onCommandClear();
    return;
  }

  const isApi = isApiCommand(cmdName);
  if (isApi) onExecuting?.(true);

  try {
    const output = await executor(args.slice(1));
    onOutput(trimmed, typeof output === "string" ? output : String(output));
  } catch (err) {
    onOutput(
      trimmed,
      `<span class="text-red-600 dark:text-red-400">Error:</span> ${err instanceof Error ? err.message : String(err)}`,
    );
  } finally {
    if (isApi) onExecuting?.(false);
  }

  onCommandClear();
}
