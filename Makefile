
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
	@COVERAGE=1 REPORTER=html-cov > coverage.html make test 
	@rm -rf lib-cov

.PHONY: test coverage