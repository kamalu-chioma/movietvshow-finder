# Movie/TV Show Finder App

## Overview
This application provides a platform for movie enthusiasts to explore, review, and manage a list of favorite movies and TV shows, utilizing real-time data from the TMDB API.

## Getting Started

### Prerequisites
Before you begin, ensure you have installed:
- Git
- Node.js (latest stable version)
- npm (Node Package Manager)

### Setup and Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/kamalu-chioma/movietvshow-finder.git

   ```
2. **Navigate to the project directory:**
   ```bash
   cd movietvshow-finder
   ```
3. **Install required packages:**
   ```bash
   npm install
   ```
4. **Launch the development server:**
   ```bash
   npm start
   ```

## Workflow Guidelines

### 1. Commits
Commit messages should be concise and follow this format:
```plaintext
<type>(<scope>): <description>
```
- **Type**: Type of change (feat, fix, docs, style, refactor, test, chore)
- **Scope**: Part of the project affected (optional)
- **Description**: A brief, present tense summary of the change

**Example:**
```bash
feat(search): implement autocomplete on movie search
```

### 2. Branching
Use a systematic approach to branching:
- **main**: Only for production-ready states.
- **dev**: Integration branch for all developments.
- **feature**: For new features. Name it `feature/<feature-name>`.
- **fix**: For bug fixes. Name it `fix/<bug-description>`.

### 3. Using Branches
- **New Features**: Create a `feature` branch from `dev`.
- **Bug Fixes**: Create a `fix` branch from `dev`.
- **Integration**: Merge features and fixes back to `dev` for testing.

### 4. Pull Requests
- **Opening Pull Requests**: Open a PR to merge your branch to `dev` when you are ready to integrate your changes.
- **Review and Merge**: Your PR must be reviewed and approved before merging. Ensure all discussions are resolved.

### 5. Pulling and Pushing
- **Pulling**: Always pull from `dev` before starting new work:
  ```bash
  git checkout dev
  git pull origin dev
  ```
- **Pushing**: Push your commits to your branch:
  ```bash
  git push origin <branch-name>
  ```

## Conclusion
Follow these guidelines to maintain a smooth workflow and contribute effectively to the project. Adherence to these rules ensures that our codebase remains organized and that all contributions are integrated seamlessly.

### TLDR (PLEASE READ EVERYTHING ABOVE, LOL):

- Setup: Clone the repo, install dependencies, and start the server.
  
- Commit Changes: Write clear commit messages with the change type and a brief summary.

- Branching: Use main for production, dev for integration, feature branches for new features, and fix branches for fixes.
  
- Updating: Regularly pull from dev to stay updated.

- Integration:
•	Push changes to your branch.
•	Open a pull request to merge into dev.
•	As the repo owner, I approve all merges to ensure quality and consistency.



