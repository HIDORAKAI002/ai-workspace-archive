/**
 * @module FormatChatMessage
 * 
 * Utilities for formatting chat messages and timestamps into human-readable text.
 * Provides functions to render chat messages with timestamps and format dates
 * using friendly relative terms like 'Today' and 'Yesterday'.
 */
// Copyright (c) 2025, 2026 Jon Verrier


import { EChatRole, IChatMessage } from "./entry";

/**
 * Creates a text representation of a chat message including originator,
 * content, and timestamp.
 * 
 * @param message The chat message to render
 * @returns Formatted string representation of the message
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module formats chat messages and their timestamps into concise, human-readable text. It exposes two functions.
// 
// renderChatMessageAsText builds a single text block for a chat line. It labels the originator as “User” or “Assistant” based on the EChatRole and appends the message content. It prefixes the line with a formatted timestamp in brackets and adds trailing newlines for readability. It always requests full date context from the timestamp formatter.
// 
// formatChatMessageTimestamp converts a Date into a friendly string. It detects Today and Yesterday relative to the current system date, otherwise shows a long weekday, two-digit day, and full month (en-US). It always appends the local time in HH:MM using two-digit hour and minute. When fullDate is true, Today and Yesterday include the full date in parentheses; otherwise only the relative label is shown. It normalizes the input with new Date(...) to tolerate Date-like inputs.
// 
// The module relies on EChatRole and IChatMessage from ./entry to interpret roles and ensure message shape.
// ===End StrongAI Generated Comment===

export function renderChatMessageAsText(message: IChatMessage): string {
   const originator = message.role === EChatRole.kUser ? "User" : "Assistant";
   const timestamp = formatChatMessageTimestamp(new Date(message.timestamp), true);
   
   return `[${timestamp}] ${originator}:\n${message.content}\n`;
}

/**
 * Formats a timestamp into a human-readable string
 * Returns 'Today', 'Yesterday', or 'Dayname DD Month' with time
 * When fullDate is true, adds the full date after Today/Yesterday
 * @param timestamp - The date to format
 * @param fullDate - Whether to include the full date after Today/Yesterday
 */
export const formatChatMessageTimestamp = (timestamp: Date, fullDate: boolean = false): string => {
    
    const date = new Date(timestamp); // This makes the function resilient to getting a Date object or a string in date format
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const fullDateStr = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        day: '2-digit',
        month: 'long'
    });

    if (isToday) {
        return fullDate ? `Today (${fullDateStr}) at ${time}` : `Today at ${time}`;
    } else if (isYesterday) {
        return fullDate ? `Yesterday (${fullDateStr}) at ${time}` : `Yesterday at ${time}`;
    } else {
        return `${fullDateStr} at ${time}`;
    }
}; 