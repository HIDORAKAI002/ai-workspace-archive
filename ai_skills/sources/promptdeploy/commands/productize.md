- Add a full, clear, concise README.md file, if it does not already exist,
  written according to my voice as described in
  @/Users/johnw/src/promptdeploy/commands/johnw.md
- Add a LICENSE.md file that matches @/Users/johnw/src/ledger/main/LICENSE.md,
  but with a “year range” matching the earliest to latest Git commit years
- Add flake.nix file so `nix develop` enters a full development shell with all
  dependencies necessary to build every target
- Add pre-commit check and CI check to ensure that `nix build` completes
  correctly
- Ensure that `nix flake check` builds and runs all of the checks specified in
  this list
- Add build target that formats all the code to a common standard using
  whatever code formatting tool is appropriate for each language used in the
  repository
- Add pre-commit check to ensure that code formatting is correct in every file
- Add build target to generate code coverage report
- Add pre-commit check that code coverage does not drop
- Add build target to generate performance profiling report
- Add pre-commit check that performance numbers do not drop by more than 5%
- Add build target that performs full linting
- Ensure that the build has all warnings enabled, and warnings are treated as
  errors (where this is applicable)
- Add build target to ensure the full build contains no warnings and passes
  cleanly
- Add build target to perform “fuzz testing”, if this is possible within the
  language
- Add build target that builds and runs all unit tests and integration tests
- If this language supports a “memory sanitizer” build, or something similar,
  to check for proper use of memory and no bugs, add this as well
- Add a lefthook.yml that performs all builds and checks on pre-commit (for
  example, see @/Users/johnw/src/promptdeploy/lefthook.yml
- Ensure, if there is documentation that needs to be built, that there is a
  build target checking that the docs do build and that make this build output
  available as a CI artifact
- Add GitHub actions that either run the same lefthook checks that would run
  on pre-commit, as listed above
- All of the above should happen in parallel when the pre-commit hook is run,
  as much as possible

Here are some of the tools I prefer to use for each language:

## Haskell

lint: use the web-searcher skill to find the best option
format: `fourmolu`

## Rust

lint: `cargo clippy`
format: `cargo fmt`

## C++

lint: `clang-tidy` and `cppcheck`
format: `clang-format`

## Python

lint: `ruff`
format: `ruff`

## Bash

lint: use the web-searcher skill to find the best option
format: `shfmt`

## Emacs Lisp

lint: use the web-searcher skill to find the best option
format: use the web-searcher skill to find the best option

## Coq (and Rocq)

lint: use the web-searcher skill to find the best option
format: use the web-searcher skill to find the best option
