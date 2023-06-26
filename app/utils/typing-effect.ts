import { CSSProperties, useEffect, useState } from "react";

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

interface TypeAnimationProps {
  omitDeletionAnimation: boolean;
  typingSpeed: IntRange<1, 101>;
  style?: CSSProperties;
  pauseLength: number;
  className?: string;
  sequence: string[];
  cursor: boolean;
  repeat: number;
}

export const useTypingEffect = ({
  sequence,
  omitDeletionAnimation,
  typingSpeed,
  pauseLength,
  repeat,
}: TypeAnimationProps) => {
  const [stringToType, setStringToType] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sequence.length <= 1) {
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setStringToType(sequence[index].substring(0, stringToType.length - 1));
      } else {
        setStringToType(sequence[index].substring(0, stringToType.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [stringToType, isDeleting, sequence, index, typingSpeed]);

  useEffect(() => {
    if (sequence.length <= 1) {
      return;
    }

    if (stringToType === sequence[index]) {
      if (loopCount === repeat + 1) {
        return;
      }
      const timeout = setTimeout(() => {
        if (omitDeletionAnimation) {
          setStringToType("");
          setIndex((index + 1) % sequence.length);
          setIsDeleting(false);
          setLoopCount(loopCount + 1);
        } else {
          setIsDeleting(true);
        }
      }, pauseLength);
      return () => clearTimeout(timeout);
    } else if (stringToType === "") {
      const timeout = setTimeout(() => {
        setIndex((index + 1) % sequence.length);
        setIsDeleting(false);
      }, pauseLength);
      return () => clearTimeout(timeout);
    }
  }, [
    index,
    repeat,
    sequence,
    loopCount,
    pauseLength,
    stringToType,
    omitDeletionAnimation,
  ]);

  return stringToType;
};
