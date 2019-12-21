COVERFILE := cover.out

clean:
	rm -f $(COVERFILE) sqlite.db

coverage:
	go tool cover -html $(COVERFILE)

dump:
	go run ./cmd/dump/ > api/dump.json

restore:
	go run ./cmd/restore/

test:
	go test -coverprofile $(COVERFILE) -v ./...
