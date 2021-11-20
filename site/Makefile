build: clean env
	npm run parcel -- build src/index.html

build-prod: clean env-prod
	npm run parcel -- build src/index.html

check:
	npm run prettier -- --check "src/*.js"

clean:
	rm -rf .cache/ dist/ workers-site/worker/ .env

deps:
	npm ci

env:
	echo 'API_URL="https://temagua-api.myhro.net"' > .env

env-prod:
	echo 'API_URL="https://temagua-api.myhro.info"' > .env

lint:
	npm run eslint

prettier:
	npm run prettier -- --write "src/*.js"

serve:
	npm run serve

watch: clean env
	npm run parcel -- src/index.html
