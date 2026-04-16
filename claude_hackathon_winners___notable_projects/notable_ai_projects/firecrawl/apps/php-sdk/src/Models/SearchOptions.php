<?php

declare(strict_types=1);

namespace Firecrawl\Models;

final class SearchOptions
{
    /**
     * @param list<mixed>|null $sources
     * @param list<mixed>|null $categories
     */
    private function __construct(
        private readonly ?array $sources = null,
        private readonly ?array $categories = null,
        private readonly ?int $limit = null,
        private readonly ?string $tbs = null,
        private readonly ?string $location = null,
        private readonly ?bool $ignoreInvalidURLs = null,
        private readonly ?int $timeout = null,
        private readonly ?ScrapeOptions $scrapeOptions = null,
        private readonly ?string $integration = null,
    ) {}

    /**
     * @param list<mixed>|null $sources
     * @param list<mixed>|null $categories
     */
    public static function with(
        ?array $sources = null,
        ?array $categories = null,
        ?int $limit = null,
        ?string $tbs = null,
        ?string $location = null,
        ?bool $ignoreInvalidURLs = null,
        ?int $timeout = null,
        ?ScrapeOptions $scrapeOptions = null,
        ?string $integration = null,
    ): self {
        return new self(
            $sources, $categories, $limit, $tbs, $location,
            $ignoreInvalidURLs, $timeout, $scrapeOptions, $integration,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        $fields = [
            'sources' => $this->sources,
            'categories' => $this->categories,
            'limit' => $this->limit,
            'tbs' => $this->tbs,
            'location' => $this->location,
            'ignoreInvalidURLs' => $this->ignoreInvalidURLs,
            'timeout' => $this->timeout,
            'scrapeOptions' => $this->scrapeOptions?->toArray(),
            'integration' => $this->integration,
        ];

        return array_filter($fields, fn (mixed $v): bool => $v !== null);
    }
}
