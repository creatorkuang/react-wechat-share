Package.describe({
  name: 'creatorkuang:wechat-share',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'meteor react package for wechat share',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/creatorkuang/react-wechat-share.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use(['ecmascript',
    'react@0.14.1_1',
    'froatsnook:request@2.40.5',
    'jparker:crypto-sha1@0.1.0'
  ]);

  api.addFiles('client/weixin.js','client');
  api.addFiles('client/wechatShare.jsx','client');
  api.addFiles('server/method.js','server');
  api.export('WechatShare');
});
