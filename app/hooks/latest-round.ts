import { useEffect, useState } from "react";
import { Round } from "../components/Round";
import { forceParse } from "../_utils/general";
import { Message } from "ai";

export const useLatestRound = () => {
  const [message, setMessage] = useState<Message>();
  const [round, setRound] = useState<Round>();

  useEffect(() => {
    if (!message) return;
    if (message.role === ("system" || "user")) return;
    const completedJSON = forceParse(message.content);
    // console.log("completedJSON", completedJSON);
    try {
      const parsedRound: Round = JSON.parse(completedJSON);
      if (parsedRound) setRound(parsedRound);
    } catch (e) {
      // console.log("e", e);
    }
  }, [message]);

  return { setMessage, latestRound: round };
};
