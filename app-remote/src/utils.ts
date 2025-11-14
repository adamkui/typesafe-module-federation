import _ from "lodash";

export function formatName(first: string, last: string): string {
  return `${_.capitalize(first)} ${_.capitalize(last)}`.trim();
}

export { _ as lodash };
