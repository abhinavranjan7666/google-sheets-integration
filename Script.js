function importDataFromSource() {

  const sources = [
    {
      spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1JlmRoZGe-QUlohHJmRNj9AxJW7OsTMGHJthj-G1K4sc/edit?gid=1168761985#gid=1168761985",
      sheetName: "Master V1",
      range: "A:BI",
      destinationSheet: "Imported Data"
    },

    {
      spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1-KDBcKb6fVt6l7D-cP8eGhqW1Plie5e1-5WQus52uog/edit?gid=322822281#gid=322822281",
      sheetName: "Tickets",
      range: "A:Z",
      destinationSheet: "Ticketing_Raw"
    }
  ];


  // Destination spreadsheet
  const destinationSS =
    SpreadsheetApp.getActiveSpreadsheet();


  // Import each source separately
  sources.forEach(source => {

    // ==========================================
    // OPEN SOURCE SPREADSHEET
    // ==========================================

    const sourceSS =
      SpreadsheetApp.openByUrl(
        source.spreadsheetUrl
      );


    // ==========================================
    // OPEN SOURCE TAB
    // ==========================================

    const sourceSheet =
      sourceSS.getSheetByName(
        source.sheetName
      );


    if (!sourceSheet) {
      throw new Error(
        "Source tab not found: " +
        source.sheetName
      );
    }


    // ==========================================
    // GET SOURCE DATA
    // ==========================================

    const data =
      sourceSheet
        .getRange(source.range)
        .getValues();


    // ==========================================
    // FIND DESTINATION TAB
    // ==========================================

    let destinationSheet =
      destinationSS.getSheetByName(
        source.destinationSheet
      );


    // Create destination tab if it doesn't exist
    if (!destinationSheet) {

      destinationSheet =
        destinationSS.insertSheet(
          source.destinationSheet
        );

    }


    // ==========================================
    // CLEAR OLD DATA
    // ==========================================

    const oldLastRow =
      destinationSheet.getLastRow();

    const oldLastColumn =
      destinationSheet.getLastColumn();


    if (
      oldLastRow > 0 &&
      oldLastColumn > 0
    ) {

      destinationSheet
        .getRange(
          1,
          1,
          oldLastRow,
          oldLastColumn
        )
        .clearContent();

    }


    // ==========================================
    // PASTE NEW DATA
    // ==========================================

    if (data.length > 0) {

      destinationSheet
        .getRange(
          1,
          1,
          data.length,
          data[0].length
        )
        .setValues(data);

    }


    // ==========================================
    // LOG
    // ==========================================

    Logger.log(
      source.sheetName +
      " → " +
      source.destinationSheet +
      " | " +
      data.length +
      " rows × " +
      data[0].length +
      " columns imported."
    );

  });


  Logger.log(
    "All imports completed successfully."
  );

}
