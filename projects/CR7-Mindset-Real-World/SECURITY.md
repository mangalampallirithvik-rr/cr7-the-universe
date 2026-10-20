# Security and privacy notes

- Account names are unique within this app's local browser/app storage.
- Passwords are not stored in plain text. Password verification uses PBKDF2-HMAC-SHA-256 with a random per-account salt and 310,000 iterations.
- Each profile's app data uses a distinct storage key; logging out hides the app and clears the active profile from memory.
- No network account, analytics, cloud sync, or remote API is used for account authentication.
- **Important limitation:** profile data is stored in localStorage and is not encrypted at rest. Someone with access to the same OS user account and browser developer tools/files can inspect or alter it. This is suitable for local profile separation, not high-assurance secrecy against a device owner or malware. Do not reuse a sensitive password.
- Browser storage can be deleted by the browser or user. Use Export my data for backups.
- For strongest local privacy, use separate OS user accounts and full-disk encryption. A future hardened release should encrypt each profile's data with an authenticated key derived from the user's password and include recovery/backup handling.
- No app can be called fully security-validated without threat modelling, dependency auditing, platform builds, and device testing.
