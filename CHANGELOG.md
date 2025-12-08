# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-12-08

### Added

- **Loading Screen**: Introduced a glassmorphism-styled loading spinner (`LoadingSpinnerComponent`) to improve UX during data fetching or API timeouts.
- **Store Loading State**: `QuizStore` now exposes an `isLoading` signal.
- **Unit Tests**: comprehensive test coverage (1:1 mapping) for all components and services.
- **Documentation**: Comprehensive IHK-compliant German JSDoc/TSDoc for all classes and methods.

### Changed

- **Architecture**: Complete refactoring to "Single Class per File" structure.
- **Core Layer**: Extracted `OceanDataService` and `BaseApiService` into `@core`.
- **Shared Layer**: Modularized reusable components (`OceanCard`, `ProgressBar`) into `@shared`.
- **Models**: Extracted interfaces (`Ocean`, `Inhabitant`, `QuizQuestion`) into separate files.
- **Test Runner**: Migrated from Karma to **Vitest** for faster and more reliable testing.
- **CI/CD**: Optimized GitHub Actions workflow (`.github/workflows/main.yml`) to use stable action versions (v4) and consolidated pipelines.

### Fixed

- **E2E Tests**: Fixed timing issues in Playwright tests by increasing timeouts and optimizing selectors.
- **Image Fallback**: `ImageFallbackDirective` now correctly handles empty inputs.
- **API URL**: Corrected `OceanDataService` API endpoint to match the backend.

### Removed

- **Karma**: Completely replaced by Vitest.
- **Circular Dependencies**: Resolved strict architecture violations.
