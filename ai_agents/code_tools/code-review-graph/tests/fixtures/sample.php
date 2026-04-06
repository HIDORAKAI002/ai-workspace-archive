<?php

namespace App\Models;

use Exception;

interface Repository {
    public function findById(int $id): ?User;
    public function save(User $user): void;
}

class User {
    public int $id;
    public string $name;

    public function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }

    public function toString(): string {
        return "User({$this->id}, {$this->name})";
    }
}

class InMemoryRepo implements Repository {
    private array $users = [];

    public function findById(int $id): ?User {
        return $this->users[$id] ?? null;
    }

    public function save(User $user): void {
        $this->users[$user->id] = $user;
        echo "Saved " . $user->toString() . "\n";
    }
}

function createUser(Repository $repo, string $name): User {
    $user = new User(count($repo->users ?? []) + 1, $name);
    $repo->save($user);
    return $user;
}
