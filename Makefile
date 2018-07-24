build:
	./build.sh

clean:
	rm -rf dist/

deploy:
	s3cmd sync --delete-removed --encoding=UTF-8 --add-encoding-exts=txt dist/ s3://temagua.myhro.info/

fetch:
	./fetch.sh > data/table.txt

up:
	python -m http.server
