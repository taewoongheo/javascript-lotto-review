/**
 * @template {T}
 */
class Validator {
  /** @type {T} */
  #value;

  /**
   *
   * @param {T} value
   * @returns {Validator<T>}
   */
  validate(value) {
    this.#value = value;

    return this;
  }

  /**
   *
   * @param {(value:T) => boolean} condition
   * @param {{ message: string }} error
   * @returns {Validator<T>}
   */
  with(condition, error) {
    const { message } = error;
    if (!condition(this.#value)) {
      throw new Error(`${message}`);
    }

    return this;
  }
}

export default Validator;
