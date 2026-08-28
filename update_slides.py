import re

with open('src/main.js', 'r') as f:
    content = f.read()

# The slides we want to insert
new_slides = """
  // Slide 3 - Índice
  {
    id: 3,
    theme: 'theme-good',
    slogan: 'Nossa Jornada',
    html: `
      <div class="editorial-panel" style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
        <span class="cover-badge-sec">Estrutura da Palestra</span>
        <h1 style="font-size: clamp(3rem, 6vw, 5rem); margin: 20px 0 40px 0;">ÍNDICE</h1>
        <div style="display: flex; flex-direction: column; gap: 20px; font-size: 1.5rem; color: var(--color-white);">
          <div style="display: flex; align-items: center; gap: 20px;"><span class="highlight-yellow" style="font-weight: bold; font-family: var(--font-family-title); font-size: 2rem;">01.</span> Abertura & Apresentação</div>
          <div style="display: flex; align-items: center; gap: 20px;"><span class="highlight-yellow" style="font-weight: bold; font-family: var(--font-family-title); font-size: 2rem;">02.</span> O Problema Estrutural</div>
          <div style="display: flex; align-items: center; gap: 20px;"><span class="highlight-yellow" style="font-weight: bold; font-family: var(--font-family-title); font-size: 2rem;">03.</span> A Indústria da Dívida</div>
          <div style="display: flex; align-items: center; gap: 20px;"><span class="highlight-yellow" style="font-weight: bold; font-family: var(--font-family-title); font-size: 2rem;">04.</span> A Metodologia Ex Devedor</div>
          <div style="display: flex; align-items: center; gap: 20px;"><span class="highlight-yellow" style="font-weight: bold; font-family: var(--font-family-title); font-size: 2rem;">05.</span> O Método V.I.D.A</div>
        </div>
      </div>
    `
  },
  // Slide 4 - Quem sou eu
  {
    id: 4,
    theme: 'theme-good',
    slogan: 'Minha História',
    html: `
      <div class="grid-editorial-split editorial-panel" style="padding: 0; background: var(--color-white); overflow: hidden; border-radius: 8px;">
        <div style="background-color: #551122; background-image: url('./assets/quem_sou_eu_placeholder.jpg'); background-size: cover; background-position: center; min-height: 400px; display: flex; align-items: center; justify-content: center; position: relative;">
            <div style="position: absolute; bottom: 20px; left: 20px; color: white; opacity: 0.5; font-size: 0.8rem;">[Adicione sua foto: public/assets/quem_sou_eu.jpg]</div>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; padding: 40px; gap: 30px; background-color: var(--color-white);">
          <h2 style="color: var(--color-dark); font-size: clamp(2.5rem, 5vw, 4rem); text-align: center; margin-bottom: 20px;">Quem sou eu</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="background-color: #e5e7eb; padding: 30px; border-radius: 8px; text-align: center;">
              <h3 style="color: #4b5563; font-size: 1.3rem; margin-bottom: 10px;">Mais de 11<br>empréstimos ativos</h3>
              <p style="color: #6b7280; font-size: 1rem; line-height: 1.5;">Sem controle sobre<br>o próprio dinheiro</p>
            </div>
            
            <div style="background-color: #e5e7eb; padding: 30px; border-radius: 8px; text-align: center;">
              <h3 style="color: #4b5563; font-size: 1.3rem; margin-bottom: 10px;">Salário comprometido</h3>
              <p style="color: #6b7280; font-size: 1rem; line-height: 1.5;">Descontos múltiplos deixavam<br>conta vazia</p>
            </div>
          </div>

          <div style="background-color: #e5e7eb; padding: 30px; border-radius: 8px; text-align: center;">
            <h3 style="color: #4b5563; font-size: 1.3rem; margin-bottom: 10px;">Experiência real</h3>
            <p style="color: #6b7280; font-size: 1rem; line-height: 1.5;">Vivido na pele, não teoria distante</p>
          </div>
        </div>
      </div>
    `
  },
  // Slide 5 - A Ex Devedor
  {
    id: 5,
    theme: 'theme-good',
    slogan: 'Nossa Evolução',
    html: `
      <div class="grid-editorial-split editorial-panel" style="gap: 40px;">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 20px;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <div style="width: 60px; height: 60px; background-color: var(--color-yellow); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">👨🏽‍💻</div>
                <h2 style="font-size: clamp(2rem, 4vw, 3rem);">A Ex Devedor</h2>
            </div>
            <div style="background-image: url('./assets/a_ex_devedor_placeholder.jpg'); background-size: cover; background-position: center; border-radius: 8px; flex-grow: 1; min-height: 300px; background-color: #223344; display: flex; align-items: center; justify-content: center; position: relative;">
                <div style="position: absolute; bottom: 20px; left: 20px; color: white; opacity: 0.5; font-size: 0.8rem;">[Adicione sua foto: public/assets/a_ex_devedor.jpg]</div>
            </div>
        </div>
        
        <div style="display: flex; flex-direction: column; justify-content: space-between; padding: 20px 0; position: relative;">
            <!-- Linha da timeline -->
            <div style="position: absolute; left: 50%; top: 20px; bottom: 20px; width: 2px; background-color: rgba(255,255,255,0.2); transform: translateX(-50%); z-index: 1;"></div>
            
            <div class="timeline-item" style="display: flex; align-items: center; position: relative; z-index: 2;">
                <div style="flex: 1; text-align: right; padding-right: 40px;">
                    <div style="font-weight: bold; font-family: var(--font-family-title); font-size: 1.2rem;">2022</div>
                    <div style="color: var(--color-grey-light); font-size: 0.9rem;">Podcast de áudio</div>
                </div>
                <div style="width: 40px; height: 40px; background-color: #e5e7eb; color: var(--color-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: var(--font-family-title); box-shadow: 0 0 0 5px var(--color-dark);">1</div>
                <div style="flex: 1;"></div>
            </div>
            
            <div class="timeline-item" style="display: flex; align-items: center; position: relative; z-index: 2;">
                <div style="flex: 1;"></div>
                <div style="width: 40px; height: 40px; background-color: #e5e7eb; color: var(--color-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: var(--font-family-title); box-shadow: 0 0 0 5px var(--color-dark);">2</div>
                <div style="flex: 1; padding-left: 40px;">
                    <div style="font-weight: bold; font-family: var(--font-family-title); font-size: 1.2rem;">2023</div>
                    <div style="color: var(--color-grey-light); font-size: 0.9rem;">3º lugar Maratona de Negócios - CCBS</div>
                </div>
            </div>

            <div class="timeline-item" style="display: flex; align-items: center; position: relative; z-index: 2;">
                <div style="flex: 1; text-align: right; padding-right: 40px;">
                    <div style="font-weight: bold; font-family: var(--font-family-title); font-size: 1.2rem;">2023</div>
                    <div style="color: var(--color-grey-light); font-size: 0.9rem;">1º Lugar Hackcity</div>
                </div>
                <div style="width: 40px; height: 40px; background-color: #e5e7eb; color: var(--color-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: var(--font-family-title); box-shadow: 0 0 0 5px var(--color-dark);">3</div>
                <div style="flex: 1;"></div>
            </div>

            <div class="timeline-item" style="display: flex; align-items: center; position: relative; z-index: 2;">
                <div style="flex: 1;"></div>
                <div style="width: 40px; height: 40px; background-color: #e5e7eb; color: var(--color-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: var(--font-family-title); box-shadow: 0 0 0 5px var(--color-dark);">4</div>
                <div style="flex: 1; padding-left: 40px;">
                    <div style="font-weight: bold; font-family: var(--font-family-title); font-size: 1.2rem;">2024</div>
                    <div style="color: var(--color-grey-light); font-size: 0.9rem;">Prêmio Candango de Inovação<br>Reconhecimento Câmara Distral</div>
                </div>
            </div>

            <div class="timeline-item" style="display: flex; align-items: center; position: relative; z-index: 2;">
                <div style="flex: 1; text-align: right; padding-right: 40px;">
                    <div style="font-weight: bold; font-family: var(--font-family-title); font-size: 1.2rem;">2025</div>
                    <div style="color: var(--color-grey-light); font-size: 0.9rem;">1º Lugar Startup Day Sebrae<br>Top 5 ExpoFavela BSB</div>
                </div>
                <div style="width: 40px; height: 40px; background-color: #e5e7eb; color: var(--color-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: var(--font-family-title); box-shadow: 0 0 0 5px var(--color-dark);">5</div>
                <div style="flex: 1;"></div>
            </div>

            <div class="timeline-item" style="display: flex; align-items: center; position: relative; z-index: 2;">
                <div style="flex: 1;"></div>
                <div style="width: 40px; height: 40px; background-color: #e5e7eb; color: var(--color-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: var(--font-family-title); box-shadow: 0 0 0 5px var(--color-dark);">6</div>
                <div style="flex: 1; padding-left: 40px;">
                    <div style="font-weight: bold; font-family: var(--font-family-title); font-size: 1.2rem;">2025</div>
                    <div style="color: var(--color-grey-light); font-size: 0.9rem;">Finalista BBW<br>Top 20 Ex Favela Nacional</div>
                </div>
            </div>
        </div>
      </div>
    `
  },
"""

