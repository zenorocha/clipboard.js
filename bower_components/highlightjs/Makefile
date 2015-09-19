VERSION=8.8.0

default: build
	@cp -f build/highlight.* .
	@cp -f highlight/src/styles/* styles
	@du -hs highlight.*

build: highlight
	@cd highlight && git fetch && git checkout $(VERSION)
	@cd highlight && npm install
	@mkdir -p build
	@cd highlight && node tools/build.js && cp build/highlight.pack.js ../build/highlight.pack.min.js
	@cd highlight && node tools/build.js -n && cp build/highlight.pack.js ../build/highlight.pack.js

highlight:
	@git clone git://github.com/isagalaev/highlight.js.git $@

clean:
	@rm -rf build

.PHONY: default
