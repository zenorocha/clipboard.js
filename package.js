// Package metadata for Meteor.js.

Package.describe({
  name: "zenorocha:clipboard",
  summary: "Modern copy to clipboard. No Flash. Just 2kb.",
  version: "1.5.5",
  git: "https://github.com/zenorocha/clipboard.js"
});

Package.onUse(function(api) {
  api.addFiles("dist/clipboard.min.js", "client");
});