# Find the end of Slide 2 to insert
match = re.search(r'(\s*id:\s*2,.*?\n\s*},\n)', content, re.DOTALL)
if match:
    insert_pos = match.end()
    # Insert new slides
    content = content[:insert_pos] + new_slides + content[insert_pos:]
    
    # Renumber all slide IDs starting from 1
    # We will find all `id: X,` and replace X sequentially
    
    # Also update comments // Slide X
    
    def slide_replacer(match):
        slide_replacer.counter += 1
        return f"id: {slide_replacer.counter},"
    slide_replacer.counter = 0
    
    content = re.sub(r'id:\s*\d+,', slide_replacer, content)

    # Now let's update centeredSlides
    # Old array: [1, 3, 4, 7, 10, 12, 14, 15, 17, 18, 20, 26, 29]
    # We inserted 3 slides after 2. 
    # New: [1, 3(índice), 6, 7, 10, 13, 15, 17, 18, 20, 21, 23, 29, 32]
    # Wait, indices:
    # 1 -> 1
    # 2 -> 2
    # 3 (new) -> 3
    # 4 (new)
    # 5 (new)
    # 3(old) -> 6
    # 4 -> 7
    # 7 -> 10
    # 10 -> 13
    # 12 -> 15
    # 14 -> 17
    # 15 -> 18
    # 17 -> 20
    # 18 -> 21
    # 20 -> 23
    # 26 -> 29
    # 29 -> 32
    
    new_centered = "[1, 3, 6, 7, 10, 13, 15, 17, 18, 20, 21, 23, 29, 32]"
    content = re.sub(r'const centeredSlides = new Set\(\[.*?\]\);', f'const centeredSlides = new Set({new_centered});', content)

    # Bump version
    content = re.sub(r"const SLIDES_VERSION = '.*?';", "const SLIDES_VERSION = 'v6_add_history_slides';", content)

    with open('src/main.js', 'w') as f:
        f.write(content)
    print("Updated src/main.js")
else:
    print("Could not find Slide 2")
