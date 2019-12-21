build: clean
	export NODE_ENV=development
	npm run build

build-prod: clean
	export NODE_ENV=production
	npm run build

clean:
	rm -rf .cache/ dist/ workers-site/worker/

deploy: build
	npm run wrangler -- publish

deploy-prod: build-prod
	npm run wrangler -- publish --env production

deps:
	npm ci

serve:
	npm run serve

watch: clean
	npm run watch
