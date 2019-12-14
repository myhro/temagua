api:
	go run .

build:
	export NODE_ENV=production
	npm run build

clean:
	rm -rf .cache/ dist/

deploy: clean build
	s3cmd sync --delete-removed --encoding=UTF-8 --add-encoding-exts=txt dist/ s3://temagua.myhro.info/

serve:
	npm run serve

watch: clean
	npm run watch
