/// <reference lib="dom"/>

type Action = 'cut' | 'copy';
type Response = 'success' | 'error';
type CopyActionOptions = {
  container?: Element;
};

/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */
declare class ClipboardJS {
  constructor(
    selector: string | Element | NodeListOf<Element>,
    options?: ClipboardJS.Options
  );

  /**
   * Subscribes to events that indicate the result of a copy/cut operation.
   * @param type Event type ('success' or 'error').
   * @param handler Callback function.
   */
  on(type: Response, handler: (e: ClipboardJS.Event) => void): this;

  on(type: string, handler: (...args: any[]) => void): this;

  /**
   * Clears all event bindings.
   */
  destroy(): void;

  /**
   * Checks if clipboard.js is supported
   */
  static isSupported(): boolean;


  /**
   * Fires a copy action
   */
  static copy(target: string | Element, options?: CopyActionOptions): string;

   /**
   * Fires a cut action
   */
  static cut(target: string | Element): string;
}

declare namespace ClipboardJS {
  interface Options {
    /**
     * Overwrites default command ('cut' or 'copy').
     * @param elem Current element
     */
    action?(elem: Element): Action;

    /**
     * Overwrites default target input element.
     * @param elem Current element
     * @returns <input> element to use.
     */
    target?(elem: Element): Element;

    /**
     * Returns the explicit text to copy.
     * @param elem Current element
     * @returns Text to be copied.
     */
    text?(elem: Element): string;

    /**
     * For use in Bootstrap Modals or with any
     * other library that changes the focus
     * you'll want to set the focused element
     * as the container value.
     */
    container?: Element;
  }

  interface Event {
    action: string;
    text: string;
    trigger: Element;
    clearSelection(): void;
  }
}

export = ClipboardJS;

export as namespace ClipboardJS;
