import { forceParse } from "../utils/general";
import { useEffect, useState } from "react";
import { Round } from "../components/Round";
import { Message } from "ai";

export const useLatestRound = () => {
  const [message, setMessage] = useState<Message>();
  const [round, setRound] = useState<Round | null>(null);

  useEffect(() => {
    if (!message) return;
    if (message.role === ("system" || "user")) return;
    const completedJSON = forceParse(message.content) as Round;
    if (!completedJSON) return;
    setRound(completedJSON);
  }, [message]);

  return { setMessage, latestRound: round, setRound };
};
