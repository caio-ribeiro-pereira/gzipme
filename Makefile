
REPORTER = spec
test:
	@echo Mocha Test
	@NODE_ENV=test ./node_modules/.bin/mocha test/*.js \
	--reporter $(REPORTER) --slow 1000

coverage:
	@echo Coverage Test
	@rm -rf lib-cov
	@mkdir -p lib-cov
	@jscoverage lib lib-cov
	@COVERAGE=1 NODE_ENV=test ./node_modules/.bin/mocha test/*.js \
	--reporter html-cov > coverage.html --slow 1000
	@rm -rf lib-cov

.PHONY: test coverage