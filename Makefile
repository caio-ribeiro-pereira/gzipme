
REPORTER = 

test:
  @echo Running Tests
  @NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER)

coverage:
  @echo Running Coverage Tests
  @jscoverage lib lib-cov
  @COVERAGE=1 make test REPORTER=html-cov > coverage.html
  @rm -rf lib-cov/* 

.PHONY: test coverage