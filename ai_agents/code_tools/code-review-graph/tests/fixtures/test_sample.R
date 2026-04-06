library(testthat)

test_that("addition works", {
  expect_equal(add(1, 2), 3)
})

test_add <- function() {
  stopifnot(add(1, 2) == 3)
}
