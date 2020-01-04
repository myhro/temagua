OUTPUT_DIR := dist

clean:
	rm -rf $(OUTPUT_DIR) workers-site/worker/

deploy: generate
	npm run wrangler -- publish

deploy-prod: generate
	npm run wrangler -- publish --env production

deps:
	npm ci

generate: clean
	mkdir -p $(OUTPUT_DIR)
	cp index.html $(OUTPUT_DIR)/
	go run main.go > $(OUTPUT_DIR)/feed.xml

serve:
	npm run serve
