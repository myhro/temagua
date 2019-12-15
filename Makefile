COVERFILE := cover.out

api:
	go run .

build: clean
	export NODE_ENV=production
	npm run build

clean:
	rm -rf .cache/ dist/

coverage:
	go tool cover -html $(COVERFILE)

deploy: build
	s3cmd sync --delete-removed --encoding=UTF-8 --add-encoding-exts=txt dist/ s3://temagua.myhro.info/

serve:
	npm run serve

test:
	go test -coverprofile $(COVERFILE) -v ./...

watch: clean
	npm run watch
