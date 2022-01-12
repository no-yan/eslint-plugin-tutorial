import { Rule } from "eslint";
import { Identifier } from "estree";
// import {type JSXIdentifier } from 'estree-jsx';

const chakraComponentGroup = [
  ["Box", true],
  ["Flex", true],
  ["Button", true],
] as const;
const chakraMap = new Map<string, boolean>(chakraComponentGroup);

const isChakraComponent = (node: Identifier) => {
  const componentName = node.name;
  const doesExist = chakraMap.get(componentName);
  if (doesExist) {
    return true;
  }
  return false;
};

const rule: Rule.RuleModule = {
  create: context => {
    return {
      "JSXIdentifier[name=/^[A-Z].*/]": (node: Identifier) => {
        if (!isChakraComponent(node)) {
          context.report({ message: "Don't use 'non-chakra Component'", node });
        }
      },
    };
  },
};

export = rule;
