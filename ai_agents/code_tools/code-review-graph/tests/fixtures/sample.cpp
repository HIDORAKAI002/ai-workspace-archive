#include <iostream>
#include <string>
#include <vector>

class Animal {
public:
    std::string name;
    int age;

    Animal(std::string n, int a) : name(n), age(a) {}
    virtual void speak() { std::cout << name << " speaks" << std::endl; }
};

class Dog : public Animal {
public:
    Dog(std::string n, int a) : Animal(n, a) {}
    void speak() override { std::cout << name << " barks" << std::endl; }
    void fetch() { std::cout << name << " fetches" << std::endl; }
};

void greet(const Animal& animal) {
    std::cout << "Hello " << animal.name << std::endl;
}

int main() {
    Dog d("Rex", 5);
    d.speak();
    greet(d);
    return 0;
}
