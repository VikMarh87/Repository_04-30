export class LoginPage {
    constructor (page) {
        this.page = page;
        this.loginNavButton = page.getByRole('link', { name: 'Login' }); //navigation button
        this.loginSubmitButton = page.getByRole('button', { name: 'Login' }); //submition button
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.errorText = page.getByText('Wrong email/password')
    }
    async gotoLogin () {
        await this.loginNavButton.click();
    }
    async login (registeredUser = {}) {
        const { email = process.env.EMAIL, password = process.env.PASSWORD } = registeredUser;
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password);   
        await this.loginSubmitButton.click();
        }

    async incorrectLogin (registeredUser = {}) {
        const { email = process.env.EMAIL, password = process.env.PASSWORD + 1} = registeredUser;
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password);   
        await this.loginSubmitButton.click();
        } 
}

