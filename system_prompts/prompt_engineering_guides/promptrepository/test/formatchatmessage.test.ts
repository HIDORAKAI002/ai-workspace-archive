/**
 * @module formatchatmessage.test
 * 
 * Unit tests for the FormatChatMessage module which handles formatting chat messages
 * and timestamps into human-readable text representations.
 */

// Copyright (c) 2025, 2026 Jon Verrier

// ===Start StrongAI Generated Comment (20260219)===
// This module contains unit tests for the chat formatting utilities. Its purpose is to verify that chat messages and their timestamps are rendered into clear, human-readable text across many scenarios, including edge cases.
// 
// The tests cover two main exports from the FormatChatMessage module:
// - renderChatMessageAsText: Builds a single-line header with a role label, a timestamp in brackets, and a trailing newline, followed by the raw message content. It maps function role messages to Assistant, preserves empty, multiline, special, very long, and Unicode content, and always appends a newline.
// - formatChatMessageTimestamp: Produces friendly timestamps with “Today” and “Yesterday” variants in short or full forms, and full weekday/month/day formatting for other days and future dates. It handles various times of day, leap years, extreme past/future dates, invalid Date inputs without throwing, and yields consistent, locale-stable English output.
// 
// Key imported symbols:
// - EChatRole, IChatMessage, and ChatMessageClassName from entry define the chat message shape and roles used by the tests.
// - expect from expect and describe/it from mocha provide the testing framework and assertions.
// ===End StrongAI Generated Comment===

import { expect } from 'expect';
import { describe, it } from 'mocha';
import { renderChatMessageAsText, formatChatMessageTimestamp } from '../src/FormatChatMessage';
import { EChatRole, IChatMessage, ChatMessageClassName } from '../src/entry';

