import { COMMANDS, LISTED_COMMANDS } from "./commands";

const VALID_COMMANDS = ["clear", ...Object.keys(COMMANDS)];

export function commandExists(input: string): boolean {
  const cmd = input.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  return cmd === "" || VALID_COMMANDS.includes(cmd);
}

/** Returns matches for tab completion (only from listed commands) */
export function getTabCompletionMatches(input: string): string[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];
  return LISTED_COMMANDS.filter((c) => c.startsWith(trimmed)).sort();
}

/** Returns the suffix to show as shadow hint when exactly one match (e.g. "elp" when "h" and "help" matches) */
export function getTabCompletionSuggestion(input: string): string | null {
  const matches = getTabCompletionMatches(input);
  if (matches.length !== 1) return null;
  const trimmed = input.trim().toLowerCase();
  const match = matches[0]!;
  return match.length > trimmed.length ? match.slice(trimmed.length) : null;
}

export function handleTabCompletion(
  input: string,
  setCommand: (value: string) => void,
  setTabSuggestions: (v: string[] | null) => void,
): void {
  const matches = getTabCompletionMatches(input);
  if (matches.length === 1) {
    setCommand(matches[0]!);
    setTabSuggestions(null);
  } else if (matches.length > 1) {
    setTabSuggestions(matches);
  } else {
    setTabSuggestions(null);
  }
}
