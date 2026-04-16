<?php

declare(strict_types=1);

namespace Firecrawl\Models;

final class ScrapeOptions
{
    /**
     * @param list<string|JsonFormat>|null $formats
     * @param array<string, string>|null   $headers
     * @param list<string>|null            $includeTags
     * @param list<string>|null            $excludeTags
     * @param list<mixed>|null             $parsers
     * @param list<array<string, mixed>>|null $actions
     */
    private function __construct(
        private readonly ?array $formats = null,
        private readonly ?array $headers = null,
        private readonly ?array $includeTags = null,
        private readonly ?array $excludeTags = null,
        private readonly ?bool $onlyMainContent = null,
        private readonly ?int $timeout = null,
        private readonly ?int $waitFor = null,
        private readonly ?bool $mobile = null,
        private readonly ?array $parsers = null,
        private readonly ?array $actions = null,
        private readonly ?LocationConfig $location = null,
        private readonly ?bool $skipTlsVerification = null,
        private readonly ?bool $removeBase64Images = null,
        private readonly ?bool $blockAds = null,
        private readonly ?string $proxy = null,
        private readonly ?int $maxAge = null,
        private readonly ?bool $storeInCache = null,
        private readonly ?string $integration = null,
    ) {}

    /**
     * @param list<string|JsonFormat>|null      $formats
     * @param array<string, string>|null        $headers
     * @param list<string>|null                 $includeTags
     * @param list<string>|null                 $excludeTags
     * @param list<mixed>|null                  $parsers
     * @param list<array<string, mixed>>|null   $actions
     */
    public static function with(
        ?array $formats = null,
        ?array $headers = null,
        ?array $includeTags = null,
        ?array $excludeTags = null,
        ?bool $onlyMainContent = null,
        ?int $timeout = null,
        ?int $waitFor = null,
        ?bool $mobile = null,
        ?array $parsers = null,
        ?array $actions = null,
        ?LocationConfig $location = null,
        ?bool $skipTlsVerification = null,
        ?bool $removeBase64Images = null,
        ?bool $blockAds = null,
        ?string $proxy = null,
        ?int $maxAge = null,
        ?bool $storeInCache = null,
        ?string $integration = null,
    ): self {
        return new self(
            $formats, $headers, $includeTags, $excludeTags, $onlyMainContent,
            $timeout, $waitFor, $mobile, $parsers, $actions, $location,
            $skipTlsVerification, $removeBase64Images, $blockAds, $proxy,
            $maxAge, $storeInCache, $integration,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        $data = [];

        if ($this->formats !== null) {
            $data['formats'] = array_map(
                fn (string|JsonFormat $f): string|array => $f instanceof JsonFormat ? $f->toArray() : $f,
                $this->formats,
            );
        }

        $fields = [
            'headers' => $this->headers,
            'includeTags' => $this->includeTags,
            'excludeTags' => $this->excludeTags,
            'onlyMainContent' => $this->onlyMainContent,
            'timeout' => $this->timeout,
            'waitFor' => $this->waitFor,
            'mobile' => $this->mobile,
            'parsers' => $this->parsers,
            'actions' => $this->actions,
            'location' => $this->location?->toArray(),
            'skipTlsVerification' => $this->skipTlsVerification,
            'removeBase64Images' => $this->removeBase64Images,
            'blockAds' => $this->blockAds,
            'proxy' => $this->proxy,
            'maxAge' => $this->maxAge,
            'storeInCache' => $this->storeInCache,
            'integration' => $this->integration,
        ];

        foreach ($fields as $key => $value) {
            if ($value !== null) {
                $data[$key] = $value;
            }
        }

        return $data;
    }

    /** @return list<string|JsonFormat>|null */
    public function getFormats(): ?array
    {
        return $this->formats;
    }

    /** @return array<string, string>|null */
    public function getHeaders(): ?array
    {
        return $this->headers;
    }

    /** @return list<string>|null */
    public function getIncludeTags(): ?array
    {
        return $this->includeTags;
    }

    /** @return list<string>|null */
    public function getExcludeTags(): ?array
    {
        return $this->excludeTags;
    }

    public function getOnlyMainContent(): ?bool
    {
        return $this->onlyMainContent;
    }

    public function getTimeout(): ?int
    {
        return $this->timeout;
    }

    public function getWaitFor(): ?int
    {
        return $this->waitFor;
    }

    public function getMobile(): ?bool
    {
        return $this->mobile;
    }

    /** @return list<mixed>|null */
    public function getParsers(): ?array
    {
        return $this->parsers;
    }

    /** @return list<array<string, mixed>>|null */
    public function getActions(): ?array
    {
        return $this->actions;
    }

    public function getLocation(): ?LocationConfig
    {
        return $this->location;
    }

    public function getSkipTlsVerification(): ?bool
    {
        return $this->skipTlsVerification;
    }

    public function getRemoveBase64Images(): ?bool
    {
        return $this->removeBase64Images;
    }

    public function getBlockAds(): ?bool
    {
        return $this->blockAds;
    }

    public function getProxy(): ?string
    {
        return $this->proxy;
    }

    public function getMaxAge(): ?int
    {
        return $this->maxAge;
    }

    public function getStoreInCache(): ?bool
    {
        return $this->storeInCache;
    }

    public function getIntegration(): ?string
    {
        return $this->integration;
    }
}
