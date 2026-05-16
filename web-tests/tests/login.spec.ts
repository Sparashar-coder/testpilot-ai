import {test , expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'

import * as fs from 'fs'
import * as path from 'path'

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'test-data', 'users.json'), 'utf-8')
)
const validUser = users.find((u:any )=> u.userType ==='validUser')
const InvalidUser = users.find((u:any )=> u.userType ==='invalidUser')


test('Test Valid User',async({ page })=>{
    const loginpage = new LoginPage(page);
    const homepage = new HomePage(page);
    await loginpage.navigateTo();
    

   await loginpage.login(validUser.email,validUser.password)
  const isloggedIn = await homepage.isLoggedIn(validUser.name)
  expect(isloggedIn).toBe(true)

})

test('Invalid User', async({ page })=>{
  const loginpage = new LoginPage(page);
  await loginpage.navigateTo();

await loginpage.login(InvalidUser.email,InvalidUser.password)
const message = await loginpage.getErrorMessage();
expect(message).toEqual('Your email or password is incorrect!')
})

test('Empty Fields Test', async ({ page }) => {
  const EmptyUser = users.find((u:any )=> u.userType ==='emptyData')
  const loginpage = new LoginPage(page);
  await loginpage.navigateTo();
  await loginpage.login(EmptyUser.email,EmptyUser.password)
  expect(page.url()).toContain('/login')
})



test('SQL Injection Test', async ({ page }) => {
  const maliciousUser = users.find((u:any )=> u.userType ==='maliciousData')
  const loginpage = new LoginPage(page);
  await loginpage.navigateTo();
  await loginpage.login(maliciousUser.email,maliciousUser.password)

  expect(page.url()).toContain('/login')
})

test('XSS Attack Test', async ({ page }) => {
  const maliciousUser = users.find((u:any )=> u.userType ==='maliciousData')
  const loginpage = new LoginPage(page);
  await loginpage.navigateTo();
  await loginpage.login(maliciousUser.email,maliciousUser.password)

  expect(page.url()).toContain('/login')
})