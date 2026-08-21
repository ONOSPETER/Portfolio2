---
name: Public profile feeds
description: Constraints when refreshing portfolio content from public GitHub, Medium, and ResearchGate profiles.
---

Public GitHub and Medium feeds can be read anonymously at request time, but ResearchGate may deny server-side fetches even when the profile page is publicly viewable.

**Why:** Public profile pages use different access controls and scraping behavior; treating every source as equally reliable makes a portfolio brittle.

**How to apply:** Keep a graceful ResearchGate metadata fallback and expose the profile link, while refreshing GitHub repositories and Medium RSS articles from the server.