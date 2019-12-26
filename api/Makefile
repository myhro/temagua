DUMP := dump.json
PRETTIER_OPTS = --quote-props consistent --single-quote --trailing-comma es5

check:
	npm run prettier -- $(PRETTIER_OPTS) --check index.js

clean:
	rm -f $(DUMP)

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

prettier:
	npm run prettier -- $(PRETTIER_OPTS) --write index.js

preview:
	npm run wrangler -- preview --watch
