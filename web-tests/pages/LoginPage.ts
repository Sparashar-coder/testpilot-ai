import{Page , Locator} from '@playwright/test'

export class LoginPage{

    private readonly page : Page
    private readonly emailField: Locator
    private readonly passwordField: Locator
    private readonly loginButton: Locator
   
    constructor(page :Page){
        this.page = page
        this.emailField = this.page.getByPlaceholder('Email Address')
        this.passwordField = this.page.getByPlaceholder('Password')
        this.loginButton = this.page.getByRole('button', { name: 'Login' })
    }

    async navigateTo(){
        await this.page.goto("https://www.automationexercise.com/login")
    }

    async login(email:string , password:string){
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.loginButton.click()

    }

    async getErrorMessage():Promise<string>{
    return await this.page.getByText('Your email or password is incorrect!', { exact: true }).innerText();

    }

}

