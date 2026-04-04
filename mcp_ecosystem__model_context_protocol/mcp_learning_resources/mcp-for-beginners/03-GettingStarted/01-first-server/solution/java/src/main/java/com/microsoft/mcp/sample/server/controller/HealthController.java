package com.microsoft.mcp.sample.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microsoft.mcp.sample.server.service.CalculatorService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller for health check and information endpoints.
 */
@RestController
public class HealthController {
    
    private final CalculatorService calculatorService;
    
    public HealthController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }    
    
    /**
     * Simple health check endpoint.
     * 
     * @return Health status information
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("service", "Basic Calculator Service");
        
        // Add calculator service status information
        response.put("calculatorService", calculatorService != null ? "Available" : "Unavailable");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Information endpoint about the service.
     * 
     * @return Service information
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> serviceInfo() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "Basic Calculator Service");
        response.put("version", "1.0.0");
        response.put("endpoint", "/v1/tools");
        
        Map<String, String> tools = new HashMap<>();
        tools.put("add", "Add two numbers together");
        tools.put("subtract", "Subtract the second number from the first number");
        tools.put("multiply", "Multiply two numbers together");
        tools.put("divide", "Divide the first number by the second number");
        tools.put("power", "Calculate the power of a number (base raised to an exponent)");
        tools.put("squareRoot", "Calculate the square root of a number");
        tools.put("modulus", "Calculate the remainder when one number is divided by another");
        tools.put("absolute", "Calculate the absolute value of a number");
        tools.put("help", "Get help about available calculator operations");
        response.put("availableTools", tools);
        
        return ResponseEntity.ok(response);
    }
}
