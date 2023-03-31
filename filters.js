import { filterType } from "./filterType.js";

export class Filters {
  static get TITLE_MORE_THAN_THREE_CHARS() {
    return filterType.TITLE_MORE_THAN_THREE_CHARS;
  }

  static get USER_ID_FOUR() {
    return filterType.USER_ID_FOUR;
  }

}

export default Filters;
