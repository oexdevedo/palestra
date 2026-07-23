import fs from 'fs';

const mainContent = fs.readFileSync('./src/main.js', 'utf8');
const match = mainContent.match(/const defaultSlidesData = (\[[\s\S]*?\]);\n\nlet slidesData =/);

if (match) {
  let arrayString = match[1];
  // Convert HTML backticks to strings for eval, though eval natively handles backticks
  let data;
  try {
    data = eval(arrayString);
  } catch (e) {
    console.error("Erro ao fazer eval:", e);
    process.exit(1);
  }

  let markdown = '# Textos da Apresentação - Ex Devedor\n\n';
  markdown += '> *Nota: Esses são os textos originais configurados no código. Se você alterou algo no Admin pelo navegador, essas edições ficaram salvas apenas lá.*\n\n---\n\n';

  data.forEach(slide => {
    markdown += `## Slide ${slide.id}\n`;
    if (slide.slogan) markdown += `**Slogan:** ${slide.slogan}\n\n`;
    
    // Strip HTML
    let text = slide.html
      .replace(/<br\s*\/?>/gi, '\n') // Replace <br> with newlines
      .replace(/<\/div>/gi, '\n') // Replace </div> with newline
      .replace(/<\/p>/gi, '\n\n') // Replace </p> with double newline
      .replace(/<[^>]+>/g, '') // Strip remaining HTML tags
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+\n/g, '\n') // remove trailing spaces before newline
      .replace(/\n\s+/g, '\n') // remove leading spaces after newline
      .replace(/\n{3,}/g, '\n\n') // maximum double newlines
      .trim();
    
    if (text) markdown += `${text}\n\n`;
    markdown += `---\n\n`;
  });

  fs.writeFileSync('Textos_Apresentacao.md', markdown);
  console.log('Documento criado com sucesso!');
} else {
  console.error("Não foi possível encontrar o array defaultSlidesData");
}
