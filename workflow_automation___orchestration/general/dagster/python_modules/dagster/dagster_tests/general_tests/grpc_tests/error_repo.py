import dagster as dg


@dg.repository  # pyright: ignore[reportArgumentType]  # ty: ignore[invalid-argument-type]
def error_repo():
    a = None
    a()  # pyright: ignore[reportOptionalCall]  # ty: ignore[call-non-callable]
