library(dplyr)
require(ggplot2)
source("utils.R")

add <- function(x, y) {
  x + y
}

multiply = function(a, b) {
  a * b
}

MyClass <- setRefClass("MyClass",
  fields = list(name = "character", age = "numeric"),
  methods = list(
    greet = function() {
      cat(paste("Hello", name))
    },
    get_age = function() {
      return(age)
    }
  )
)

process_data <- function(data) {
  result <- dplyr::filter(data, x > 5)
  summary <- dplyr::summarize(result, mean_x = mean(x))
  add(1, 2)
  summary
}
