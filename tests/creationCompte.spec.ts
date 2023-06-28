import { test, expect } from '@playwright/test';
import { ajouterAuPanier, btnCreerUnCompte, btnSeConnecter, clickAccepte, connexionForm, goToRaja, inscriptionForm, paymentCard, rajahomepage } from '../helpers/donnes.help';
import * as data from '../datas/donnees.json';

test.beforeEach(async ({page}) => {
    await goToRaja(page);
  });

    test('inscription', async ({ page }) => {

        await btnSeConnecter(page);
        await btnCreerUnCompte(page);
        await inscriptionForm(page);
   
    });


    test('connexion', async ({ page }) => {

        await btnSeConnecter(page);
        await connexionForm(page);
        //await expect(page).toHaveURL('https://www.raja.fr/?displayDropdown=true');//assertion
        
    });

    test('searchMask', async ({ page }) => {
   
        await page.locator('[data-cy="search-open"]').click();
        await page.locator('[data-cy="search-input"]').fill("masques");
        await page.locator('[data-cy="product"]').nth(0).click();
        await page.locator('#btn-quantity-more-MASQ3P2-desktop').click();
        await ajouterAuPanier(page);
        
    });

    test.only('ajouter et valider le panier', async ({page}) => {
       
        await test.step('Rechercher et ajouter un masque au panier',async()=>{
        await page.locator('[data-cy="search-open"]').click();
        await page.locator('[data-cy="search-input"]').fill("masques");
        await page.locator('[data-cy="product"]').nth(0).click();
        await page.locator('#btn-quantity-more-MASQ3P2-desktop').click();
        await ajouterAuPanier(page);
    })
      
       
       await test.step('Voir le panier',async()=>{
            await page.locator('#open-cart-confirmation').click();
            await page.waitForTimeout(300);
        })
        
        
       await test.step('Valider mon panier',async () => {
            await page.locator('#nextBtnStep1').click();
        })
       
        await page.getByRole('button', {name:'Créer un compte', exact:true}).click();

       await test.step('Creer un compte',async () => {
            await inscriptionForm(page);
            await page.waitForTimeout(500);
            //Information pour adresse de facturation
            await page.locator('#CompaniesAddress').fill(data.identifiants.rue);
            await page.locator('#CompaniesPostCode').fill(data.identifiants.cp);
            await page.locator('#CompaniesCity').fill(data.identifiants.ville);
            await page.locator('#CompaniesCountryPost').selectOption('France');
            await page.getByRole('button',{name:'Terminer', exact:true}).click();
    
            //Si l'email existe déjà
            await page.getByRole('button',{name:'Modifier l\'adresse e-mail', exact:true}).click();
            await page.locator('#IdentifiersLogin').fill('tester1@gmail.com');
            await page.getByRole('button',{name:'Suivant', exact:true}).click();
    
            await page.getByRole('button',{name:'Terminer', exact:true}).click();
        })
       
       await test.step("Valider ma livraison", async () => {
            await page.getByRole('button',{name:'Valider ma livraison', exact:true}).click();
        })
        
        
       await test.step("Valider et payer", async () => {
            await page.getByRole('button',{name:'Valider et payer', exact:true}).click();
        })
       
        
       await test.step("Payer par cb visa", async () => {
            await paymentCard(page);
        })
       
       

    })
