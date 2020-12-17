module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: ["airbnb-base", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": "off",
        "no-console": "off",
        "no-alert": "off",
        "spaced-comment": "off",
        "no-else-return": "off",
    },
};