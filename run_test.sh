#!/bin/bash

##############################################
# Web Automation Test Runner
# Usage: ./run_test.sh [browser] [tag]
##############################################

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}=========================================="
echo "   Web Automation Test Runner"
echo -e "==========================================${NC}"
echo ""

# Parse arguments
BROWSER=${1:-chromium}
TAG=${2:-}

# Validate browser
if [[ "$BROWSER" != "chromium" && "$BROWSER" != "firefox" && "$BROWSER" != "webkit" ]]; then
    echo -e "${RED}Error: Browser must be 'chromium', 'firefox', or 'webkit'${NC}"
    echo "Usage: ./run_test.sh [browser] [tag]"
    echo "Example:"
    echo "  ./run_test.sh chromium"
    echo "  ./run_test.sh chromium @smoke"
    echo "  ./run_test.sh firefox @login"
    exit 1
fi

# Display configuration
echo -e "${GREEN}Configuration:${NC}"
echo "  Browser: $BROWSER"
if [ -n "$TAG" ]; then
    echo "  Tag: $TAG"
else
    echo "  Tag: all tests"
fi
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js not found${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites met${NC}"
echo ""

# Clean previous results
echo -e "${YELLOW}Cleaning previous results...${NC}"
rm -rf allure-results allure-report reports test-results 2>/dev/null
echo -e "${GREEN}✓ Cleaned${NC}"
echo ""

# Build Playwright command
PLAYWRIGHT_CMD="npx playwright test --project=$BROWSER"

if [ -n "$TAG" ]; then
    PLAYWRIGHT_CMD="$PLAYWRIGHT_CMD --grep \"$TAG\""
fi

# Run tests
echo -e "${BLUE}=========================================="
echo "   Running Tests"
echo -e "==========================================${NC}"
echo ""

eval $PLAYWRIGHT_CMD
TEST_RESULT=$?

echo ""
echo -e "${BLUE}=========================================="
if [ $TEST_RESULT -eq 0 ]; then
    echo -e "   ${GREEN}Tests Completed${NC}"
else
    echo -e "   ${YELLOW}Tests Completed with Failures${NC}"
fi
echo -e "${BLUE}==========================================${NC}"
echo ""

# Generate and serve Allure report
if [ -d "allure-results" ] && [ "$(ls -A allure-results)" ]; then
    echo -e "${YELLOW}Opening Allure report...${NC}"
    echo ""

    # Use allure serve to automatically generate and open report
    npx allure serve allure-results

else
    echo -e "${YELLOW}No test results found${NC}"
fi

echo ""
echo -e "${BLUE}=========================================="
echo "   Done"
echo -e "==========================================${NC}"
echo ""

# Show available tags
if [ $TEST_RESULT -ne 0 ]; then
    echo "Available tags:"
    echo "  @smoke     - Smoke tests"
    echo "  @login     - Login tests"
    echo "  @dashboard - Dashboard tests"
    echo "  @negative  - Negative tests"
    echo ""
    echo "Available browsers:"
    echo "  chromium   - Chrome browser"
    echo "  firefox    - Firefox browser"
    echo "  webkit     - Safari browser"
    echo ""
    echo "Example: ./run_test.sh chromium @smoke"
    echo ""
fi

exit $TEST_RESULT
