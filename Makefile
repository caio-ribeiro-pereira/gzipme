
test:
	@echo Mocha Test
	@NODE_ENV=test ./node_modules/.bin/mocha test/*.js \
	--reporter spec --slow 3000

coverage: test
	@echo Coverage Test
	@rm -rf lib-cov
	@mkdir -p lib-cov
	@./node_modules/.bin/jscoverage lib lib-cov
	@COVERAGE=1 NODE_ENV=test ./node_modules/.bin/mocha test/*.js \
	--reporter html-cov > coverage.html --slow 3000
	@rm -rf lib-cov

.PHONY: test coverage