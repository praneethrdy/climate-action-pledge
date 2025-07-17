import { PledgeData } from '../types';
import { fetchFromGoogleSheets, appendToGoogleSheets, initializeGoogleSheets } from './googleSheetsAPI';

// Convert Google Sheets row to PledgeData format
const convertSheetRowToPledge = (row: any): PledgeData => ({
  id: row.id,
  name: row.name,
  email: row.email,
  mobile: row.mobile,
  state: row.state,
  profileType: row.profileType,
  commitments: row.commitments.split('|'),
  date: row.date,
  heartsRating: row.heartsRating
});

// Convert PledgeData to Google Sheets row format
const convertPledgeToSheetRow = (pledge: PledgeData) => ({
  name: pledge.name,
  email: pledge.email,
  mobile: pledge.mobile,
  state: pledge.state,
  profileType: pledge.profileType,
  commitments: pledge.commitments.join('|'),
  date: pledge.date,
  heartsRating: pledge.heartsRating
});
export const initializeStorage = (): void => {
  initializeGoogleSheets();
};

export const getPledges = async (): Promise<PledgeData[]> => {
  const sheetData = await fetchFromGoogleSheets();
  return sheetData.map(convertSheetRowToPledge);
};

export const addPledge = async (pledge: PledgeData): Promise<PledgeData> => {
  const sheetRow = convertPledgeToSheetRow(pledge);
  const newRow = await appendToGoogleSheets(sheetRow);
  return convertSheetRowToPledge(newRow);
};

export const generatePledgeId = async (): Promise<string> => {
  const pledges = await getPledges();
  const lastId = pledges.length > 0 ? parseInt(pledges[0].id.replace('PLD', '')) : 0;
  return `PLD${String(lastId + 1).padStart(3, '0')}`;
};