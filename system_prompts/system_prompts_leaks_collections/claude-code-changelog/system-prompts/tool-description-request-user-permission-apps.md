# Tool Prompt: request-user-permission-apps

- Name: request_access

## Summary

Request user permission for app control.

# Raw Prompt Text
Request user permission to control a set of applications for this session. Must be called before any other tool in this server. The user sees a single dialog listing all requested apps and either allows the whole set or denies it. Call this again mid-session to add more apps; previously granted apps remain granted. Returns the granted apps, denied apps, and screenshot filtering capability.
