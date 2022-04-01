import _ from "lodash";

export default class {
  #name = _.random();
  #name1 = _.random();
  age = 10;
  constructor(name) {
    this.#name = name;
  }
}
