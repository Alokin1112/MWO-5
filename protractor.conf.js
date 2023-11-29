exports.config = {
  framework: 'jasmine',
  specs: ['./e2e/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--window-size=1920x1080'],
    },
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/', // Update with your app's URL
};