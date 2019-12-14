api:
	go run .

build:
	parcel build index.html

clean:
	rm -rf dist/

deploy:
	s3cmd sync --delete-removed --encoding=UTF-8 --add-encoding-exts=txt dist/ s3://temagua.myhro.info/

fetch:
	./fetch.sh >> data/table.txt

serve:
	npm run serve

watch:
	npm run watch
