const { test, expect } = require('@playwright/test');
import * as data from '../datas/donnees.json';

export async function rajahomepage(page) {
    await page.goto('https://www.raja.fr/');
}

export async function clickAccepte(page) {
    await page.getByRole('button', {name:'Tout accepter', exact:true}).click();

}

export async function btnSeConnecter(page) {
    await page.locator('#dropdown-account').click();
}

export async function btnCreerUnCompte(page) {
    await page.locator('#redirectCreateAccount').click();
}

export async function ajouterAuPanier(page) {
    await page.getByRole('button',{name:'Ajouter au panier', exact:true}).click();
}

export async function inscriptionForm(page) {
    //Remplissage du formulaire d'inscription
     await page.locator('.icon-particular').click();
     await page.locator('#IdentifiersLogin').fill(data.identifiants.email);
     await page.locator('#NewPwdPassword').fill(data.identifiants.password);
     await page.locator('#civilitie').selectOption('Mme');
     await page.locator('#InfoFirstname').fill(data.identifiants.prenom);
     await page.locator('#InfoLastname').fill(data.identifiants.nom);
     await page.locator('#directPhone').fill(data.identifiants.telephone);
     await page.getByRole('button', {name:'Suivant', exact:true}).click();
}

export async function connexionForm(page) {
    //Remplissage du formulaire de connexion
    await page.locator('#UserLoginDropdown').fill(data.identifiants.email);
    await page.locator('#UserPasswordDropdown').fill(data.identifiants.password);
    await page.getByRole('button', {name:'Se connecter', exact:true}).click();
}

export async function goToRaja(page) {
    await rajahomepage(page);
    await clickAccepte(page);   
    
}

export async function paymentCard(page) {
    await page.locator('#payment-cardnumber').fill(data.cbInfo.numCarte);
    await page.locator('#payment-cardholdername').fill(data.cbInfo.titulaire);
    await page.locator('#payment-cardexpirationmonth').selectOption(data.cbInfo.monthExp);
    await page.locator('#payment-cardexpirationyear').selectOption(data.cbInfo.yearExp);
    await page.locator('#payment-cvc').fill(data.cbInfo.codeVerif);
}