import{Page , Locator} from '@playwright/test'

export class HomePage{

    private readonly page : Page
   
    private readonly logoutButton : Locator

    constructor(page :Page){
        this.page = page
        
        this.logoutButton = page.getByText('Logout', { exact: true })

    }


    async isLoggedIn(username: string): Promise<boolean> {
      await this.page.waitForLoadState('networkidle')
      return await this.page.getByText(`Logged in as ${username}`).isVisible()
  }
      async logout(){
        await this.logoutButton.click()
      }

}