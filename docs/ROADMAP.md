# CrossView Roadmap

This roadmap outlines the planned direction for **CrossView**, the open-source dashboard for visualizing and managing Crossplane resources in Kubernetes clusters. It is a living document and subject to change based on community feedback, contributor priorities, and the evolving needs of the Crossplane ecosystem.

We welcome contributions, discussions, and new ideas via GitHub Issues, Discussions, or Pull Requests!

## Current Status (as of June 2026)

- Stable core features: real-time resource watching, interactive relationship graphs, **partial multi-cluster support** (full support when running outside Kubernetes via kubeconfig; limited to single cluster when deployed inside via Helm/service account), detailed resource views, OIDC/SAML SSO, Helm chart deployment
- Latest release: v4.0.0 (June 2026)
- Actively maintained with frequent updates

## Short-term (Next 3–6 months) – v4.x
**Focus:** Security hardening, real-time experience, usability, and ecosystem integrations

- **Fine-grained RBAC permissions**  
  Implement Kubernetes-native authorization checks (via SubjectAccessReview API) so users only see/edit resources they are allowed to access. Support Crossplane-specific verbs (e.g., view compositions, approve claims).

- **Improved resource watching**  
  Significantly enhance real-time watching: better performance on large clusters, smarter event filtering, improved reconnection logic, and reduced latency.

- **Improved search and filtering**  
  Advanced full-text search across all resource fields, saved searches, quick filters (by status, provider, composition, cluster), and cross-cluster search.

- **Events & audit log viewer**  
  Dedicated tab for browsing Kubernetes events and Crossplane reconciliation events with filtering, timestamps, and direct correlation to resources.

- **Full multi-cluster support (in-cluster)**  
  Enable true multi-cluster management when CrossView is deployed inside Kubernetes (via Helm). Support loading multiple kubeconfigs, using external cluster credentials/secrets, unified views, easy context switching, and cluster grouping — removing the current limitation of single-cluster service-account access.

- **Native Headlamp Plugin**  
  Develop a native Headlamp plugin (see [crossview-headlamp](https://github.com/MoeidHeidari/crossview-headlamp)) that integrates the CrossView UI into Headlamp while using **CrossView’s own backend**. The plugin will connect to the CrossView backend service instead of relying on Headlamp’s backend, providing a seamless experience within Headlamp’s interface while leveraging CrossView’s full capabilities (real-time watching, graphs, etc.).

## Medium-term (6–12 months) – v4.x – v5.x
**Focus:** Deeper Crossplane integration, visibility, and GitOps alignment

- **Resource diff & history viewer (YAML support)**  
  Side-by-side and unified YAML diff, generation-based history, change attribution, and drift visualization.

- **GitOps integration**  
  Show Git commit links for managed resources and claims via annotations. Basic drift detection against Git source.

- **Full Flux/Argo CD deep integration**  
  Deep support for Flux and Argo CD: reconciliation status, sync state, Git repository linking, and visual indicators for drift or sync failures.

- **Full resource map / relationship graph improvements**  
  Enhanced interactive resource map showing full dependency graphs across clusters, with better filtering and navigation.

- **Analytics page**  
  Overview dashboard with usage statistics, resource distribution, health trends, and Crossplane adoption metrics across clusters.

## Long-term (12+ months) – v5.x+
**Focus:** Advanced capabilities and ecosystem leadership

- **Crossplane-native plugin system**  
  Allow community extensions (custom widgets, resource renderers, actions) via WebAssembly or simple JS plugins.

- **Cost & usage insights**  
  Integrate with provider-specific cost APIs to show estimated costs per composition/claim.

- **AI-assisted troubleshooting**  
  Natural language query support and suggested fixes (optional opt-in, using local or user-provided LLM).

## How to Influence the Roadmap

- Open a GitHub Issue or Discussion for feature requests
- Upvote existing issues to show demand
- Contribute code, tests, docs, or design feedback

We aim to release major versions roughly every 3–4 months, with patch releases in between. Thank you for using and supporting CrossView!