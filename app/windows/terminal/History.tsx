import type { HistoryEntry } from "@store/terminal";
import { Prompt } from "./Prompt";

type HistoryProps = { history: HistoryEntry[] };

export const History = ({ history }: HistoryProps) => (
  <>
    {history.map((entry, index) => (
      <div key={`${entry.command}-${index}`} className="mb-2">
        {entry.command !== "" && (
          <div className="flex gap-2">
            <div className="shrink-0">
              <Prompt />
            </div>
            <span className="text-gray-800">{entry.command}</span>
          </div>
        )}
        {entry.output && (
          <div
            className="whitespace-pre-wrap text-gray-700 leading-relaxed [&_a]:text-blue-600 [&_a]:underline"
            style={{ lineHeight: 1.5 }}
            dangerouslySetInnerHTML={{ __html: entry.output }}
          />
        )}
      </div>
    ))}
  </>
);
