/// <reference lib="dom"/>

import { TinyEmitter } from 'tiny-emitter';

type Action = 'cut' | 'copy';

type Target = string | HTMLElement;

type Trigger = string | HTMLElement | HTMLCollection | NodeList;

type Options = {
  emmiter?: TinyEmitter;
  text?: string;
  action?: Action;
  target?: Element;
  trigger?: Trigger;
  container?: Element;
  selectedText?: string;
};

/**
 * Inner class which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 */
export declare class ClipboardAction {
  constructor(options: Options);
  /**
   * Defines base properties passed from constructor.
   */
  // better define the type of options
  resolveOptions(options: Options): void;
  /**
   * Decides which selection strategy is going to be applied based
   * on the existence of `text` and `target` properties.
   */
  initSelection(): void;
  /**
   * Creates a fake textarea element, sets its value from `text` property,
   * and makes a selection on it.
   */
  selectFake(): void;
  /**
   * Only removes the fake element after another click event, that way
   * a user can hit `Ctrl+C` to copy because selection still exists.
   */
  removeFake(): void;
  /**
   * Selects the content from element passed on `target` property.
   */
  selectTarget(): void;
  /**
   * Executes the copy operation based on the current selection.
   */
  copyText(): void;
  /**
   * Fires an event based on the copy operation result.
   */
  handleResult(succeeded: boolean): void;
  /**
   * Moves focus away from `target` and back to the trigger, removes current selection.
   */
  clearSelection(): void;
  /**
   * Sets the `action` to be performed which can be either 'copy' or 'cut'.
   */
  /**
   * Sets the `action` to be performed which can be either 'copy' or 'cut'.
   */
  action: Action;
  /**
   * Sets the `target` property using an element
   * that will be have its content copied.
   */
  target: Target;
  /**
   * Sets the `target` property using an element
   * that will be have its content copied.
   */
  /**
   * Destroy lifecycle.
   */
  destroy(): void;
}

/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */
export declare class ClipboardJS {
  constructor(trigger: Trigger, options?: Options);
  /**
   * Defines if attributes would be resolved using internal setter functions
   * or custom functions that were passed in the constructor.
   */
  resolveOptions(options: Options): void;
  /**
   * Adds a click event listener to the passed trigger.
   */
  listenClick(trigger: Trigger): void;
  /**
   * Defines a new `ClipboardAction` on each click event.
   */
  onClick(e: Event): void;
  /**
   * Default `action` lookup function.
   */
  defaultAction(trigger: Trigger): string | undefined;
  /**
   * Default `target` lookup function.
   */
  // check the return here
  defaultTarget(trigger: Trigger): void;
  /**
   * Returns the support of the given action, or all actions if no action is
   * given.
   */
  static isSupported(action?: Action): boolean;
  /**
   * Default `text` lookup function.
   */
  defaultText(trigger: Trigger): string | undefined;
  /**
   * Destroy lifecycle.
   */
  destroy(): void;
}

/**
 * Helper function to retrieve attribute value.
 */
export declare function getAttributeValue(
  suffix: string,
  element: Element
): string | undefined;

export default ClipboardJS;
