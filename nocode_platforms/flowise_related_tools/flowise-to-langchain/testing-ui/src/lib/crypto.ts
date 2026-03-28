// Simple encryption utilities for sensitive data storage
// Note: This is client-side encryption and should not be relied upon for security
// in production environments. Server-side encryption is recommended.

class SimpleCrypto {
  private key: string

  constructor(key?: string) {
    this.key = key || this.generateKey()
  }

  private generateKey(): string {
    // Check if running in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // Server-side fallback key
      return 'fallback-server-key-' + Math.random().toString(36).substr(2, 9)
    }
    
    // Generate a simple key based on browser fingerprint
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillText('Flowise fingerprint', 2, 2)
    }
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
    ].join('|')
    
    // Simple hash function
    let hash = 0
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36)
  }

  encrypt(text: string): string {
    if (!text) return text
    
    try {
      // Simple XOR encryption
      const encrypted = Array.from(text)
        .map((char, i) => {
          const keyChar = this.key.charCodeAt(i % this.key.length)
          return String.fromCharCode(char.charCodeAt(0) ^ keyChar)
        })
        .join('')
      
      // Base64 encode to make it safe for storage
      if (typeof btoa !== 'undefined') {
        return btoa(encrypted)
      } else {
        // Node.js fallback
        return Buffer.from(encrypted, 'binary').toString('base64')
      }
    } catch (error) {
      console.warn('Encryption failed, storing plain text:', error)
      return text
    }
  }

  decrypt(encryptedText: string): string {
    if (!encryptedText) return encryptedText
    
    try {
      // Base64 decode
      const encrypted = typeof atob !== 'undefined' 
        ? atob(encryptedText)
        : Buffer.from(encryptedText, 'base64').toString('binary')
      
      // XOR decrypt (same operation as encrypt)
      const decrypted = Array.from(encrypted)
        .map((char, i) => {
          const keyChar = this.key.charCodeAt(i % this.key.length)
          return String.fromCharCode(char.charCodeAt(0) ^ keyChar)
        })
        .join('')
      
      return decrypted
    } catch (error) {
      console.warn('Decryption failed, returning original text:', error)
      return encryptedText
    }
  }

  isEncrypted(text: string): boolean {
    if (!text) return false
    
    try {
      // Try to base64 decode
      const decoded = typeof atob !== 'undefined' 
        ? atob(text)
        : Buffer.from(text, 'base64').toString('binary')
      // If it contains non-printable characters, it's likely encrypted
      return /[\x00-\x1F\x7F-\x9F]/.test(decoded)
    } catch {
      return false
    }
  }
}

// Export singleton instance
export const crypto = new SimpleCrypto()

export default crypto