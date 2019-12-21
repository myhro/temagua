DUMP := dump.json

clean:
	rm -f $(DUMP)

db:
	npm run wrangler -- kv:bulk put --binding DB $(DUMP)

db-prod:
	npm run wrangler -- kv:bulk put --binding DB --env production $(DUMP)

deploy:
	npm run wrangler -- publish

deploy-prod:
	npm run wrangler -- publish --env production

preview:
	npm run wrangler -- preview --watch
