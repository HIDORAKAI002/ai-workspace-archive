-- sample.lua - Comprehensive Lua test fixture for tree-sitter parsing
-- Exercises all major constructs: functions, methods, classes, imports, tables

-- Module-level require() imports
local json = require("cjson")
local utils = require("lib.utils")
local log = require("logging").getLogger("sample")

-- Top-level function declaration
function greet(name)
    print("Hello, " .. name)
    return name
end

-- Local function declaration
local function helper(x, y)
    return x + y
end

-- Variable assignment creating a function
local transform = function(data)
    return json.encode(data)
end

-- Another variable-assigned function (module-level)
local validate = function(input)
    if input == nil then
        return false, "input is nil"
    end
    return true
end

-- Table constructor as a "class" using metatable + __index pattern
local Animal = {}
Animal.__index = Animal

-- Constructor
function Animal.new(name, sound)
    local self = setmetatable({}, Animal)
    self.name = name
    self.sound = sound
    return self
end

-- Method defined with colon syntax
function Animal:speak()
    log:info(self.name .. " says " .. self.sound)
    return self.sound
end

-- Another colon-syntax method
function Animal:rename(new_name)
    local old = self.name
    self.name = new_name
    return old
end

-- Inheritance pattern
local Dog = setmetatable({}, { __index = Animal })
Dog.__index = Dog

function Dog.new(name)
    local self = Animal.new(name, "Woof")
    return setmetatable(self, Dog)
end

function Dog:fetch(item)
    self:speak()
    print(self.name .. " fetches " .. item)
    return item
end

-- Nested function calls and method calls
local function process_animals()
    local a = Animal.new("Cat", "Meow")
    local d = Dog.new("Rex")

    -- Method calls (colon syntax)
    a:speak()
    d:speak()
    d:fetch("ball")

    -- Dot-syntax method call
    local encoded = json.encode({ animals = { a.name, d.name } })

    -- Nested calls
    print(string.format("Processed %d animals", 2))
    utils.log(json.decode(encoded))

    return encoded
end

-- Table constructor with mixed fields
local config = {
    debug = true,
    version = "1.0.0",
    max_retries = 3,
    handlers = {
        on_error = function(err)
            log:error(err)
        end,
        on_success = function(result)
            log:info("OK: " .. tostring(result))
        end,
    },
}

-- Simple "test" function (test_something pattern)
local function test_greet()
    local result = greet("World")
    assert(result == "World", "greet should return name")
end

local function test_animal_speak()
    local a = Animal.new("TestCat", "Mew")
    local sound = a:speak()
    assert(sound == "Mew", "speak should return sound")
end

local function test_dog_fetch()
    local d = Dog.new("TestDog")
    local item = d:fetch("stick")
    assert(item == "stick", "fetch should return item")
end

-- Return statement (module pattern)
return {
    greet = greet,
    helper = helper,
    transform = transform,
    validate = validate,
    Animal = Animal,
    Dog = Dog,
    process_animals = process_animals,
    config = config,
    test_greet = test_greet,
    test_animal_speak = test_animal_speak,
    test_dog_fetch = test_dog_fetch,
}
