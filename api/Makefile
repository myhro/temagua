DUMP := dump.json
PRETTIER_GLOB = src/*.js test/*.js

.PHONY: test

build:
	npm run webpack -- --config webpack.production.js

check:
	npm run prettier -- --check $(PRETTIER_GLOB)

clean:
	rm -rf dist/ worker/ $(DUMP)

db:
	npm run wrangler -- kv:bulk put --binding DB $(DUMP)

db-prod:
	npm run wrangler -- kv:bulk put --binding DB --env production $(DUMP)

deploy:
	npm run wrangler -- publish

deploy-prod:
	npm run wrangler -- publish --env production

deps:
	npm ci

lint:
	npm run eslint

prettier:
	npm run prettier -- --write $(PRETTIER_GLOB)

preview:
	npm run wrangler -- preview --watch

test:
	npm run webpack -- --config webpack.test.js
	TZ=UTC npm run mocha
