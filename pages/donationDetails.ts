import { expect, Locator, Page } from '@playwright/test';

// Assign Elements types in the class

export class DonationDetailsPage {
    readonly page: Page;
    readonly amount10: Locator;
    readonly donationTypeYesMyMoney: Locator;
    readonly motivationInMemory: Locator;
    readonly donationGoesToCancerType: Locator;
    readonly cancerType: Locator;
    readonly continueToDetails: Locator;

    // The constructor special method is listing elements and how to find them(Locator) on the Webpage using 

    constructor(page: Page) {
        this.page = page;
        this.amount10 = page.getByLabel('£10');
        this.donationTypeYesMyMoney = page.getByRole('radiogroup', { name: 'Is this donation your personal money? (required)' }).locator('span').first();
        this.motivationInMemory = page.getByTestId('selectMotivation');
        this.donationGoesToCancerType = page.getByRole('group', { name: 'Where your donation goes' }).locator('span').nth(2);
        this.cancerType = page.getByTestId('restrictionSelect');
        this.continueToDetails = page.getByRole('button', { name: 'Continue' });
    }

    // This is the interactions with the elements ie telling them what to do

    async completeDonationDetails10YesMyMoneyBowelCancer() {
        this.page.waitForLoadState('domcontentloaded');
        // Select donation Amount
        await this.amount10.check();
        await expect(this.amount10).toBeChecked();
        // Select donation type  
        await this.donationTypeYesMyMoney.click();
        // Select your motivation
        await this.motivationInMemory.selectOption('In memory of someone');
        // Select where your donation goes
        await this.donationGoesToCancerType.click();
        // Select Bowel Cancer
        await this.cancerType.selectOption('RES005');
        // Select Continue to next page
        await this.continueToDetails.click();
    }
}