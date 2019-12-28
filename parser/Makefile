PRETTIER_OPTS = --quote-props consistent --single-quote --trailing-comma es5

check:
	npm run prettier -- $(PRETTIER_OPTS) --check main.js

deps:
	npm ci

lint:
	npm run eslint

prettier:
	npm run prettier -- $(PRETTIER_OPTS) --write main.js
