NODE_MODULE_BIN=./node_modules/.bin/
TSC_BIN=$(NODE_MODULE_BIN)tsc
WEB_PACK_BIN=$(NODE_MODULE_BIN)webpack

build:
	$(TSC_BIN)
	$(WEB_PACK_BIN)
watch:
	tsc
	tsc --watch &
	$(WEB_PACK_BIN) --watch


