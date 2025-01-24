class ValidationContext {
  /**
   *
   * @param {ValidationStrategy} strategy
   */
  validate(strategy) {
    strategy.validate();
  }
}

export default ValidationContext;
