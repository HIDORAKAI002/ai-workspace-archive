package com.microsoft.mcp.sample.client;

import java.util.Map;

import org.springframework.web.reactive.function.client.WebClient;

import io.modelcontextprotocol.client.McpClient;
import io.modelcontextprotocol.client.transport.WebFluxSseClientTransport;
import io.modelcontextprotocol.spec.McpClientTransport;
import io.modelcontextprotocol.spec.McpSchema.CallToolRequest;
import io.modelcontextprotocol.spec.McpSchema.CallToolResult;
import io.modelcontextprotocol.spec.McpSchema.ListToolsResult;

public class SDKClient {
	
	public static void main(String[] args) {
		var transport = new WebFluxSseClientTransport(WebClient.builder().baseUrl("http://localhost:8080"));
		new SDKClient(transport).run();
	}
	
	private final McpClientTransport transport;

	public SDKClient(McpClientTransport transport) {
		this.transport = transport;
	}

	public void run() {

		var client = McpClient.sync(this.transport).build();
		client.initialize();

		client.ping();

		// List and demonstrate tools
		ListToolsResult toolsList = client.listTools();
		System.out.println("Available Tools = " + toolsList);

		CallToolResult resultAdd = client.callTool(new CallToolRequest("add", Map.of("a", 5.0, "b", 3.0)));
		System.out.println("Add Result = " + resultAdd);

		CallToolResult resultSubtract = client.callTool(new CallToolRequest("subtract", Map.of("a", 10.0, "b", 4.0)));
		System.out.println("Subtract Result = " + resultSubtract);

		CallToolResult resultMultiply = client.callTool(new CallToolRequest("multiply", Map.of("a", 6.0, "b", 7.0)));
		System.out.println("Multiply Result = " + resultMultiply);

		CallToolResult resultDivide = client.callTool(new CallToolRequest("divide", Map.of("a", 20.0, "b", 4.0)));
		System.out.println("Divide Result = " + resultDivide);

		CallToolResult resultPower = client.callTool(new CallToolRequest("power", Map.of("base", 2.0, "exponent", 8.0)));
		System.out.println("Power Result = " + resultPower);

		CallToolResult resultSqrt = client.callTool(new CallToolRequest("squareRoot", Map.of("number", 16.0)));
		System.out.println("Square Root Result = " + resultSqrt);

		CallToolResult resultAbsolute = client.callTool(new CallToolRequest("absolute", Map.of("number", -5.5)));
		System.out.println("Absolute Result = " + resultAbsolute);

		CallToolResult resultHelp = client.callTool(new CallToolRequest("help", Map.of()));
		System.out.println("Help = " + resultHelp);

		client.closeGracefully();
	}
}
