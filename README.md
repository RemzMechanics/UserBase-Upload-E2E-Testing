UserBase-Upload-E2E-Testing
End-to-end (E2E) testing project for validating the Userbase Upload page workflows, covering UI, functional, and error handling scenarios.

📌 Project Overview
This project ensures the Userbase Upload Page functions correctly by testing:

- Service Name selection
- Reference ID validation
- File upload (Userbase File)
- File template download
- Clawback Reason input

End-to-end flow from upload → backend → UI confirmation

🛠️ Tech Stack
- Framework/Tool: Playwright
- Language: JavaScript / TypeScript
- Reporting: HTML Report

🚀 Setup Instructions
Clone the repo:
git clone https://github.com/your-repo/UserBase-Upload-E2E-Testing.git
cd UserBase-Upload-E2E-Testing

Install dependencies:
npm install
npm init playwright@latest

▶️ Running Tests
Run all E2E tests: npx playwright test -headed or via UI (npx playwright test -ui)

✅ Test Coverage

- Positive Scenarios
  - Upload valid Userbase file
  - Correct Service + Reference ID submission
  - Successful template download
  - Negative Scenarios
  - Invalid/empty Reference ID
  - Missing required fields
  - Uploading wrong file format
  - File not displayed in DB/temp_table after upload

📊 Reports
  - Test results are stored in /reports with screenshots/videos of failures.
📄 Contribution Guidelines
  - Branch naming: feature/<name> or fix/<name>
  - Pull requests require at least 1 review before merge


