import { z } from "zod";

export const safeString = z
  .string()
  .min(1, "cannot be empty")
  .max(200, "too long")
  // 1. null bytes
  .refine((val) => !val.includes("\0"), "contains prohibited characters")
  // 2. XSS
  .refine((val) => {
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /on\w+=/i,
      /<iframe/i,
      /<embed/i,
      /<object/i,
      /<link/i,
      /<meta/i,
      /expression\(/i, // CSS expression
      /url\(/i, // CSS url()
      /import\(/i, // ES6 dynamic import
      /eval\(/i,
      /setTimeout/i,
      /setInterval/i,
      /Function\(/i,
      /@import/i, // CSS @import
      /<!--/, // HTML comments
      /-->/,
      /<\?/, // PHP tags
      /\?>/,
      /<\%/, // ASP tags
      /\%>/,
    ];
    return !xssPatterns.some((pattern) => pattern.test(val));
  }, "contains prohibited characters")

  // 3. SQL injection
  .refine((val) => {
    const sqlPatterns = [
      // Base SQL commands
      /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b/i,
      // SQL comments
      /--/,
      /\/\*/,
      /\*\//,
      // SQL string literals
      /'/,
      /"/,
      /`/,
      // SQL command ending
      /;/,
      // SQL functions
      /\b(CONCAT|CHAR|ASCII|SUBSTRING|LENGTH|UPPER|LOWER)\b/i,
      // Hexadecimal values
      /0x[0-9a-fA-F]+/,
      // SQL wildcards
      /\bLIKE\b.*[\%\_]/i,
      // UNION based injections
      /\bUNION\b.*\bSELECT\b/i,
      // Boolean based injections
      /\b(AND|OR)\b.*[=<>]/i,
      // Time based injections
      /\b(SLEEP|DELAY|WAITFOR)\b/i,
      // Information schema
      /information_schema/i,
      // MySQL specific
      /@@version/i,
      // PostgreSQL specific
      /version\(\)/i,
      // MSSQL specific
      /\bxp_cmdshell\b/i,
    ];

    return !sqlPatterns.some((pattern) => pattern.test(val));
  }, "contains reserved words")

  // 4. LDAP injection
  .refine((val) => {
    const ldapChars = /[\(\)\*\\\x00]/;
    return !ldapChars.test(val);
  }, "contains prohibited characters")

  // 5. Command injection
  .refine((val) => {
    const cmdPatterns = [
      /[;&|`$\(\){}]/, // Command separators
      /\.\./, // Directory traversal
      /~[^\/\s]/, // Home directory shortcuts
      /\b(cat|ls|dir|type|copy|del|rm|mv|cp|chmod|chown|ps|kill|nc|netcat|wget|curl|ping|nmap|whoami|id|uname|passwd|sudo|su)\b/i,
    ];

    return !cmdPatterns.some((pattern) => pattern.test(val));
  }, "contains prohibited characters or reserved words")

  // 6. Unicode symbols
  .refine((val) => {
    const invisibleChars =
      /[\u0000-\u001F\u007F-\u009F\u00AD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]/;
    return !invisibleChars.test(val);
  }, "invalid characters detected")

  // 7. homograph attacks
  .refine((val) => {
    const allowedChars = /^[a-zA-Z0-9\s\.,!?\-_()]+$/;
    return allowedChars.test(val);
  }, "only Latin characters and basic punctuation allowed");

// ID
export const safeId = z
  .string()
  .regex(/^[a-zA-Z0-9_-]+$/, "Invalid ID format")
  .min(1, "ID cannot be empty")
  .max(50, "ID too long")
  .refine((val) => {
    // ID must not start or end with special characters
    return /^[a-zA-Z0-9]/.test(val) && /[a-zA-Z0-9]$/.test(val);
  }, "ID must start and end with alphanumeric character")

  .refine((val) => {
    // ID must not contain more than one specific character in a row
    return !/[-_]{2,}/.test(val);
  }, "ID cannot contain consecutive special characters")

  // check for reserved words
  .refine((val) => {
    const reservedWords = [
      "null",
      "undefined",
      "admin",
      "root",
      "system",
      "config",
      "api",
      "www",
      "ftp",
      "mail",
      "email",
      "test",
      "demo",
      "constructor",
      "prototype",
      "__proto__",
      "valueOf",
      "toString",
    ];
    return !reservedWords.includes(val.toLowerCase());
  }, "ID contains reserved word");
