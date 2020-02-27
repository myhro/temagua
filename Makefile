COVERFILE := cover.out
DUMP_BINARY := dist/dump
DUMP_FOLDER := ./cmd/dump/
RESTORE_BINARY := dist/restore
RESTORE_FOLDER := ./cmd/restore/

build: build-dump build-restore

build-dump:
	go build -o $(DUMP_BINARY) $(DUMP_FOLDER)

build-restore:
	go build -o $(RESTORE_BINARY) $(RESTORE_FOLDER)

clean: clean-api clean-site
	rm -f $(COVERFILE) $(DUMP_BINARY) $(RESTORE_BINARY) sqlite.db

clean-api:
	make -C api/ clean

clean-site:
	make -C site/ clean

coverage:
	go tool cover -html $(COVERFILE)

dump:
	go run $(DUMP_FOLDER) > api/dump.json

restore:
	go run $(RESTORE_FOLDER)

test:
	go test -coverprofile $(COVERFILE) -v ./...
