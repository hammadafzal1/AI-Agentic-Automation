# End-to-End QA Workflow with Natural Language

## Workflow Overview

This prompt guides you through a complete 7-step QA workflow using MCP servers and AI agents to go from a user story to committed automated test scripts.

---

# STEP 1: Read User Story

### Prompt

I need to start a new testing workflow.

Please read the user story from the file:

user-stories/Scrum-101-ecommerce-checkout.md

Summarize the key requirements, acceptance criteria, application URL, test credentials, and testing scope.

### Expected Output

* Summary of the user story
* List of acceptance criteria
* Application URL
* Test credentials
* Key features to test

---

# STEP 2: Create Test Plan

### Prompt

Based on the user story we just reviewed, use the Playwright Test Planner Agent.

Read the application URL and test credentials from the user story.

Explore the application and understand all workflows mentioned in the acceptance criteria.

Create a comprehensive test plan that covers:

* Happy path scenarios
* Negative scenarios
* Edge cases
* Boundary conditions
* Navigation flow testing
* UI element validations
* Error handling scenarios

Save the test plan under:

specs/saucedemo-checkout-test-plan.md

Ensure each test scenario contains:

* Test Case ID
* Description
* Preconditions
* Test Steps
* Expected Results
* Priority

### Expected Output

* Comprehensive test plan document
* Functional test scenarios
* Negative test scenarios
* Edge cases
* UI validation scenarios
* Navigation test scenarios

Output File:

specs/saucedemo-checkout-test-plan.md

---

# STEP 3: Perform Exploratory Testing

### Prompt

Now I need to perform manual exploratory testing using Playwright MCP Browser Tools.

Please read the test plan created in the previous step from: specs/saucedemo-checkout-test-plan.md

Perform exploratory testing based on all test scenarios.

Use Playwright Browser Tools to:

* Execute test scenarios
* Follow step-by-step instructions in each test case
* Verify expected results
* Compare expected and actual behavior
* Capture screenshots
* Document findings
* Record browser console errors
* Record network failures

Save all findings and screenshots.

### Expected Output

* Manual test execution results
* Screenshots
* List of observations
* Functional issues discovered
* UI issues discovered
* Browser console errors
* Network failures



---

# STEP 4: Auto Generate Tests

### Prompt

Now I need to create automated test scripts using Playwright Test Generator Agent.

Please review:

1. The test plan from Step 2: specs/saucedemo-checkout-test-plan.md
2. The exploratory testing findings from Step 3

Using insights from both sources, generate Playwright JavaScript automation scripts.

Requirements:

* Create scripts for every test scenario
* Organize scripts into appropriate test suites
* Follow Playwright best practices
* Use descriptive test names
* Use robust element selectors
* Add proper assertions
* Use reliable wait strategies
* Add comments where appropriate
* Configure execution for Chrome, Firefox, and Safari

Create a folder:

tests/saucedemo-checkout/

Store all generated scripts inside this folder.

### Expected Output

* Automated Playwright scripts
* Page objects
* Utility files
* Cross-browser configuration
* Organized test suite structure


---

# STEP 5: Execute and Heal Tests

### Prompt

Now I need to execute the generated automated test scripts and heal any failures using Playwright Test Healer Agent.

Run the entire automation scripts in tests/saucedemo-checkout/

If failures occur:

* Analyze execution logs
* Identify root causes
* Fix broken locators
* Fix timing issues
* Fix flaky tests
* Update assertions if necessary
* Re-run failed tests

Continue until all recoverable failures are resolved.

Generate a healing report documenting all fixes.

### Expected Output

* Test execution results
* Pass/fail summary
* Failure analysis
* Healed test scripts
* Re-execution results
* Root cause analysis



---

# STEP 6: Generate Test Report

### Prompt

Now generate a complete QA test report.

Use information from:

* User story
* Test plan
* Exploratory testing
* Automated execution
* Healing report

Generate a report containing:

* Executive summary
* Manual test results
* Automated test results
* Defect log
* Test coverage analysis
* Risk assessment
* Recommendations
* Release readiness assessment

