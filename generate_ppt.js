import puppeteer from 'puppeteer-core';
import pptxgen from 'pptxgenjs';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NUM_SLIDES = 30;
const URL = 'http://localhost:3000';

async function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function run() {
  console.log('Iniciando Puppeteer...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Ensure the slides directory exists
  const slidesDir = path.join(process.cwd(), 'slides_screenshots');
  if (!fs.existsSync(slidesDir)) {
    fs.mkdirSync(slidesDir);
  }

  console.log('Acessando a apresentação...');
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // Oculta a caixa de ajuda de teclado e garante que a UI sumiu
  await page.evaluate(() => {
    const helper = document.getElementById('keyboard-helper');
    if (helper) helper.style.display = 'none';
  });

  // Aguarda animações iniciais
  await delay(1000);

  let slideImages = [];

  for (let i = 1; i <= NUM_SLIDES; i++) {
    console.log(`Tirando screenshot do slide ${i}...`);
    
    // Pequeno delay para garantir transições e estilos aplicados
    await delay(300);
    
    const screenshotPath = path.join(slidesDir, `slide_${i}.jpg`);
    await page.screenshot({ path: screenshotPath, type: 'jpeg', quality: 90 });
    slideImages.push(screenshotPath);

    // Se não for o último, avança
    if (i < NUM_SLIDES) {
      await page.keyboard.press('ArrowRight');
      await delay(500); // Espera a animação de transição
    }
  }

  console.log('Screenshots finalizados. Fechando navegador...');
  await browser.close();

  console.log('Gerando arquivo PowerPoint (.pptx)...');
  let pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';

  for (let i = 0; i < slideImages.length; i++) {
    let slide = pres.addSlide();
    slide.background = { data: fs.readFileSync(slideImages[i]).toString('base64'), ext: 'jpg' };
  }

  const pptxName = 'Apresentacao_Ex_Devedor.pptx';
  await pres.writeFile({ fileName: pptxName });

  console.log(`Sucesso! Arquivo ${pptxName} foi gerado.`);
}

run().catch(console.error);
