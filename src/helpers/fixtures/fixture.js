import { test as base } from '@playwright/test';
import { App } from '../../pages/index';
import { UserBuilder } from '../builders/index';
import { ArticleBuilder } from '../builders/index';

export const test = base.extend ({
    webApp: async ({ page }, use) => {
        let app = new App(page);
        await app.mainPage.open();
        await use(app);
    },
    loginPage: async ({ page }, use) => {
        let app = new App(page);
        await app.mainPage.open();
        await app.loginPage.gotoLogin();
        await use(app);
    },
    regPageWithUser: async ({ page }, use) => {
        const randomUser = new UserBuilder()
            .addEmail()
            .addPassword(14)
            .addUsername()
            .generate();
        let app = new App(page);
        await app.mainPage.open();
        await app.mainPage.gotoSignUp();
        await app.registerPage.signup(randomUser);
        await use({ app, randomUser }); 
    },
    loginWithUser: async ({ page }, use) => {
        const registeredUser = {
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
            username: process.env.USERNAME,
        };
        const incorrectUser = {
            email: process.env.EMAIL,
            password: process.env.PASSWORD + "1", 
        };
        let app =  new App(page);
        await app.mainPage.open();
        await app.loginPage.gotoLogin();
        await use({ app, registeredUser, incorrectUser }); 
    },
    errorWhenLogin: async ({ page }, use) => {
        const registeredUser = {
            email: process.env.EMAIL,
            password: process.env.PASSWORD + 1,
        };
        let app =  new App(page);
        await app.mainPage.open();
        await app.loginPage.gotoLogin();
        await use({ app, registeredUser });         
    },
    updateSettings: async ({ page }, use) => {
        const registeredUser = {
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        };
        const originalProfile = {
            username: process.env.USERNAME,
            bio: '', 
            password: process.env.PASSWORD
        };
        let app =  new App(page);
        await app.mainPage.open();
        await app.loginPage.gotoLogin();
        await app.loginPage.login(registeredUser);
        await app.settingsPage.gotoUserImageSheet();
        await app.settingsPage.gotoSettings();
        await app.settingsPage.updateFields();
        await use({ app, registeredUser });  
        //Revert changes 
        await app.settingsPage.revertChanges(originalProfile);
    },
    createArticle: async ({ page }, use) => {
        const registeredUser = {
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        };
        const article = new ArticleBuilder()
            .addBody()
            .addDescription()
            .addTag()
            .addTitle()
            .generate();
        let app =  new App(page);
        await app.mainPage.open();
        await app.loginPage.gotoLogin();
        await app.loginPage.login(registeredUser);
        await app.articleCreationPage.gotoArticleCreationPage();
        await app.articleCreationPage.articleCreation(article);
        await use({ app, registeredUser, article });  
    },
    markArticleAsFavourite: async ({ page }, use) => {
        const registeredUser = {
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        };
        let app = new App(page);
        await app.mainPage.open();
        await app.loginPage.gotoLogin();
        await app.loginPage.login(registeredUser);
        await app.homePage.gotoGlobalFeedTab();
        const likedTitle = await app.homePage.likeFirstUnlikedArticle();
        try {
            await use({ app, likedTitle });
        } finally {
            await app.homePage.removeArticleFromFavourites(likedTitle);
        }
    },
    addArticleComment: async ({ page }, use) => {
        const registeredUser = {
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        };
        let app = new App(page);
        await app.mainPage.open();
        await app.loginPage.gotoLogin();
        await app.loginPage.login(registeredUser);
        await app.homePage.gotoGlobalFeedTab();
        const title = await app.homePage.likeFirstUnlikedArticle();
        const comment = await app.articleReviewPage.addArticleComment('Nice article!', title);
        try {
        await use({ app, comment });
        } finally {
            await app.homePage.removeArticleFromFavourites(title);
        }
    },
    });