Save the report in test-results/SCRUM-101-Checkout-test.md


### Expected Output

* Executive summary
* Manual testing summary
* Automation summary
* Defect report
* Coverage report
* Recommendations
* Final release status


---

# STEP 7: Commit to GitHub

### Prompt

Now I need to commit all testing artifacts to the Git repository using GitHub MCP Server.

Repository URL: 

https://github.com/hammadafzal1/AI-Agentic-Automation.git

Perform the following Git operations:

1. Initialize repository if required
2. Stage all files
3. Commit all generated artifacts
4. Push changes to repository
5. Create a pull request

Commit the following:

* User stories
* Test plans
* Exploratory testing reports
* Screenshots
* Automated test scripts
* Healing reports
* Final QA reports

Commit Message:

feat(qa): complete end-to-end autonomous QA workflow execution

### Expected Output

* Repository initialized
* Files committed
* Changes pushed
* Pull request created
* Repository updated successfully







# Single Prompt: Execute a complete End-to-End Autonomous QA Workflow using Playwright Test Planner Agent, Playwright MCP Browser Tools, Playwright Test Generator Agent, Playwright Test Healer Agent, and GitHub MCP Server.

Step 1 – Analyze User Story

Read the user story from:

user-stories/Scrum-101-ecommerce-checkout.md

Summarize the key requirements, acceptance criteria, application URL, test credentials, testing scope, and key features to test.

Step 2 – Generate Test Plan

Using the Playwright Test Planner Agent, read the application URL and credentials from the user story.

Explore the application and understand all workflows mentioned in the acceptance criteria.

Create a comprehensive test plan covering happy paths, negative scenarios, edge cases, boundary conditions, navigation flows, UI validations, and error handling scenarios.

Save the test plan as:

specs/saucedemo-checkout-test-plan.md

Step 3 – Perform Exploratory Testing

Using Playwright MCP Browser Tools, read:

specs/saucedemo-checkout-test-plan.md

Execute all test scenarios, verify expected results, compare actual vs expected behavior, capture screenshots, document findings, record browser console errors, and network failures.

Save findings and screenshots.

Step 4 – Generate Automated Tests

Using Playwright Test Generator Agent, review:

specs/saucedemo-checkout-test-plan.md
Exploratory testing findings

Generate Playwright JavaScript automation scripts for all scenarios.

Follow Playwright best practices, use robust selectors, assertions, proper waits, descriptive test names, and cross-browser support (Chrome, Firefox, Safari).

Save all automation under:

tests/saucedemo-checkout/

Step 5 – Execute and Heal Tests

Using Playwright Test Healer Agent, execute all automation scripts from:

tests/saucedemo-checkout/

If failures occur, analyze logs, identify root causes, heal broken locators, timing issues, flaky tests, and assertion failures. Re-run failed tests until all recoverable issues are resolved.

Generate a healing report.

Step 6 – Generate QA Report

Using the user story, test plan, exploratory testing results, automation execution results, and healing report, generate a final QA report containing:

Executive Summary
Manual Test Results
Automated Test Results
Defect Log
Coverage Analysis
Risk Assessment
Recommendations
Release Readiness Assessment

Save the report as:

test-results/SCRUM-101-Checkout-test.md

Step 7 – Commit to GitHub

Using GitHub MCP Server, commit all generated artifacts to:

https://github.com/hammadafzal1/AI-Agentic-Automation.git

Perform:

Initialize repository if required
Stage all files
Commit all artifacts
Push changes
Create Pull Request

Commit Message:

feat(qa): complete end-to-end autonomous QA workflow execution

Artifacts to commit:

User Story
Test Plan
Exploratory Testing Report
Screenshots
Automated Test Scripts
Healing Report
Final QA Report

Workflow completion criteria:

Test plan generated
Exploratory testing completed
Automation scripts generated
Tests executed and healed
Final QA report created
Artifacts committed and pushed to GitHub
Pull Request created successfully