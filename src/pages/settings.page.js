export class SettingsPage {
    constructor (page) {
        this.page = page;
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' }); //submition button
        this.userImageButton = page.getByRole('img', { name: 'Victoria_M' });
        this.settingsLink = page.getByRole('link', { name: 'Settings' });
        this.bioField = page.getByRole('textbox', { name: 'Short bio about you' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.usernameField = page.getByRole('textbox', { name: 'Your Name' });
        this.updatedUsernameText = page.getByText('TestUser123')
    }
    async gotoUserImageSheet () {
        await this.userImageButton.click();
    }
    async gotoSettings () {
        await this.settingsLink.click();
    }
    async updateFields (registeredUser = {}) {
        await this.usernameField.click();
        await this.usernameField.fill('TestUser123');
        await this.bioField.click();
        await this.bioField.fill('new bio');
        await this.passwordField.click();
        await this.passwordField.fill('Asd123qwe!!!');
        await this.updateSettingsButton.click(); 
    }
    async revertChanges (originalProfile) {
        const { username, bio, password } = originalProfile;
        await this.usernameField.click();
        await this.usernameField.fill(username);
        await this.bioField.click();
        await this.bioField.fill(bio);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.updateSettingsButton.click();
}


}
