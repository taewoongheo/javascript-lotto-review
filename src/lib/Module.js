/**
 * @typedef {new (...args: any[]) => any} ClassConstructor
 */

/**
 * @typedef {Record<string, any>} InstantiatedModules
 */

/**
 * @typedef {object} ApplicationLayers
 * @property {Array<ClassConstructor>} models - Array of model constructors
 * @property {Array<ClassConstructor>} views - Array of view constructors
 * @property {Array<ClassConstructor>} controllers - Array of controller constructors
 * @property {Array<ClassConstructor>} services - Array of service constructors
 * @property {Array<ClassConstructor>=} providers - Array of provider constructors
 */

class Module {
  /** @type {Array<ClassConstructor>} */
  #Models;

  /** @type {Array<ClassConstructor>} */
  #Views;

  /** @type {Array<ClassConstructor>} */
  #Controllers;

  /** @type {Array<ClassConstructor>} */
  #Services;

  /** @type {Array<ClassConstructor>=} */
  #Providers;

  /**
   *
   * @param {Array<ClassConstructor>=} Objects
   * @param {InstantiatedModules=} dependencies
   * @returns {InstantiatedModules}
   */
  static generate(Objects, dependencies) {
    const instantiatedObjects = {};

    if (!Objects) {
      return instantiatedObjects;
    }

    Objects.forEach((Object) => {
      instantiatedObjects[Object.name] = new Object(dependencies);
    });

    return instantiatedObjects;
  }

  /**
   *
   * @param {ApplicationLayers} dependencies
   */
  constructor({ models, views, controllers, services, providers }) {
    this.#Models = models;
    this.#Views = views;
    this.#Controllers = controllers;
    this.#Services = services;
    this.#Providers = providers;
  }

  /**
   *
   * @returns {{ instantiatedModels: InstantiatedModules; instantiatedViews: InstantiatedModules; instantiatedProviders: InstantiatedModules; }}
   */
  #instantiateIndependantModules() {
    return {
      instantiatedModels: Module.generate(this.#Models),
      instantiatedViews: Module.generate(this.#Views),
      instantiatedProviders: Module.generate(this.#Providers),
    };
  }

  /**
   *
   * @param {InstantiatedModules} instantiatedModels
   * @param {InstantiatedModules} instantiatedProviders
   * @returns {InstantiatedModules}
   */
  #instantiateServiceModules(instantiatedModels, instantiatedProviders) {
    return Module.generate(this.#Services, {
      models: instantiatedModels,
      providers: instantiatedProviders,
    });
  }

  /**
   *
   * @returns {{ instantiatedViews: InstantiatedModules; instantiatedServices: InstantiatedModules }}
   */
  #instantiateModules() {
    const { instantiatedModels, instantiatedViews, instantiatedProviders } =
      this.#instantiateIndependantModules();

    const instantiatedServices = this.#instantiateServiceModules(
      instantiatedModels,
      instantiatedProviders,
    );

    return { instantiatedViews, instantiatedServices };
  }

  async init() {
    const { instantiatedViews, instantiatedServices } =
      this.#instantiateModules();

    const promises = this.#Controllers.map(async (Controller) => {
      const controller = new Controller({
        views: instantiatedViews,
        services: instantiatedServices,
      });

      await controller.init();
    });

    await Promise.all(promises);
  }
}

export default Module;
