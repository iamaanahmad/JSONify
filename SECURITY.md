# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The JSONify team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:

📧 **security@cit.org.in**

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include in Your Report

Please include the following information:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt of your vulnerability report within 48 hours
- **Communication**: We'll keep you informed about the progress of fixing the vulnerability
- **Credit**: We'll credit you in the security advisory (unless you prefer to remain anonymous)
- **Timeline**: We aim to patch critical vulnerabilities within 7 days

## Security Best Practices for Users

When using JSONify:

1. **Don't paste sensitive data**: Avoid pasting API keys, passwords, or other sensitive information
2. **Use the Security Scanner**: Run the built-in security scanner before sharing JSON
3. **Clear your data**: Clear the editor after working with sensitive information
4. **Use HTTPS**: Always access JSONify via HTTPS
5. **Keep updated**: Use the latest version for the most recent security patches

## Security Features

JSONify includes several security features:

- 🔒 **AI-Powered Security Scanner**: Detects sensitive data like API keys and passwords
- 🛡️ **Client-Side Processing**: All JSON processing happens in your browser
- 🔐 **No Data Storage**: We don't store or transmit your JSON data to our servers
- 🌐 **HTTPS Only**: All connections are encrypted
- 📱 **PWA Security**: Offline functionality with secure service workers

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release patches as soon as possible

## Comments on This Policy

If you have suggestions on how this process could be improved, please submit a pull request or email us at security@cit.org.in.

## Hall of Fame

We'd like to thank the following security researchers for responsibly disclosing vulnerabilities:

<!-- Add security researchers here -->
- *Be the first to report a security issue!*

---

Thank you for helping keep JSONify and our users safe! 🛡️
