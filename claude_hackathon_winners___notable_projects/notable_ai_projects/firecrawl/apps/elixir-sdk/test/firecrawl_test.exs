defmodule FirecrawlTest do
  use ExUnit.Case

  test "raises when no API key is configured" do
    old = Application.get_env(:firecrawl, :api_key)
    Application.delete_env(:firecrawl, :api_key)
    on_exit(fn -> if old, do: Application.put_env(:firecrawl, :api_key, old) end)

    assert_raise RuntimeError, ~r/Firecrawl API key not found/, fn ->
      Firecrawl.get_credit_usage()
    end
  end

  test "does not raise when API key is in application config" do
    Application.put_env(:firecrawl, :api_key, "test-config-key")
    on_exit(fn -> Application.delete_env(:firecrawl, :api_key) end)

    result = Firecrawl.get_queue_status(base_url: "http://localhost:1", retry: false)
    assert {:error, _} = result
  end

  test "does not raise when API key is passed as option" do
    old = Application.get_env(:firecrawl, :api_key)
    Application.delete_env(:firecrawl, :api_key)
    on_exit(fn -> if old, do: Application.put_env(:firecrawl, :api_key, old) end)

    result =
      Firecrawl.get_queue_status(
        api_key: "test-opt-key",
        base_url: "http://localhost:1",
        retry: false
      )

    assert {:error, _} = result
  end

  test "non-bang returns {:error, _} for missing required params" do
    Application.put_env(:firecrawl, :api_key, "test-key")
    on_exit(fn -> Application.delete_env(:firecrawl, :api_key) end)

    assert {:error, %NimbleOptions.ValidationError{}} =
             Firecrawl.scrape_and_extract_from_url([])
  end

  test "non-bang returns {:error, _} for unknown keys (typo detection)" do
    Application.put_env(:firecrawl, :api_key, "test-key")
    on_exit(fn -> Application.delete_env(:firecrawl, :api_key) end)

    assert {:error, %NimbleOptions.ValidationError{message: msg}} =
             Firecrawl.scrape_and_extract_from_url(url: "https://example.com", typo_option: true)

    assert msg =~ "unknown options"
  end

  test "non-bang returns {:error, _} for wrong types" do
    Application.put_env(:firecrawl, :api_key, "test-key")
    on_exit(fn -> Application.delete_env(:firecrawl, :api_key) end)

    assert {:error, %NimbleOptions.ValidationError{}} =
             Firecrawl.crawl_urls(url: "https://example.com", limit: "not an integer")
  end

  test "bang raises for missing required params" do
    Application.put_env(:firecrawl, :api_key, "test-key")
    on_exit(fn -> Application.delete_env(:firecrawl, :api_key) end)

    assert_raise NimbleOptions.ValidationError, ~r/required/, fn ->
      Firecrawl.scrape_and_extract_from_url!([])
    end
  end

  test "bang raises for unknown keys" do
    Application.put_env(:firecrawl, :api_key, "test-key")
    on_exit(fn -> Application.delete_env(:firecrawl, :api_key) end)

    assert_raise NimbleOptions.ValidationError, ~r/unknown options/, fn ->
      Firecrawl.scrape_and_extract_from_url!(url: "https://example.com", typo_option: true)
    end
  end

  test "accepts atom values for enum params" do
    Application.put_env(:firecrawl, :api_key, "test-key")
    on_exit(fn -> Application.delete_env(:firecrawl, :api_key) end)

    result =
      Firecrawl.crawl_urls(
        [url: "https://example.com", sitemap: :skip],
        base_url: "http://localhost:1",
        retry: false
      )

    assert {:error, _} = result
  end

  test "all expected API functions are defined with bang variants" do
    functions = Firecrawl.__info__(:functions)

    expected = [
      {:scrape_and_extract_from_url, 0},
      {:scrape_and_extract_from_url, 1},
      {:scrape_and_extract_from_url, 2},
      {:scrape_and_extract_from_url!, 0},
      {:scrape_and_extract_from_url!, 1},
      {:scrape_and_extract_from_url!, 2},
      {:crawl_urls, 0},
      {:crawl_urls!, 0},
      {:get_credit_usage, 0},
      {:get_credit_usage!, 0},
      {:get_queue_status, 0},
      {:get_queue_status!, 0},
      {:cancel_crawl, 1},
      {:cancel_crawl!, 1}
    ]

    for {name, arity} <- expected do
      assert {name, arity} in functions,
             "Expected #{name}/#{arity} to be defined in Firecrawl"
    end
  end
end
