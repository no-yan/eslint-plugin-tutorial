import { RuleTester } from "eslint";
import rule from "./only-chakra";
const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: { ecmaFeatures: { jsx: true } },
});

tester.run("", rule, {
  valid: [
    { code: "(props: Props) =><Box>hello</Box>" },
    { code: "(props: Props) =><Button>hello</Button>" },
    { code: "(props: Props) =><Box>hello</Box>" },
  ],
  invalid: [{ code: "(props: Props) =><Div/>", errors: [{ message: "Don't use 'non-chakra Component'" }] }],
});
