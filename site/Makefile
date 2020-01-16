ENV_FILE := .env

build: clean env
	npm run build

build-prod: clean env-prod
	npm run build

check:
	npm run prettier -- --check "src/*.js"

clean:
	rm -rf .cache/ dist/ workers-site/worker/ $(ENV_FILE)

deploy: build
	npm run wrangler -- publish

deploy-prod: build-prod
	npm run wrangler -- publish --env production

deps:
	npm ci

env:
	echo 'API_URL="https://temagua-api.myhro.workers.dev"' > $(ENV_FILE)

env-prod:
	echo 'API_URL="https://temagua-api.myhro.info"' > $(ENV_FILE)

lint:
	npm run eslint

prettier:
	npm run prettier -- --write "src/*.js"

serve:
	npm run serve

watch: clean env
	npm run watch
