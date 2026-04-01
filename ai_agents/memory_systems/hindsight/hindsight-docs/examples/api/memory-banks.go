package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	hindsight "github.com/vectorize-io/hindsight/hindsight-clients/go"
)

func main() {
	apiURL := os.Getenv("HINDSIGHT_API_URL")
	if apiURL == "" {
		apiURL = "http://localhost:8888"
	}

	cfg := hindsight.NewConfiguration()
	cfg.Servers = hindsight.ServerConfigurations{{URL: apiURL}}
	client := hindsight.NewAPIClient(cfg)
	ctx := context.Background()

	// =============================================================================
	// Doc Examples
	// =============================================================================

	// [docs:create-bank]
	client.BanksAPI.CreateOrUpdateBank(ctx, "my-bank").
		CreateBankRequest(hindsight.CreateBankRequest{}).Execute()
	// [/docs:create-bank]

	// [docs:bank-with-disposition]
	client.BanksAPI.CreateOrUpdateBank(ctx, "architect-bank").
		CreateBankRequest(hindsight.CreateBankRequest{
			ReflectMission: *hindsight.NewNullableString(hindsight.PtrString(
				"You're a senior software architect - keep track of system designs, " +
					"technology decisions, and architectural patterns. Prefer simplicity over cutting-edge.",
			)),
			DispositionSkepticism: *hindsight.NewNullableInt32(hindsight.PtrInt32(4)),
			DispositionLiteralism: *hindsight.NewNullableInt32(hindsight.PtrInt32(4)),
			DispositionEmpathy:    *hindsight.NewNullableInt32(hindsight.PtrInt32(2)),
		}).Execute()
	// [/docs:bank-with-disposition]

	// [docs:bank-background]
	client.BanksAPI.CreateOrUpdateBank(ctx, "my-bank").
		CreateBankRequest(hindsight.CreateBankRequest{
			ReflectMission: *hindsight.NewNullableString(hindsight.PtrString(
				"I am a research assistant specializing in machine learning.",
			)),
		}).Execute()
	// [/docs:bank-background]

	// [docs:bank-mission]
	client.BanksAPI.CreateOrUpdateBank(ctx, "my-bank").
		CreateBankRequest(hindsight.CreateBankRequest{
			ReflectMission: *hindsight.NewNullableString(hindsight.PtrString(
				"You're a senior software architect - keep track of system designs, " +
					"technology decisions, and architectural patterns.",
			)),
		}).Execute()
	// [/docs:bank-mission]

	// [docs:bank-support-agent]
	client.BanksAPI.CreateOrUpdateBank(ctx, "support-bank").
		CreateBankRequest(hindsight.CreateBankRequest{}).Execute()
	client.BanksAPI.UpdateBankConfig(ctx, "support-bank").
		BankConfigUpdate(hindsight.BankConfigUpdate{
			Updates: map[string]interface{}{
				"observations_mission": "I am a customer support agent. Track customer preferences, " +
					"recurring issues, and resolution history to provide consistent, personalized support.",
			},
		}).Execute()
	// [/docs:bank-support-agent]

	// [docs:update-bank-config]
	client.BanksAPI.UpdateBankConfig(ctx, "my-bank").
		BankConfigUpdate(hindsight.BankConfigUpdate{
			Updates: map[string]interface{}{
				"retain_mission": "Always include technical decisions, API design choices, and architectural trade-offs. " +
					"Ignore meeting logistics and social exchanges.",
				"retain_extraction_mode": "verbose",
				"observations_mission": "Observations are stable facts about people and projects. " +
					"Always include preferences, skills, and recurring patterns. Ignore one-off events.",
				"disposition_skepticism": 4,
				"disposition_literalism": 4,
				"disposition_empathy":    2,
			},
		}).Execute()
	// [/docs:update-bank-config]

	// [docs:get-bank-config]
	// Returns resolved config (server defaults merged with bank overrides) and the raw overrides
	result, _, _ := client.BanksAPI.GetBankConfig(ctx, "my-bank").Execute()
	// result.Config     — full resolved configuration
	// result.Overrides  — only fields overridden at the bank level
	fmt.Println("Config keys:", len(result.GetConfig()))
	// [/docs:get-bank-config]

	// [docs:reset-bank-config]
	// Remove all bank-level overrides, reverting to server defaults
	client.BanksAPI.ResetBankConfig(ctx, "my-bank").Execute()
	// [/docs:reset-bank-config]

	// =============================================================================
	// Cleanup (not shown in docs)
	// =============================================================================
	for _, bankID := range []string{"my-bank", "architect-bank", "support-bank"} {
		req, _ := http.NewRequest("DELETE", fmt.Sprintf("%s/v1/default/banks/%s", apiURL, bankID), nil)
		http.DefaultClient.Do(req)
	}

	fmt.Println("memory-banks.go: All examples passed")
}
