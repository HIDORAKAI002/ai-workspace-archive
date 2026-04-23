<?php

declare(strict_types=1);

use Firecrawl\Models\CreditUsage;
use Firecrawl\Models\MapData;
use Firecrawl\Models\BatchScrapeJob;
use Firecrawl\Models\CrawlJob;
use Firecrawl\Models\ScrapeOptions;

it('hydrates CreditUsage from nested data key', function (): void {
    $response = [
        'success' => true,
        'data' => [
            'remainingCredits' => 500,
            'planCredits' => 1000,
            'billingPeriodStart' => '2025-01-01',
            'billingPeriodEnd' => '2025-02-01',
        ],
    ];

    $usage = CreditUsage::fromArray($response);

    expect($usage->getRemainingCredits())->toBe(500);
    expect($usage->getPlanCredits())->toBe(1000);
    expect($usage->getBillingPeriodStart())->toBe('2025-01-01');
    expect($usage->getBillingPeriodEnd())->toBe('2025-02-01');
});

it('hydrates CreditUsage from flat data', function (): void {
    $response = [
        'remainingCredits' => 250,
        'planCredits' => 500,
    ];

    $usage = CreditUsage::fromArray($response);

    expect($usage->getRemainingCredits())->toBe(250);
    expect($usage->getPlanCredits())->toBe(500);
});

it('guards MapData links against non-array input', function (): void {
    $data = ['links' => 'not-an-array'];

    $map = MapData::fromArray($data);

    expect($map->getLinks())->toBe([]);
});

it('normalizes MapData string links', function (): void {
    $data = [
        'links' => [
            'https://example.com',
            ['url' => 'https://example.com/about', 'title' => 'About'],
        ],
    ];

    $map = MapData::fromArray($data);

    expect($map->getLinks())->toHaveCount(2);
    expect($map->getLinks()[0])->toBe(['url' => 'https://example.com']);
    expect($map->getLinks()[1])->toBe(['url' => 'https://example.com/about', 'title' => 'About']);
});

it('casts creditsUsed to int in BatchScrapeJob', function (): void {
    $raw = [
        'id' => 'batch-123',
        'status' => 'completed',
        'completed' => 5,
        'total' => 5,
        'creditsUsed' => '42',
        'data' => [],
    ];

    $job = BatchScrapeJob::fromArray($raw);

    expect($job->getCreditsUsed())->toBe(42);
    expect($job->getCreditsUsed())->toBeInt();
});

it('preserves null creditsUsed in CrawlJob', function (): void {
    $raw = [
        'id' => 'crawl-123',
        'status' => 'scraping',
        'data' => [],
    ];

    $job = CrawlJob::fromArray($raw);

    expect($job->getCreditsUsed())->toBeNull();
});

it('preserves positional integration in ScrapeOptions::with', function (): void {
    $options = ScrapeOptions::with(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        false,
        'php-sdk',
    );

    expect($options->getStoreInCache())->toBeFalse();
    expect($options->getIntegration())->toBe('php-sdk');
    expect($options->getLockdown())->toBeNull();
    expect($options->toArray())->toMatchArray([
        'storeInCache' => false,
        'integration' => 'php-sdk',
    ]);
});

it('serializes lockdown in ScrapeOptions', function (): void {
    $options = ScrapeOptions::with(
        lockdown: true,
        integration: 'php-sdk',
    );

    expect($options->getLockdown())->toBeTrue();
    expect($options->toArray())->toMatchArray([
        'lockdown' => true,
        'integration' => 'php-sdk',
    ]);
});
