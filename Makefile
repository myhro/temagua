COVERFILE := cover.out
DUMP_CMD := dump
DUMP_FOLDER := ./cmd/dump/
RESTORE_CMD := restore
RESTORE_FOLDER := ./cmd/restore/

build: build-dump build-restore

build-dump:
	go build -o $(DUMP_CMD) $(DUMP_FOLDER)

build-restore:
	go build -o $(RESTORE_CMD) $(RESTORE_FOLDER)

clean:
	rm -f $(COVERFILE) $(DUMP_CMD) $(RESTORE_CMD) sqlite.db

coverage:
	go tool cover -html $(COVERFILE)

dump:
	go run $(DUMP_FOLDER) > api/dump.json

restore:
	go run $(RESTORE_FOLDER)

test:
	go test -coverprofile $(COVERFILE) -v ./...
