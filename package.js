Package.describe({
  name: 'creatorkuang:wechat-share',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use(['ecmascript',
    'react@0.14.1_1',
    'froatsnook:request',
    'jparker:crypto-sha1'
  ]);

  api.addFiles('client/weixin.js','client');
  api.addFiles('client/wechatShare.jsx','client');
  api.addFiles('server/method.js','server');
  api.export('WechatShare');
});