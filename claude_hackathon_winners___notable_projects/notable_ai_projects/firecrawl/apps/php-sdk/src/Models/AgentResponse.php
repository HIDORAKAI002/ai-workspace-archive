<?php

declare(strict_types=1);

namespace Firecrawl\Models;

final class AgentResponse
{
    public function __construct(
        private readonly bool $success = false,
        private readonly ?string $id = null,
        private readonly ?string $error = null,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            success: (bool) ($data['success'] ?? false),
            id: $data['id'] ?? null,
            error: $data['error'] ?? null,
        );
    }

    public function isSuccess(): bool
    {
        return $this->success;
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getError(): ?string
    {
        return $this->error;
    }
}
