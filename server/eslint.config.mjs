import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from 'eslint-config-prettier';


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  prettier,
];