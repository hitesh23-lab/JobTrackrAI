import { getUncachableGoogleSheetClient } from '../sheets-client';
import { storage } from '../storage';
import type { Application } from '@shared/schema';

const SPREADSHEET_NAME = 'Job Applications Tracker';

async function createSpreadsheet() {
  try {
    const sheets = await getUncachableGoogleSheetClient();
    
    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: SPREADSHEET_NAME,
        },
        sheets: [{
          properties: {
            title: 'Applications',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [{
            startRow: 0,
            startColumn: 0,
            rowData: [{
              values: [
                { userEnteredValue: { stringValue: 'ID' } },
                { userEnteredValue: { stringValue: 'Company' } },
                { userEnteredValue: { stringValue: 'Title' } },
                { userEnteredValue: { stringValue: 'Location' } },
                { userEnteredValue: { stringValue: 'Salary' } },
                { userEnteredValue: { stringValue: 'Status' } },
                { userEnteredValue: { stringValue: 'Applied Date' } },
                { userEnteredValue: { stringValue: 'Job URL' } },
                { userEnteredValue: { stringValue: 'Notes' } },
              ]
            }]
          }]
        }]
      }
    });

    return response.data.spreadsheetId!;
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    throw error;
  }
}

async function getSharedSpreadsheetId(): Promise<string> {
  const profile = await storage.getProfile();
  
  if (profile?.googleSheetsId) {
    return profile.googleSheetsId;
  }
  
  const spreadsheetId = await createSpreadsheet();
  
  if (profile?.id) {
    await storage.updateProfile(profile.id, { googleSheetsId: spreadsheetId });
  }
  
  return spreadsheetId;
}

export async function syncApplicationToSheets(application: Application) {
  try {
    const sheets = await getUncachableGoogleSheetClient();
    const spreadsheetId = await getSharedSpreadsheetId();

    const values = [[
      application.id,
      application.company,
      application.title,
      application.location,
      application.salary || '',
      application.status,
      application.appliedDate.toISOString().split('T')[0],
      application.jobUrl || '',
      application.notes || '',
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Applications!A:I',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    return spreadsheetId;
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    throw error;
  }
}

export async function updateApplicationInSheets(application: Application) {
  try {
    const sheets = await getUncachableGoogleSheetClient();
    const spreadsheetId = await getSharedSpreadsheetId();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Applications!A:A',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === application.id);

    if (rowIndex === -1) {
      return await syncApplicationToSheets(application);
    }

    const values = [[
      application.id,
      application.company,
      application.title,
      application.location,
      application.salary || '',
      application.status,
      application.appliedDate.toISOString().split('T')[0],
      application.jobUrl || '',
      application.notes || '',
    ]];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Applications!A${rowIndex + 1}:I${rowIndex + 1}`,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    return spreadsheetId;
  } catch (error) {
    console.error('Error updating in Google Sheets:', error);
    throw error;
  }
}
