import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'

const filePath = path.join(__dirname, '../test-data/users.xlsx')
const workbook = XLSX.readFile(filePath)

// Get first Sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const UsersData = XLSX.utils.sheet_to_json(sheet)

const TestDataPath = path.join(__dirname, "..", "test-data", "users.json");
fs.writeFileSync(TestDataPath,JSON.stringify(UsersData,null,2))

console.log('✅ users.json created successfully!')