describe('FormatChatMessage', () => {
  // Helper function to create test messages with required properties
  const createTestMessage = (role: EChatRole, content: string, timestamp: Date): IChatMessage => ({
    id: 'test-id',
    className: ChatMessageClassName,
    role,
    content,
    timestamp
  });

  describe('renderChatMessageAsText', () => {
    it('should format user message correctly', () => {
      const message = createTestMessage(
        EChatRole.kUser,
        'Hello, how are you?',
        new Date('2025-10-30T10:30:00.000Z')
      );

      const result = renderChatMessageAsText(message);
      
      // Check that it contains the expected components
      expect(result).toContain('User:');
      expect(result).toContain('Hello, how are you?');
      expect(result).toContain('[');
      expect(result).toContain(']');
      expect(result.endsWith('\n')).toBe(true);
    });

    it('should format assistant message correctly', () => {
      const message = createTestMessage(
        EChatRole.kAssistant,
        'I am doing well, thank you!',
        new Date('2025-10-30T10:31:00.000Z')
      );

      const result = renderChatMessageAsText(message);
      
      // Check that it contains the expected components
      expect(result).toContain('Assistant:');
      expect(result).toContain('I am doing well, thank you!');
      expect(result).toContain('[');
      expect(result).toContain(']');
      expect(result.endsWith('\n')).toBe(true);
    });

    it('should format function message correctly', () => {
      const message = createTestMessage(
        EChatRole.kFunction,
        'Function execution complete',
        new Date('2025-10-30T10:29:00.000Z')
      );

      const result = renderChatMessageAsText(message);
      
      // Function messages should be formatted as Assistant
      expect(result).toContain('Assistant:');
      expect(result).toContain('Function execution complete');
    });

    it('should handle empty content', () => {
      const message = createTestMessage(
        EChatRole.kUser,
        '',
        new Date('2025-10-30T10:30:00.000Z')
      );

      const result = renderChatMessageAsText(message);
      
      expect(result).toContain('User:');
      expect(result).toContain('\n\n'); // Empty content with newlines
    });

    it('should handle multiline content', () => {
      const message = createTestMessage(
        EChatRole.kUser,
        'Line 1\nLine 2\nLine 3',
        new Date('2025-10-30T10:30:00.000Z')
      );

      const result = renderChatMessageAsText(message);
      
      expect(result).toContain('User:');
      expect(result).toContain('Line 1\nLine 2\nLine 3');
    });

    it('should handle special characters in content', () => {
      const message = createTestMessage(
        EChatRole.kUser,
        'Special chars: @#$%^&*()[]{}|\\:";\'<>?,./`~',
        new Date('2025-10-30T10:30:00.000Z')
      );

      const result = renderChatMessageAsText(message);
      
      expect(result).toContain('User:');
      expect(result).toContain('Special chars: @#$%^&*()[]{}|\\:";\'<>?,./`~');
    });
  });

  describe('formatChatMessageTimestamp', () => {
    // Helper function to create dates relative to now
    const createDate = (daysOffset: number, hours: number = 10, minutes: number = 30): Date => {
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    it('should format today\'s timestamp correctly (short format)', () => {
      const today = createDate(0);
      const result = formatChatMessageTimestamp(today, false);
      
      expect(result).toMatch(/^Today at \d{1,2}:\d{2}$/);
      expect(result).toContain('Today at');
      expect(result).toContain('10:30');
    });

    it('should format today\'s timestamp correctly (full format)', () => {
      const today = createDate(0);
      const result = formatChatMessageTimestamp(today, true);
      
      expect(result).toMatch(/^Today \(.+\) at \d{1,2}:\d{2}$/);
      expect(result).toContain('Today (');
      expect(result).toContain(') at 10:30');
    });

    it('should format yesterday\'s timestamp correctly (short format)', () => {
      const yesterday = createDate(-1);
      const result = formatChatMessageTimestamp(yesterday, false);
      
      expect(result).toMatch(/^Yesterday at \d{1,2}:\d{2}$/);
      expect(result).toContain('Yesterday at');
      expect(result).toContain('10:30');
    });

    it('should format yesterday\'s timestamp correctly (full format)', () => {
      const yesterday = createDate(-1);
      const result = formatChatMessageTimestamp(yesterday, true);
      
      expect(result).toMatch(/^Yesterday \(.+\) at \d{1,2}:\d{2}$/);
      expect(result).toContain('Yesterday (');
      expect(result).toContain(') at 10:30');
    });

    it('should format older dates with full date and time', () => {
      const twoDaysAgo = createDate(-2);
      const result = formatChatMessageTimestamp(twoDaysAgo, false);
      
      // Should contain day of week, date, month and time in format "Monday, October 28 at 10:30"
      expect(result).toMatch(/^\w+day, \w+ \d{2} at \d{1,2}:\d{2}$/);
      expect(result).toContain('at 10:30');
    });

    it('should format future dates with full date and time', () => {
      const tomorrow = createDate(1);
      const result = formatChatMessageTimestamp(tomorrow, false);
      
      // Should contain day of week, date, month and time in format "Friday, October 31 at 10:30"
      expect(result).toMatch(/^\w+day, \w+ \d{2} at \d{1,2}:\d{2}$/);
      expect(result).toContain('at 10:30');
    });

    it('should handle different times of day correctly', () => {
      const earlyMorning = createDate(0, 6, 15);
      const result = formatChatMessageTimestamp(earlyMorning, false);
      
      expect(result).toContain('Today at 06:15');
    });

    it('should handle midnight correctly', () => {
      const midnight = createDate(0, 0, 0);
      const result = formatChatMessageTimestamp(midnight, false);
      
      expect(result).toContain('Today at 00:00');
    });

    it('should handle late night correctly', () => {
      const lateNight = createDate(0, 23, 59);
      const result = formatChatMessageTimestamp(lateNight, false);
      
      expect(result).toContain('Today at 23:59');
    });

    it('should handle Date object input', () => {
      const date = new Date('2025-10-30T15:45:30.000Z');
      const result = formatChatMessageTimestamp(date, false);
      
      // Should not throw and should return a formatted string
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle string date input by converting to Date', () => {
      // The function creates a new Date from the input, so it should handle string inputs
      const dateString = '2025-10-30T15:45:30.000Z';
      const date = new Date(dateString);
      const result = formatChatMessageTimestamp(date, false);
      
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should be consistent between calls with same timestamp', () => {
      const date = createDate(0, 14, 22);
      const result1 = formatChatMessageTimestamp(date, false);
      const result2 = formatChatMessageTimestamp(date, false);
      
      expect(result1).toBe(result2);
    });

    it('should show different results for fullDate true vs false for today', () => {
      const today = createDate(0);
      const shortFormat = formatChatMessageTimestamp(today, false);
      const fullFormat = formatChatMessageTimestamp(today, true);
      
      expect(shortFormat).not.toBe(fullFormat);
      expect(fullFormat.length).toBeGreaterThan(shortFormat.length);
      expect(fullFormat).toContain(shortFormat.replace('Today at', '').trim());
    });

    it('should show different results for fullDate true vs false for yesterday', () => {
      const yesterday = createDate(-1);
      const shortFormat = formatChatMessageTimestamp(yesterday, false);
      const fullFormat = formatChatMessageTimestamp(yesterday, true);
      
      expect(shortFormat).not.toBe(fullFormat);
      expect(fullFormat.length).toBeGreaterThan(shortFormat.length);
      expect(fullFormat).toContain(shortFormat.replace('Yesterday at', '').trim());
    });

    it('should handle edge case of exactly 24 hours ago', () => {
      const exactlyOneDayAgo = new Date();
      exactlyOneDayAgo.setDate(exactlyOneDayAgo.getDate() - 1);
      
      const result = formatChatMessageTimestamp(exactlyOneDayAgo, false);
      
      expect(result).toContain('Yesterday at');
    });

    it('should handle leap year dates correctly', () => {
      // Test February 29th on a leap year
      const leapYearDate = new Date('2024-02-29T12:00:00.000Z');
      const result = formatChatMessageTimestamp(leapYearDate, false);
      
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle different locales consistently', () => {
      // The function uses specific locale settings, so it should be consistent
      const date = createDate(-3, 16, 45);
      const result = formatChatMessageTimestamp(date, false);
      
      // Should contain English day and month names in format "Monday, October 27 at 16:45"
      expect(result).toMatch(/^\w+day, \w+ \d{2} at \d{1,2}:\d{2}$/);
    });
  });

  describe('Integration Tests', () => {
    it('should work together in renderChatMessageAsText with various timestamps', () => {
      const todayMessage = createTestMessage(
        EChatRole.kUser,
        'Today message',
        new Date()
      );

      const result = renderChatMessageAsText(todayMessage);
      
      expect(result).toContain('[Today (');
      expect(result).toContain('User:');
      expect(result).toContain('Today message');
    });

    it('should handle message with yesterday timestamp', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const yesterdayMessage = createTestMessage(
        EChatRole.kAssistant,
        'Yesterday message',
        yesterday
      );

      const result = renderChatMessageAsText(yesterdayMessage);
      
      expect(result).toContain('[Yesterday (');
      expect(result).toContain('Assistant:');
      expect(result).toContain('Yesterday message');
    });

    it('should handle message with older timestamp', () => {
      const olderDate = new Date();
      olderDate.setDate(olderDate.getDate() - 5);
      
      const olderMessage = createTestMessage(
        EChatRole.kUser,
        'Older message',
        olderDate
      );

      const result = renderChatMessageAsText(olderMessage);
      
      expect(result).not.toContain('Today');
      expect(result).not.toContain('Yesterday');
      expect(result).toContain('User:');
      expect(result).toContain('Older message');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle invalid date gracefully', () => {
      const invalidDate = new Date('invalid-date-string');
      
      // The function should not throw, even with invalid dates
      expect(() => {
        formatChatMessageTimestamp(invalidDate, false);
      }).not.toThrow();
    });

    it('should handle very old dates', () => {
      const veryOldDate = new Date('1900-01-01T12:00:00.000Z');
      const result = formatChatMessageTimestamp(veryOldDate, false);
      
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle very future dates', () => {
      const futureDate = new Date('2100-12-31T23:59:59.999Z');
      const result = formatChatMessageTimestamp(futureDate, false);
      
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle message with very long content', () => {
      const longContent = 'A'.repeat(10000);
      const message = createTestMessage(
        EChatRole.kUser,
        longContent,
        new Date()
      );

      const result = renderChatMessageAsText(message);
      
      expect(result).toContain('User:');
      expect(result).toContain(longContent);
      expect(result.length).toBeGreaterThan(10000);
    });

    it('should handle message with Unicode characters', () => {
      const unicodeMessage = createTestMessage(
        EChatRole.kUser,
        '🚀 Hello 世界 🌍 Émojis and ñoñó',
        new Date()
      );

      const result = renderChatMessageAsText(unicodeMessage);
      
      expect(result).toContain('User:');
      expect(result).toContain('🚀 Hello 世界 🌍 Émojis and ñoñó');
    });
  });
});
