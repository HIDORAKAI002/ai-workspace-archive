package config

import (
	"strings"
	"testing"

	"github.com/spf13/viper"
)

func TestFixEnvironmentCase(t *testing.T) {
	// Test YAML content with environment variables
	yamlContent := `
mcpServers:
  github:
    type: local
    command: ["gh", "api"]
    environment:
      GITHUB_TOKEN: "ghp_test"
      DEBUG_MODE: "true"
      api_key: "secret"
  database:
    type: local
    command: ["db"]
    environment:
      DATABASE_URL: "postgres://localhost"
      DB_USER: "admin"
`

	// Load config with viper
	viper.Reset()
	viper.SetConfigType("yaml")
	err := viper.ReadConfig(strings.NewReader(yamlContent))
	if err != nil {
		t.Fatalf("Failed to read config: %v", err)
	}

	// Load and validate config (which should fix the case)
	config, err := LoadAndValidateConfig()
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	// Check GitHub server environment variables
	githubServer, exists := config.MCPServers["github"]
	if !exists {
		t.Fatal("github server not found")
	}

	// These should be uppercase because they contain underscores
	expectedUppercase := map[string]string{
		"GITHUB_TOKEN": "ghp_test",
		"DEBUG_MODE":   "true",
		"API_KEY":      "secret",
	}

	for expectedKey, expectedValue := range expectedUppercase {
		found := false
		for key, value := range githubServer.Environment {
			if key == expectedKey && value == expectedValue {
				found = true
				break
			}
		}
		if !found {
			t.Errorf("Expected environment variable %s=%s not found. Environment: %+v",
				expectedKey, expectedValue, githubServer.Environment)
		}
	}

	// Check database server
	dbServer, exists := config.MCPServers["database"]
	if !exists {
		t.Fatal("database server not found")
	}

	expectedDbVars := map[string]string{
		"DATABASE_URL": "postgres://localhost",
		"DB_USER":      "admin",
	}

	for expectedKey, expectedValue := range expectedDbVars {
		found := false
		for key, value := range dbServer.Environment {
			if key == expectedKey && value == expectedValue {
				found = true
				break
			}
		}
		if !found {
			t.Errorf("Expected environment variable %s=%s not found. Environment: %+v",
				expectedKey, expectedValue, dbServer.Environment)
		}
	}
}
