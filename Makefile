BINARY := temagua-api
COVERFILE := cover.out

api:
	go run .

build: clean
	go build -o $(BINARY) .

clean:
	rm -f $(BINARY) $(COVERFILE) sqlite.db

coverage:
	go tool cover -html $(COVERFILE)

dump:
	go run ./cmd/dump/ > api/dump.json

restore:
	go run ./cmd/restore/

test:
	go test -coverprofile $(COVERFILE) -v ./...
