PRETTIER_GLOB = functions/**/*.js src/*.js test/*.js

.PHONY: test

build:
	npx parcel build src/index.html

check:
	npx prettier --check $(PRETTIER_GLOB)

clean:
	rm -rf .cache/ dist/ .env dump.json

# Using --namespace-id until --binding is fixed in wrangler2
db:
	npx wrangler kv:bulk put --namespace-id f47c51b966994a7bbd209ffbc751cabb dump.json

db-prod:
	npx wrangler kv:bulk put --namespace-id 9ca9c633305f43aca9b475d579af7b6d --env production dump.json

lint:
	DEBUG=eslint:cli-engine npx eslint functions/ src/ test/

prettier:
	npx prettier --write $(PRETTIER_GLOB)

serve:
	npx wrangler pages dev dist/ --kv DB

test:
	npx webpack --config webpack.test.js
	TZ=UTC npx mocha dist/main.js

watch: clean
	npx parcel src/index.html
