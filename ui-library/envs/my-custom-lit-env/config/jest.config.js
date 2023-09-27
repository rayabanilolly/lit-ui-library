// Override the Jest config to ignore transpiling from specific folders
    // See the base Jest config: https://bit.cloud/teambit/react/react/~code/jest/jest.config.js
    
    const { generateNodeModulesPattern } = require('@teambit/dependencies.modules.packages-excluder');
    const { litJestConfig } = require('@teambit/web-components.lit');
    
    const packagesToTransform = [
      "lit",
      "@lit",
      "testing-library__dom",
      "@open-wc",
      "lit-html",
      "lit-element",
      "pure-lit",
      "lit-element-state-decoupler"
      // add your packages here, e.g. @my-org (no need to list specific components, anything under @my-org will be captured)
    ];
    
    const transformIgnorePatterns = generateNodeModulesPattern({ packages: packagesToTransform, excludeComponents: true });
    const config = {
      ...litJestConfig,
      transformIgnorePatterns: [
        '^.+.module.(css|sass|scss)$',
        transformIgnorePatterns
      ]
    };

    module.exports = config;