#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char name[50];
} User;

User* create_user(int id, const char* name) {
    User* user = malloc(sizeof(User));
    user->id = id;
    snprintf(user->name, 50, "%s", name);
    return user;
}

void print_user(User* user) {
    printf("User %d: %s\n", user->id, user->name);
}

int main() {
    User* u = create_user(1, "Alice");
    print_user(u);
    free(u);
    return 0;
}
