# Google Sheets Data Importer

A Google Apps Script that automatically imports data from multiple Google Spreadsheets into separate tabs in a destination spreadsheet.

## Features

- Import data from multiple Google Spreadsheets
- Specify source spreadsheet, sheet name, and range
- Import each source into a separate destination tab
- Automatically create destination tabs if they don't exist
- Clear old data before importing the latest data

## How to Add a New Spreadsheet

To import another spreadsheet, add a new object inside the `sources` array:

{
  spreadsheetUrl: "NEW_SPREADSHEET_URL",
  sheetName: "SOURCE_SHEET_NAME",
  range: "A:Z",
  destinationSheet: "DESTINATION_TAB_NAME"
}

### Example

{
  spreadsheetUrl: "https://docs.google.com/spreadsheets/d/XXXXXXXXXXXX/edit",
  sheetName: "Master",
  range: "A:Z",
  destinationSheet: "New_Data"
}

### What You Need to Change

| Field | What to enter |
|---|---|
| `spreadsheetUrl` | URL of the new Google Spreadsheet |
| `sheetName` | Name of the source tab |
| `range` | Range to import, e.g. `A:Z`, `C:D`, `A2:BI` |
| `destinationSheet` | Name of the tab where data should be imported |

No changes are required in the main import logic. Simply add another source object to the `sources` array.

## Important

The Google account running the script must have access to all source spreadsheets.
