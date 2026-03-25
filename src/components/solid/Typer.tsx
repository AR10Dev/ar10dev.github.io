import type { Component } from "solid-js";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import type { TyperProps, TypewriterDirection } from "./types";

/**
 * A Solid.js component that displays a text typing animation with a variety of options
 * for customization.
 *
 * @param {TyperProps} props - The component props used to provide the text and
 * customize the typewriter animation. Defined by the ```TyperProps``` interface.
 *
 * Example usage:
 * ```jsx
 * <Typer text="Hello World" loop />
 * ```
 *
 * Advanced usage:
 * ```jsx
 * <Typer
 *     text={[ "Wake up, Neo...", "The Matrix has you...", "Follow the white rabbit.","Knock, knock, Neo." ]}
 *     backspaceSpeed={30}
 *     typingSpeed={100}
 *     onFinish={callback}
 * />
 * ```
 */
const Typer: Component<TyperProps> = ({
  className,
  cursorClassName = "cursor",
  text,
  loop,
  cursor,
  startDelay,
  typingSpeed = 120,
  backspaceSpeed = 70,
  typingPause = 1200,
  backspacePause = 400,
  onTypingEnd,
  onBackspaceEnd,
  onFinish,
}: TyperProps) => {
  // Check if text props are an array (multiple lines) or a string (single line)
  const singleLine: boolean = typeof text === "string";
  // The current text displayed within the <span>
  const [currentText, setCurrentText] = createSignal<string>("");
  // The current line selected from the text prop.
  const [currentLine, setCurrentLine] = createSignal<string>("");
  // The index number used to select the current line.
  const [currentLineIndex, setCurrentLineIndex] = createSignal<number>(0);
  // The current direction of the typewriter
  const [direction, setDirection] =
    createSignal<TypewriterDirection>("forward");
  // Variable for when the typing has finished
  const [finished, setFinished] = createSignal(false);
  // Variable for when the typewriter is paused
  const [paused, setPaused] = createSignal(false);
  let timerId: number | undefined;

  const scheduleNextTick = (delay: number) => {
    timerId = window.setTimeout(() => {
      if (finished()) {
        return;
      }

      if (paused()) {
        setPaused(false);
        scheduleNextTick(
          direction() === "forward" ? backspacePause : typingPause,
        );
        return;
      }

      typewrite();
      scheduleNextTick(
        direction() === "forward" ? typingSpeed : backspaceSpeed,
      );
    }, delay);
  };

  onMount(() => {
    const initialLine = typeof text === "string" ? text : (text[0] ?? "");
    setCurrentLine(initialLine);

    // If no text is provided, avoid running an empty loop.
    if (!initialLine) {
      setFinished(true);
      return;
    }

    scheduleNextTick(startDelay ?? typingSpeed);
  });

  onCleanup(() => {
    // Cleanup component to end the loop when it is unmounted
    setFinished(true);
    if (timerId !== undefined) {
      window.clearTimeout(timerId);
    }
  });

  /**
   * Run a single typing animation, forwards or backwards
   */
  function typewrite() {
    if (direction() === "forward") {
      handleForwardTyping();
    } else {
      handleBackSpace();
    }
  }

  /**
   * Control actions of the typewriter typing forwards. It adds a new character if typing should be continued,
   * otherwise it changes direction to begin typing backward or calls the method to finish typing.
   */
  function handleForwardTyping() {
    // Currently typing forward, so check if it is at the end of the line.
    if (currentText().length === currentLine().length) {
      // The current line is finished, check what needs to be done next.
      if (singleLine || currentLineIndex() + 1 === text.length) {
        // Currently on final line, so loop it or finish...
        if (loop) {
          // Looping so change the direction to backspace typing
          setDirection("backward");
          // Since we have changed direction, we could run a pause here...
          setPaused(true);
        } else {
          setFinished(true);
          onFinish?.();
        }
      } else {
        // It must be in a loop, so we can confidently shift to backspace typing...
        setDirection("backward");
        // Since we have changed direction, we could run a pause here...
        setPaused(true);
      }
      // If there is a lineAction provided, here is where to call it...
      onTypingEnd?.();
    } else {
      // Since we are not at the beginning, simply add a character
      setCurrentText(currentLine().substring(0, currentText().length + 1)); // Update the displayed text
    }
  }

  /**
   * Control actions of the typewriter typing backwards. It removes a single character if characters exist,
   * otherwise it changes direction to begin typing forward and switches to the appropriate line if using
   * multiple lines.
   */
  function handleBackSpace() {
    // Currently typing backward, so check if a line is back at the start.
    if (currentText().length === 0) {
      // Backspace ended, now at start of line
      if (!singleLine) {
        // Multiple lines, so we need to change lines.
        if (currentLineIndex() + 1 === text.length) {
          // Reset back to the first line
          setCurrentLineIndex(0);
          setCurrentLine(text[0]);
        } else {
          // Move to the next line...
          const nextLineIndex = currentLineIndex() + 1;
          setCurrentLineIndex(nextLineIndex);
          setCurrentLine(text[nextLineIndex]);
        }
      }
      // We are at the beginning so we need to change direction, and switch lines if using multiple lines
      setDirection("forward"); // Change direction
      // Since we have changed direction, we could run a pause here...
      setPaused(true);
      // Call the onBackspaceEnd() method if it exists.
      onBackspaceEnd?.();
    } else {
      // Since we are not at the beginning, simply remove a character.
      setCurrentText(currentLine().substring(0, currentText().length - 1)); // Update the displayed text
    }
  }

  return (
    <span class={className}>
      {currentText()}
      <Show when={cursor && !finished()}>
        <span class={cursorClassName}>|</span>
      </Show>
    </span>
  );
};

export default Typer;
