BINARY := temagua-api
COVERFILE := cover.out

api:
	go run .

build: clean
	go build -o $(BINARY) .

clean:
	rm -f $(BINARY) $(COVERFILE)

coverage:
	go tool cover -html $(COVERFILE)

dump:
	go run ./cmd/export/ > api/dump.json

test:
	go test -coverprofile $(COVERFILE) -v ./...
