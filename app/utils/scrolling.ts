import { RefObject } from "react";

export const scrollToBottom = (
  ref: RefObject<HTMLDivElement>,
  behavior: ScrollOptions["behavior"],
  block: ScrollIntoViewOptions["block"]
) => ref.current?.scrollIntoView({ behavior, block });
