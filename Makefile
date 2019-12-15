BINARY := temagua-api
COVERFILE := cover.out

api:
	go run .

build-api: clean
	go build -o $(BINARY) .

build-web: clean
	export NODE_ENV=production
	npm run build

clean:
	rm -rf .cache/ dist/ $(BINARY)

coverage:
	go tool cover -html $(COVERFILE)

deploy-web: build-web
	s3cmd sync --delete-removed --encoding=UTF-8 --add-encoding-exts=txt dist/ s3://temagua.myhro.info/

serve:
	npm run serve

test-api:
	go test -coverprofile $(COVERFILE) -v ./...

watch: clean
	npm run watch
