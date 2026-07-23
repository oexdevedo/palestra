import confetti from 'canvas-confetti';
import QRCode from 'qrcode';

// ==========================================================================
// CONFIGURAÇÃO DOS 30 SLIDES DA PALESTRA 
// ==========================================================================
const defaultSlidesData = [
  // Slide 1
  {
    id: 1,
    theme: 'theme-good',
    slogan: 'Vencendo as Dívidas',
    html: `
    <div class="editorial-panel" style="padding: 0; background-color: #000000; width: 100%; height: 100%; border-radius: 8px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5); cursor: pointer; overflow: hidden; display: flex; align-items: center; justify-content: center;" onclick="document.getElementById('next-btn').click(); event.stopPropagation()">
      <video autoplay loop muted playsinline poster="./assets/capa_vencendo_dividas.png" style="width: 100%; height: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">
        <source src="./assets/abertura.mp4" type="video/mp4">
        Seu navegador não suporta vídeos HTML5.
      </video>
    </div>
    `
  },
  // Slide 2
  {
    id: 2,
    theme: 'theme-good',
    slogan: 'palestra.exdevedor.com',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 30px;">
          <div>
            <span class="cover-badge-sec">Slides no seu celular</span>
            <h2 style="margin-top: 10px;">ACOMPANHE A APRESENTAÇÃO</h2>
          </div>
          <p style="font-size: 1.2rem; color: var(--color-grey-text); line-height: 1.7;">
            Escaneie o código ao lado para seguir a palestra do seu próprio dispositivo, salvar os diagramas e levar o método para casa.
          </p>
          <div style="font-size: 2.2rem; font-weight: 700; font-family: var(--font-family-title);" class="highlight-yellow">
            palestra.exdevedor.com
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgba(255,255,255,0.01); border-radius: 4px; border: 1px dashed var(--color-grey-medium); padding: 40px; gap: 20px;">
          <div class="qr-container-edit">
            <canvas id="qr-canvas"></canvas>
          </div>
          <div style="font-family: var(--font-family-title); font-weight: 700; font-size: 1.25rem; color: var(--color-white); letter-spacing: 3px;">
            SCAN & NAVIGATE
          </div>
        </div>
      </div>
    `
  },

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
        <div style="background-color: #551122; background-image: url('./assets/quem_sou_eu.png'); background-size: cover; background-position: center; min-height: 400px; display: flex; align-items: center; justify-content: center; position: relative;">
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
                <div style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden;"><img src="./assets/logo.png" style="width: 100%; height: 100%; object-fit: cover;"></div>
                <h2 style="font-size: clamp(2rem, 4vw, 3rem);">A Ex Devedor</h2>
            </div>
            <div style="background-image: url('./assets/a_ex_devedor.jpg'); background-size: cover; background-position: center; border-radius: 8px; flex-grow: 1; min-height: 300px; background-color: #223344; display: flex; align-items: center; justify-content: center; position: relative;">
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
  // Slide 3
  {
    id: 6,
    theme: 'theme-bad',
    slogan: 'Um problema nacional estrutural',
    html: `
      <div class="editorial-panel" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 15px;">
        <div style="font-size: clamp(8rem, 12vw, 12rem); font-weight: 700; font-family: var(--font-family-title); line-height: 1.0; color: var(--color-crimson-red);">
          70%
        </div>
        <h3 style="color: var(--color-white); letter-spacing: -0.5px; line-height: 1.1; font-size: clamp(2rem, 3.5vw, 3.5rem); max-width: 800px;">
          DAS FAMÍLIAS BRASILEIRAS <br> ESTÃO ENDIVIDADAS </br>
        </h3>
      </div>
    `
  },
  // Slide 4
  {
    id: 7,
    theme: 'theme-bad',
    slogan: 'A ilusão da facilidade',
    html: `
      <div class="editorial-panel" style="gap: 30px; justify-content: center; padding-left: 8%;">
        <div>
          <span class="cover-badge-sec highlight-red">Fato Incontestável</span>
          <h1 class="highlight-red" style="font-size: clamp(3rem, 7.5vw, 6.5rem); margin-top: 10px;">SAIR DAS DÍVIDAS.<h1>
          <h1 class="highlight-red" style="font-size: clamp(3rem, 7.5vw, 6.5rem); margin-top: 10px;">NÃO É FÁCIL.<h1>

        </div>
        <p style="font-size: 1.35rem; max-width: 880px; color: var(--color-white); line-height: 1.7;">
          Se fosse simples, bastaria assistir a um vídeo rápido no YouTube ou copiar um post de carrossel no Instagram para resolver sua vida.
        </p>
        <p style="font-size: 1.15rem; color: var(--color-grey-light); max-width: 750px; line-height: 1.7;">
          O caminho exige reestruturação do seu comportamento, do seu estilo de consumo e o fim da anestesia emocional das compras por impulso.
        </p>
      </div>
    `
  },
  // Slide 5
  {
    id: 8,
    theme: 'theme-good',
    slogan: 'Didática, simplicidade e prática',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 30px;">
          <div>
            <span class="cover-badge-sec">A Proposta Ex Devedor</span>
            <h2 style="margin-top: 10px;">O CAMINHO REAL</h2>
            <h2 style="margin-top: 10px;">E PRÁTICO</h2>

          </div>
        
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 20px; border-left: 1px solid var(--color-grey-medium); padding-left: 45px;">
          <h3 class="highlight-white" style="margin-bottom: 5px;">O QUE NÃO FAREMOS AQUI:</h3>
          <p style="font-size: 1.1rem; color: var(--color-grey-text); margin-bottom: 0;">- Fórmulas de enriquecimento impossíveis</p>
          <p style="font-size: 1.1rem; color: var(--color-grey-text); margin-bottom: 0;">- Termos técnicos complexos de economistas</p>
          <p style="font-size: 1.1rem; color: var(--color-grey-text); margin-bottom: 0;">- Planilhas infinitas de centavos que você abandona em 3 dias</p>
        </div>
      </div>
    `
  },
  // Slide 6
  {
    id: 9,
    theme: 'theme-good',
    slogan: 'O único pilar indispensável',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 25px;">
          <span class="cover-badge-sec">O único pilar</span>
          <h1 class="highlight-yellow" style="margin: 0; font-size: clamp(3rem, 6vw, 5.5rem);">DISCIPLINA</h1>
          <p style="font-size: 1.3rem; color: var(--color-white); line-height: 1.7;">
            Fazer o que precisa ser feito, na hora certa, do jeito que tem que ser feito. Principalmente nos dias em que você não tem a menor vontade de fazer.
          </p>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <img src="/assets/slide_discipline.png" alt="Disciplina e foco" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1);" />
        </div>
      </div>
    `
  },
  // Slide 7
  {
    id: 10,
    theme: 'theme-bad',
    slogan: 'Sem desculpas',
    html: `
      <div class="editorial-panel" style="gap: 30px; padding-left: 8%;">
        <span class="cover-badge-sec highlight-red">A dura realidade</span>
        <h1 class="highlight-red" style="font-size: clamp(3rem, 7vw, 6rem); margin: 0;">SEM DISCIPLINA VOCÊ NÃO CHEGA EM LUGAR NENHUM</h1>
        <p style="font-size: 1.4rem; color: var(--color-white); max-width: 850px; line-height: 1.7;">
          E isso inclui sair das dívidas. Nenhuma palestra, mentoria ou livro vai te salvar se a sua preguiça for maior do que a sua vontade de se tornar livre.
        </p>
      </div>
    `
  },
  // Slide 8
  {
    id: 11,
    theme: 'theme-good',
    slogan: 'Preparando a sua mente para a vitória',
    html: `
      <div class="editorial-panel timeline-dashed-container" style="padding: 60px; gap: 40px;">
        <div>
          <h2>A JORNADA EX DEVEDOR</h2>
          <p style="color: var(--color-grey-text); font-size: 1.15rem; margin-top: 10px; margin-bottom: 0;">
            Invertemos o método comum para primeiro alinhar as suas motivações psicológicas antes de olhar os boletos:
          </p>
        </div>
        <div class="timeline-dashed-line">
          <div class="timeline-dashed-node active">
            <div class="timeline-dashed-circle">1</div>
            <div class="step-label highlight-yellow" style="font-family: var(--font-family-title); font-weight: 700;">FUTURO</div>
            <span style="font-size: 0.85rem; color: var(--color-grey-light);">Desenhar o Alvo</span>
          </div>
          <div class="timeline-dashed-node">
            <div class="timeline-dashed-circle">2</div>
            <div class="step-label" style="font-family: var(--font-family-title); font-weight: 700;">PRESENTE</div>
            <span style="font-size: 0.85rem; color: var(--color-grey-light);">O Valor do Tempo</span>
          </div>
          <div class="timeline-dashed-node">
            <div class="timeline-dashed-circle">3</div>
            <div class="step-label" style="font-family: var(--font-family-title); font-weight: 700;">PASSADO</div>
            <span style="font-size: 0.85rem; color: var(--color-grey-light);">As Raízes Mentais</span>
          </div>
          <div class="timeline-dashed-node">
            <div class="timeline-dashed-circle">4</div>
            <div class="step-label" style="font-family: var(--font-family-title); font-weight: 700;">REVOLUÇÃO</div>
            <span style="font-size: 0.85rem; color: var(--color-grey-light);">O Método Prático</span>
          </div>
        </div>
        <div style="text-align: center;">
          <h3 class="highlight-orange" style="margin: 0;">Pera aí... O Futuro vem primeiro?</h3>
        </div>
      </div>
    `
  },
  // Slide 9
  {
    id: 12,
    theme: 'theme-good',
    slogan: 'O foco da sua motivação',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 20px;">
          <div>
            <span class="cover-badge-sec">A Mira</span>
            <h2 style="margin-top: 10px;">FUTURO: O SEU ALVO</h2>
          </div>
          <h3>Qual o seu maior sonho hoje?</h3>
          <p style="color: var(--color-grey-text); line-height: 1.6; font-size: 1.1rem; margin: 0;">
            Organização financeira serve para dar sustentação a sonhos reais e concretos:
          </p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div class="editorial-card" style="padding: 16px;"><span class="highlight-yellow" style="font-weight:700;">Moradia</span> Conquistar ou reformar sua casa.</div>
            <div class="editorial-card" style="padding: 16px;"><span class="highlight-yellow" style="font-weight:700;">Viagem</span> Conhecer o mundo com quem ama.</div>
            <div class="editorial-card" style="padding: 16px;"><span class="highlight-yellow" style="font-weight:700;">Liberdade</span> Dormir em paz sem dever a ninguém.</div>
          </div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <img src="/assets/slide_target_dreams.png" alt="O Alvo do Futuro" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1);" />
        </div>
      </div>
    `
  },
  // Slide 10
  {
    id: 13,
    theme: 'theme-good',
    slogan: 'Dinheiro trabalha para você, não o contrário',
    html: `
      <div class="editorial-panel" style="gap: 30px; text-align: left; justify-content: center; padding-left: 8%;">
        <span class="cover-badge-sec">Ferramenta de Ação</span>
        <h1 class="highlight-yellow" style="font-size: clamp(3rem, 7vw, 6rem); margin: 0;">O DINHEIRO É UMA FERRAMENTA DE CONSTRUÇÃO</h1>
        <p style="font-size: 1.35rem; max-width: 850px; color: var(--color-white); line-height: 1.7; margin: 0;">
          Ele serve para pavimentar a estrada dos seus sonhos.
        </p>
      </div>
    `
  },
  // Slide 11
  {
    id: 14,
    theme: 'theme-bad',
    slogan: 'Autodiagnóstico realista',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 30px;">
          <div>
            <span class="cover-badge-sec highlight-red">Fase 2: Presente</span>
            <h2 class="highlight-red" style="margin-top: 10px;">PRESENTE: A REALIDADE</h2>
          </div>
          <p style="font-size: 1.25rem; color: var(--color-grey-text); line-height: 1.7;">
            O que você tem feito hoje para se aproximar do futuro que desenhou no slide anterior?
          </p>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 20px; border-left: 1px solid rgba(255, 255, 255, 0.05); padding-left: 45px;">
          <h3 style="margin-bottom: 5px;">Os sintomas clássicos:</h3>
          <p style="margin-bottom: 0;">• O dinheiro some da conta nos primeiros 10 dias.</p>
          <p style="margin-bottom: 0;">• Você não sabe exatamente para onde foram os seus gastos.</p>
          <p style="margin-bottom: 0;">• O limite do cartão é visto como renda extra do mês.</p>
        </div>
      </div>
    `
  },
  // Slide 12
  {
    id: 15,
    theme: 'theme-good',
    slogan: 'Fugindo do senso comum',
    html: `
      <div class="editorial-panel word-impact-panel" style="padding-left: 10%; gap: 25px;">
        <span class="cover-badge-sec">A Grande Pergunta</span>
        <h1 class="highlight-orange" style="font-size: clamp(3.5rem, 8vw, 7.5rem); margin: 0;">O QUE É DINHEIRO <br>PARA VOCÊ?</br></h1>
        
      </div>
    `
  },
  // Slide 13
  {
    id: 16,
    theme: 'theme-bad',
    slogan: 'A moeda mais preciosa da sua vida',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 25px;">
          <div>
            <span class="cover-badge-sec highlight-red">Metáfora do Tempo</span>
            <h2 class="highlight-red" style="margin-top: 15px;">DINHEIRO É O SEU TEMPO</h2>
          </div>
          <h3>Tempo que você vende quando trabalha.</h3>
          <div style="background-color: rgba(230,26,41,0.05); border-radius: 6px; border: 1px solid rgba(230,26,41,0.2); padding: 25px; gap: 15px; display: flex; flex-direction: column;">
            <div style="font-family: var(--font-family-title); font-size: 1.8rem; font-weight: 700; letter-spacing: 2px;" class="highlight-red">LIMITADO & DEFINITIVO</div>
            <p style="font-size: 1.1rem; color: var(--color-white); line-height: 1.6; margin: 0;">Gastar mal o seu dinheiro é desperdiçar o tempo de vida que você vendeu para ganhá-lo.</p>
          </div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <img src="/assets/slide_hourglass.png" alt="Ampulheta - Metáfora do Tempo" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.7); border: 1px solid rgba(255,215,0,0.2);" />
        </div>
      </div>
    `
  },
  // Slide 14
  {
    id: 17,
    theme: 'theme-good',
    slogan: 'Valorize a sua hora',
    html: `
      <div class="editorial-panel" style="gap: 30px; padding-left: 8%;">
        <span class="cover-badge-sec">A Alquimia da Hora</span>
        <h1 class="highlight-yellow" style="font-size: clamp(3rem, 7vw, 6rem); margin: 0;">ENCAREÇA O SEU TEMPO</h1>
        <h3>Tempo que você valoriza quando estuda e se especializa.</h3>
        <p style="font-size: 1.35rem; max-width: 800px; color: var(--color-white); line-height: 1.7; margin: 0;">
          Especializar-se, ler, praticar e adquirir conhecimento não serve para acumular certificados. Serve para tornar a sua hora de vida mais valiosa. Assim, você precisa vender menos horas do seu dia para manter o seu estilo de vida.
        </p>
      </div>
    `
  },
  // Slide 15
  {
    id: 18,
    theme: 'theme-good',
    slogan: 'Uma lição de dignidade e história',
    html: `
      <div class="editorial-panel" style="text-align: left; justify-content: center; padding-left: 10%; gap: 20px;">
        <span class="cover-badge-sec">A Equação de Respeito Próprio</span>
        <blockquote style="font-family: var(--font-family-title); font-size: clamp(2.5rem, 6.5vw, 5.5rem); font-weight: 700; line-height: 1.1; color: var(--color-white); max-width: 950px; margin: 0;">
          "SE NÃO RESPEITO MEU TEMPO, NÃO RESPEITO MEU DINHEIRO E NEM A HISTÓRIA QUE CONSTRUÍ."
        </blockquote>
        <p style="font-size: 1.3rem; color: var(--color-grey-light); margin: 0;">Respeitar o seu dinheiro é o primeiro passo da sua emancipação comportamental.</p>
      </div>
    `
  },
  // Slide 16
  {
    id: 19,
    theme: 'theme-bad',
    slogan: 'O veneno parcelado',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 30px;">
          <div>
            <span class="cover-badge-sec highlight-red">A Falsa Liberdade</span>
            <h2 class="highlight-red" style="margin-top: 10px;">A DEPENDÊNCIA </h2>
            <h2 class="highlight-red" style="margin-top: 10px;">DO CARTÃO</h2>

          </div>
          <h3>O cartão de crédito NÃO é extensão do seu salário.</h3>
          <p style="font-size: 1.2rem; color: var(--color-grey-text); line-height: 1.7;">
            Ele cria a ilusão de poder de compra imediato, mas na verdade está comprando o seu trabalho de amanhã. Ao parcelar suas contas, você hipoteca o seu futuro.
          </p>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 20px; border-left: 1px solid rgba(255,255,255,0.05); padding-left: 45px;">
          <h3 class="highlight-red" style="margin-bottom: 5px;">O perigo silencioso:</h3>
          <p style="margin-bottom: 0;">• Juros que superam 300% ao ano</p>
          <p style="margin-bottom: 0;">• O vício de empurrar o pagamento mínimo</p>
          <p style="margin-bottom: 0;">• Sensação perpétua de trabalhar apenas para pagar o passado</p>
        </div>
      </div>
    `
  },
  // Slide 17
  {
    id: 20,
    theme: 'theme-good',
    slogan: 'Escavando os alicerces',
    html: `
      <div class="editorial-panel" style="gap: 30px; padding-left: 8%;">
        <span class="cover-badge-sec">Fase 3: Passado</span>
        <h2>PASSADO: O BERÇO DOS HÁBITOS</h2>
        <h3>Como sua família lidava com dinheiro quando você era criança?</h3>
        <p style="font-size: 1.35rem; max-width: 850px; color: var(--color-grey-text); line-height: 1.7; margin: 0;">
          Nós herdamos os modelos comportamentais de quem nos criou. A forma como você lida com cartão de crédito, dívidas e reservas hoje é uma cópia (ou rebeldia extrema) do comportamento financeiro dos seus pais.
        </p>
      </div>
    `
  },
  // Slide 18
  {
    id: 21,
    theme: 'theme-bad',
    slogan: 'As barreiras herdadas',
    html: `
      <div class="editorial-panel" style="gap: 30px; padding-left: 8%;">
        <div>
          <span class="cover-badge-sec highlight-red">Traumas e Frases Prontas</span>
          <h1 class="highlight-red" style="font-size: clamp(3rem, 8vw, 6.5rem); margin: 0;">CRENÇAS LIMITANTES</h1>
        </div>
        <p style="font-size: 1.35rem; color: var(--color-white); line-height: 1.7; max-width: 850px; margin: 0;">
          "Dinheiro é difícil", "O dinheiro corrompe", "Nossa família nasceu para pagar conta". Ouvir os adultos reclamando do dinheiro na infância cria o bloqueio mental de escassez no presente.
        </p>
        <p style="font-size: 1.15rem; color: var(--color-grey-light); font-style: italic; margin: 0;">
          Para libertar o seu presente, precisamos desarmar essa programação passada.
        </p>
      </div>
    `
  },
  // Slide 19
  {
    id: 22,
    theme: 'theme-good',
    slogan: 'A decisão consistente',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 25px;">
          <span class="cover-badge-sec">A Decisão Consistente</span>
          <h1 class="highlight-yellow" style="font-size: clamp(2.5rem, 5vw, 4.5rem); margin: 0;">PARA QUEBRAR O CICLO</h1>
          <h3 style="color: var(--color-white); line-height: 1.4; margin: 0; font-size: 1.35rem;">
            A história de desorganização, boletos atrasados e escassez familiar termina na sua geração. A partir de hoje, você escreve o seu próprio caminho.
          </h3>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <img src="/assets/slide_breaking_chains.png" alt="Quebrando o Ciclo" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.7); border: 1px solid rgba(255,215,0,0.2);" />
        </div>
      </div>
    `
  },
  // Slide 20
  {
    id: 23,
    theme: 'theme-good',
    slogan: 'A nova programação do comportamento',
    html: `
      <div class="editorial-panel word-impact-panel" style="padding-left: 10%; gap: 25px;">
        <span class="cover-badge-sec">Fase 4: Revolução</span>
        <h1 class="highlight-yellow" style="font-size: clamp(3.5rem, 8.5vw, 8rem); margin: 0;">MENTE QUE VENCE OS BOLETOS</h1>
        <p style="font-size: 1.35rem; max-width: 750px; color: var(--color-grey-text); line-height: 1.7; margin: 0;">
          Parar de pensar como sobrevivente do dia a dia e se tornar o gestor soberano do seu próprio tempo.
        </p>
      </div>
    `
  },
  // Slide 21
  {
    id: 24,
    theme: 'theme-bad',
    slogan: 'Identificando o inimigo mental',
    html: `
      <div class="editorial-panel" style="gap: 30px; padding: 60px;">
        <div>
          <span class="cover-badge-sec highlight-red">Comparativo Crítico</span>
          <h2>MENTALIDADE DE DEVEDOR</h2>
          <p style="color: var(--color-grey-text); margin-top: 5px; margin-bottom: 0;">As características que drenam as suas forças financeiras:</p>
        </div>
        <div class="grid-3col">
          <div class="editorial-card theme-bad" style="padding: 30px; gap: 15px;">
            <h3 style="margin-bottom: 5px;">Trabalha para pagar conta</h3>
            <p style="font-size: 0.95rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Seu único objetivo do mês é zerar a fatura atual.</p>
          </div>
          <div class="editorial-card theme-bad" style="padding: 30px; gap: 15px;">
            <h3 style="margin-bottom: 5px;">Sempre apaga incêndios</h3>
            <p style="font-size: 0.95rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Sem reservas. Qualquer imprevisto vira uma crise fatal.</p>
          </div>
          <div class="editorial-card theme-bad" style="padding: 30px; gap: 15px;">
            <h3 style="margin-bottom: 5px;">Mata um leão por dia</h3>
            <p style="font-size: 0.95rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Sem planos para 5 anos. Foco apenas nas próximas 24 horas.</p>
          </div>
        </div>
      </div>
    `
  },
  // Slide 22
  {
    id: 25,
    theme: 'theme-good',
    slogan: 'Clique nos cards para virar e aprender',
    html: `
      <div class="editorial-panel" style="gap: 25px; padding: 60px;">
        <div>
          <span class="cover-badge-sec">A Sangria Oculta</span>
          <h2>PERCEBA O FLUXO DO DINHEIRO</h2>
          <p style="color: var(--color-grey-text); margin-top: 5px; margin-bottom: 0;">Para onde seu tempo de vida está escorrendo sem você ver?</p>
        </div>
        <div class="flip-grid">
          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front" style="padding: 30px; gap: 15px;">
                <h3>Gastos por Impulso</h3>
                <small style="color: var(--color-orange)">Revelar ➔</small>
              </div>
              <div class="flip-card-back" style="padding: 30px; gap: 15px;">
                <strong>Anestesia Emocional</strong>
                <p style="font-size: 0.9rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Usar o consumo para aliviar frustrações ou tédio diários. Prazer dura 5 minutos; a dívida, 5 meses.</p>
              </div>
            </div>
          </div>
          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front" style="padding: 30px; gap: 15px;">
                <h3>Piloto Automático</h3>
                <small style="color: var(--color-orange)">Revelar ➔</small>
              </div>
              <div class="flip-card-back" style="padding: 30px; gap: 15px;">
                <strong>Gastos Invisíveis</strong>
                <p style="font-size: 0.9rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Assinaturas esquecidas, planos desatualizados que poderiam ser renegociados se houvesse interesse.</p>
              </div>
            </div>
          </div>
          <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
              <div class="flip-card-front" style="padding: 30px; gap: 15px;">
                <h3>Pequenos excessos</h3>
                <small style="color: var(--color-orange)">Revelar ➔</small>
              </div>
              <div class="flip-card-back" style="padding: 30px; gap: 15px;">
                <strong>Tarifas & Lanches</strong>
                <p style="font-size: 0.9rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Taxas de banco supérfluas, fretes excessivos e pequenos mimos diários que evaporam seu caixa.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // Slide 23
  {
    id: 26,
    theme: 'theme-good',
    slogan: 'A ordem da estabilização',
    html: `
      <div class="editorial-panel" style="gap: 30px; padding: 60px;">
        <div>
          <span class="cover-badge-sec">A Sobra Intencional</span>
          <h2>ORGANIZE</h2>
        </div>
        <div class="grid-3col">
          <div class="editorial-card" style="padding: 30px;">
            <div class="card-num" style="margin-bottom: 10px;">01</div>
            <h3>Mapeie Fixos</h3>
            <p style="font-size: 0.95rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Descubra o custo essencial para sua sobrevivência com dignidade.</p>
          </div>
          <div class="editorial-card" style="padding: 30px;">
            <div class="card-num" style="margin-bottom: 10px;">02</div>
            <h3>Corte o Excesso</h3>
            <p style="font-size: 0.95rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Elimine o supérfluo que não aproxima você dos seus grandes sonhos.</p>
          </div>
          <div class="editorial-card" style="padding: 30px;">
            <div class="card-num" style="margin-bottom: 10px;">03</div>
            <h3>Ajuste Geral</h3>
            <p style="font-size: 0.95rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Substitua marcas caras no mercado e mude para tarifas bancárias gratuitas.</p>
          </div>
        </div>
      </div>
    `
  },
  // Slide 24
  {
    id: 27,
    theme: 'theme-good',
    slogan: 'Limites geram liberdade real',
    html: `
      <div class="editorial-panel" style="gap: 30px; padding: 60px;">
        <div>
          <span class="cover-badge-sec">Divisão dos Recursos</span>
          <h2>CRIE LIMITES PARA O SEU DINHEIRO</h2>
          <p style="color: var(--color-grey-text); margin-top: 5px; margin-bottom: 0;">Os trilhos da metodologia comportamental Ex Devedor:</p>
        </div>
        <div class="budget-straight-container">
          <div class="budget-block-editorial" style="padding: 24px 30px;">
            <div>
              <span class="budget-percent-edit highlight-yellow">60%</span>
              <h3>PRESENTE</h3>
              <p style="font-size: 0.85rem; color: var(--color-grey-light); margin-bottom: 12px;">Manutenção do Custo de Vida</p>
            </div>
            <div class="budget-fill-flat">
              <div class="budget-fill-bar" style="width: 60%"></div>
            </div>
          </div>
          <div class="budget-block-editorial bad" style="padding: 24px 30px;">
            <div>
              <span class="budget-percent-edit highlight-red">30%</span>
              <h3>PASSADO</h3>
              <p style="font-size: 0.85rem; color: var(--color-grey-light); margin-bottom: 12px;">Quitação de Dívidas e Acordos</p>
            </div>
            <div class="budget-fill-flat">
              <div class="budget-fill-bar" style="width: 30%"></div>
            </div>
          </div>
          <div class="budget-block-editorial neutral" style="padding: 24px 30px;">
            <div>
              <span class="budget-percent-edit highlight-orange">10%</span>
              <h3>FUTURO</h3>
              <p style="font-size: 0.85rem; color: var(--color-grey-light); margin-bottom: 12px;">Reserva e Sonhos Maiores</p>
            </div>
            <div class="budget-fill-flat">
              <div class="budget-fill-bar" style="width: 10%"></div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // Slide 25
  {
    id: 28,
    theme: 'theme-good',
    slogan: 'Comer, morar, vestir e desfrutar',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 25px;">
          <div>
            <span class="cover-badge-sec">Gaveta 01</span>
            <h2>60% PRESENTE: CUSTO DE VIDA</h2>
          </div>
          <p style="font-size: 1.2rem; color: var(--color-grey-text); line-height: 1.7; margin-bottom: 10px;">
            A fatia para manter as luzes acesas, a mesa cheia, o transporte pago e o lazer controlado:
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
            <li>- Alimentação, Moradia e Contas Fixas</li>
            <li>- Saúde Básica e Medicamentos</li>
            <li>- Lazer planejado sem extrapolar o teto do caixa</li>
          </ul>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 20px; border-left: 1px solid var(--color-grey-medium); padding-left: 45px;">
          <h3>Os Baldes Sazonais</h3>
          <p style="font-size: 1.05rem; color: var(--color-grey-text); line-height: 1.7; margin: 0;">
            IPVA, IPTU, impostos e seguros que ocorrem de tempos em tempos. Se você não separar uma fatia mensal para eles, o seu presente será esmagado a cada virada de ano.
          </p>
        </div>
      </div>
    `
  },
  // Slide 26
  {
    id: 29,
    theme: 'theme-bad',
    slogan: 'O custo das escolhas antigas',
    html: `
      <div class="editorial-panel" style="gap: 30px; padding-left: 8%;">
        <div>
          <span class="cover-badge-sec highlight-red">Gaveta 02</span>
          <h2 class="highlight-red">30% PASSADO: DÍVIDAS</h2>
        </div>
        <h3>A parcela limite para pagar seus erros passados.</h3>
        <p style="font-size: 1.35rem; max-width: 850px; color: var(--color-white); line-height: 1.7; margin: 0;">
          Se mais de 30% do seu ganho atual vai para parcelamentos, empréstimos e faturas, você está vivendo sufocado. O objetivo do Ex Devedor é enquadrar suas contas nesse limite estratégico e acelerar as quitações.
        </p>
      </div>
    `
  },
  // Slide 27
  {
    id: 30,
    theme: 'theme-good',
    slogan: 'O seu seguro de liberdade',
    html: `
      <div class="grid-editorial-split editorial-panel">
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 25px;">
          <div>
            <span class="cover-badge-sec">Gaveta 03</span>
            <h2>10% FUTURO: A SEGURANÇA</h2>
          </div>
          <h3>Investimentos para os seus sonhos e paz mental.</h3>
          <p style="font-size: 1.25rem; color: var(--color-grey-text); line-height: 1.7;">
            Esse valor é intocável para despesas diárias. É a sua blindagem comportamental contra crises e o acelerador dos seus sonhos.
          </p>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 20px; border-left: 1px solid var(--color-grey-medium); padding-left: 45px;">
          <div class="editorial-card" style="padding: 24px; gap: 10px;">
            <strong style="font-family: var(--font-family-title); font-size: 1.2rem; color: var(--color-white);">Reserva de Emergência</strong>
            <p style="font-size: 0.9rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Evita que imprevistos de saúde ou desemprego criem novas dívidas.</p>
          </div>
          <div class="editorial-card" style="padding: 24px; gap: 10px;">
            <strong style="font-family: var(--font-family-title); font-size: 1.2rem; color: var(--color-white);">Caixa dos Sonhos</strong>
            <p style="font-size: 0.9rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Poupança específica para o seu objetivo principal (Casa, Viagem, Estudos).</p>
          </div>
        </div>
      </div>
    `
  },
  // Slide 28
  {
    id: 31,
    theme: 'theme-good',
    slogan: 'A triade da execução',
    html: `
      <div class="editorial-panel" style="gap: 30px; padding: 60px;">
        <div>
          <span class="cover-badge-sec">A Metodologia de Campo</span>
          <h2>O MÉTODO EX DEVEDOR</h2>
          <p style="color: var(--color-grey-text); margin-top: 5px; margin-bottom: 0;">Três passos estruturados e lógicos:</p>
        </div>
        <div class="grid-3col">
          <div class="editorial-card" style="padding: 30px; gap: 15px;">
            <span style="font-size: 2.2rem; font-weight: 700; color: var(--color-neon-yellow); font-family: var(--font-family-title); line-height: 1.1;">1. LISTAR</span>
            <strong>Raio-X Absoluto</strong>
            <p style="font-size: 0.95rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Colocar todas as contas, taxas de juros e credores na mesa sem medo da realidade.</p>
          </div>
          <div class="editorial-card" style="padding: 30px; gap: 15px;">
            <span style="font-size: 2.2rem; font-weight: 700; color: var(--color-neon-yellow); font-family: var(--font-family-title); line-height: 1.1;">2. ORDENAR</span>
            <strong>Definir Estratégia</strong>
            <p style="font-size: 0.95rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Classificar a quitação com base no impacto econômico ou na tranquilidade emocional.</p>
          </div>
          <div class="editorial-card" style="padding: 30px; gap: 15px;">
            <span style="font-size: 2.2rem; font-weight: 700; color: var(--color-neon-yellow); font-family: var(--font-family-title); line-height: 1.1;">3. PAGAR</span>
            <strong>Foco de Ataque</strong>
            <p style="font-size: 0.95rem; color: var(--color-grey-text); line-height: 1.6; margin: 0;">Quitar seguindo a estratégia rigorosamente, e renegociar de forma agressiva.</p>
          </div>
        </div>
      </div>
    `
  },
  // Slide 29
  {
    id: 32,
    theme: 'theme-good',
    slogan: 'Você tomou a decisão de mudar de vida',
    html: `
      <div class="editorial-panel word-impact-panel" style="background-color: #000000; border-color: var(--color-neon-yellow); padding-left: 10%; gap: 25px;">
        <span class="cover-badge-sec" style="color: var(--color-white)">Conclusão</span>
        <h1 class="highlight-yellow" style="font-size: clamp(4rem, 11vw, 9.5rem); margin: 0;">MUITO OBRIGADO!</h1>
        <p style="font-size: 1.4rem; max-width: 800px; color: var(--color-white); line-height: 1.7; margin: 0;">
          "A educação financeira salvou a minha vida. Graças a ela realizei muitos sonhos e desejos, e é exatamente isso que desejo para você hoje."
        </p>
      </div>
    `
  },
  // Slide 30
  {
    id: 33,
    theme: 'theme-good',
    slogan: 'Vencendo os boletos, comprando o tempo',
    html: `
      <div class="editorial-panel" style="gap: 30px; text-align: left; padding: 60px;">
        <div>
          <span class="cover-badge-sec">Rede de Contatos</span>
          <h2>Contatos</h2>
          <p style="color: var(--color-grey-text); margin-top: 5px; margin-bottom: 0;">Abaixo estão os canais oficiais para você continuar acompanhando materiais práticos e dicas comportamentais:</p>
        </div>
        <div class="grid-3col">
          <div class="editorial-card" style="padding: 30px; gap: 12px; align-items: flex-start;">
            <h3 style="margin-bottom: 5px;">INSTAGRAM</h3>
            <a href="https://instagram.com/ExDevedor" target="_blank" class="highlight-yellow" style="text-decoration: none; font-weight: 700; font-size: 1.15rem; font-family: var(--font-family-title); letter-spacing: 1px;">@ExDevedor</a>
          </div>
          <div class="editorial-card" style="padding: 30px; gap: 12px; align-items: flex-start;">
            <h3 style="margin-bottom: 5px;">SITE</h3>
            <a href="https://exdevedor.com" target="_blank" class="highlight-yellow" style="text-decoration: none; font-weight: 700; font-size: 1.15rem; font-family: var(--font-family-title); letter-spacing: 1px;">exdevedor.com</a>
          </div>
          <div class="editorial-card" style="padding: 30px; gap: 12px; align-items: flex-start;">
            <h3 style="margin-bottom: 5px;">CONTATO</h3>
            <span class="highlight-yellow" style="font-weight: 700; font-size: 1.1rem; font-family: var(--font-family-title); letter-spacing: 0.5px;">contato@exdevedor.com</span>
          </div>
        </div>
      </div>
    `
  }
];

let slidesData = [];
const SLIDES_VERSION = 'v6_add_history_slides';
try {
  const savedVersion = localStorage.getItem('exdevedor_slides_version');
  const saved = localStorage.getItem('exdevedor_slides');
  if (saved && savedVersion === SLIDES_VERSION) {
    slidesData = JSON.parse(saved);
  } else {
    slidesData = JSON.parse(JSON.stringify(defaultSlidesData));
    localStorage.setItem('exdevedor_slides', JSON.stringify(slidesData));
    localStorage.setItem('exdevedor_slides_version', SLIDES_VERSION);
  }
} catch (e) {
  slidesData = JSON.parse(JSON.stringify(defaultSlidesData));
}

// ==========================================================================
// SELETORES DOM
// ==========================================================================
const slidesContainer = document.getElementById('slides-container');
const progressBar = document.getElementById('progress-bar');
const currentSlideNum = document.getElementById('current-slide-num');
const totalSlidesNum = document.getElementById('total-slides-num');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slideSloganText = document.getElementById('slide-slogan');
const keyboardHelper = document.getElementById('keyboard-helper');
const closeHelperBtn = document.getElementById('close-helper-btn');

function getSavedSlideIndex() {
  const hash = window.location.hash;
  if (hash) {
    const match = hash.match(/#?(?:slide-)?(\d+)/i);
    if (match) {
      const parsedNum = parseInt(match[1], 10) - 1;
      if (parsedNum >= 0 && parsedNum < slidesData.length) {
        return parsedNum;
      }
    }
  }
  try {
    const saved = localStorage.getItem('exdevedor_last_slide_index');
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < slidesData.length) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Erro ao ler localStorage:', e);
  }
  return 0;
}

let currentSlideIndex = getSavedSlideIndex();

// ==========================================================================
// INICIALIZAÇÃO E MONTAGEM DOS SLIDES
// ==========================================================================

// Slides com pouco conteúdo que devem ficar centralizados no mobile
const centeredSlides = new Set([1, 3, 6, 7, 10, 13, 15, 17, 18, 20, 21, 23, 29, 32]);

function initSlides() {
  totalSlidesNum.textContent = String(slidesData.length).padStart(2, '0');

  slidesContainer.innerHTML = '';
  slidesData.forEach((slide, idx) => {
    const slideEl = document.createElement('section');
    slideEl.className = `slide ${slide.theme} slide-index-${idx}`;
    slideEl.id = `slide-id-${slide.id}`;

    // Centraliza slides com pouco conteúdo no mobile
    if (centeredSlides.has(slide.id)) {
      slideEl.classList.add('slide-centered');
    }

    slideEl.innerHTML = slide.html;
    
    if (idx === currentSlideIndex) {
      slideEl.classList.add('active');
    }
    
    slidesContainer.appendChild(slideEl);
  });

  setTimeout(generateQRCode, 100);

  setupEvents();
  goToSlide(currentSlideIndex);
}

// ==========================================================================
// GERADOR DE QR CODE (Offline & Seguro)
// ==========================================================================
function generateQRCode() {
  const qrCanvas = document.getElementById('qr-canvas');
  if (qrCanvas) {
    QRCode.toCanvas(qrCanvas, 'https://palestra.exdevedor.com', {
      width: 210,
      margin: 1,
      color: {
        dark: '#0a0b0d',
        light: '#ffffff'
      }
    }, function (error) {
      if (error) console.error('Erro ao gerar QR Code:', error);
    });
  }
}

// ==========================================================================
// CONTROLE DE NAVEGAÇÃO
// ==========================================================================
function goToSlide(index) {
  if (index < 0 || index >= slidesData.length) return;

  const activeSlide = slidesContainer.querySelector('.slide.active');
  if (activeSlide) activeSlide.classList.remove('active');

  currentSlideIndex = index;

  const targetSlide = slidesContainer.querySelector(`.slide-index-${currentSlideIndex}`);
  if (targetSlide) {
    targetSlide.classList.add('active');
  }

  // Persiste a posição atual no cache (localStorage)
  try {
    localStorage.setItem('exdevedor_last_slide_index', String(currentSlideIndex));
  } catch (e) {
    console.warn('Erro ao salvar posição no localStorage:', e);
  }

  // Sincroniza o hash na URL (#slide-X) sem forçar reload
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', `#slide-${currentSlideIndex + 1}`);
  }

  triggerDopamineEffects();
  updateUI();
}

function nextSlide() {
  if (currentSlideIndex < slidesData.length - 1) {
    goToSlide(currentSlideIndex + 1);
  }
}

function prevSlide() {
  if (currentSlideIndex > 0) {
    goToSlide(currentSlideIndex - 1);
  }
}

// ==========================================================================
// EFEITOS DE RECOMPENSA (Dopamina / Confetes / Animações)
// ==========================================================================
let confettiInterval;

function triggerDopamineEffects() {
  // Limpa intervalos de confetes de slides anteriores
  if (confettiInterval) {
    clearInterval(confettiInterval);
    confettiInterval = null;
  }

  const slideId = slidesData[currentSlideIndex].id;

  // Slide 29: Muito Obrigado! (Celebração de Confetes contínua)
  if (slideId === 29) {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Mantém mini-explosões laterais para animar a plateia
    confettiInterval = setInterval(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 1500);
  }

  // Slide 6: DISCIPLINA ou Slide 19: Quebrando o ciclo (Confete pontual rápido de conquista)
  if (slideId === 6 || slideId === 19) {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#d4ff00', '#dfa83f', '#ffffff']
    });
  }
}

// ==========================================================================
// ATUALIZAÇÃO DOS ELEMENTOS DA INTERFACE (EDITORIAL FOOTER)
// ==========================================================================
function updateUI() {
  const currentSlide = slidesData[currentSlideIndex];

  // 1. Atualiza Indicador Numérico
  currentSlideNum.textContent = String(currentSlideIndex + 1).padStart(2, '0');

  // 2. Atualiza Barra de Progresso
  const progressPercent = ((currentSlideIndex + 1) / slidesData.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // 3. Atualiza Slogan do Rodapé
  slideSloganText.textContent = currentSlide.slogan;

  // 4. Modifica o tema global do Body conforme o tema do slide
  document.body.className = ''; // Limpa temas
  if (currentSlide.theme === 'theme-bad') {
    document.body.classList.add('bad-theme');
  }

  // 5. Ativação dos botões de navegação
  prevBtn.disabled = currentSlideIndex === 0;
  nextBtn.disabled = currentSlideIndex === slidesData.length - 1;
}

// ==========================================================================
// CONFIGURAÇÃO DOS EVENTOS (Teclado, Clique, Swipe)
// ==========================================================================
function setupEvents() {
  // Clique nos botões da UI
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Suporte a Teclado (Setas e Barra de Espaço)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  // Fechar Helper do Teclado
  closeHelperBtn.addEventListener('click', () => {
    keyboardHelper.style.display = 'none';
  });

  // Temporizador para esconder o helper automaticamente após 6 segundos
  setTimeout(() => {
    keyboardHelper.style.opacity = '0';
    setTimeout(() => keyboardHelper.style.display = 'none', 600);
  }, 6000);

  // Swipe Mobile (Touch events)
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50; // pixels mínimos de arrasto
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide(); // Arrastou para a esquerda -> Próximo
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide(); // Arrastou para a direita -> Anterior
    }
  }

  // Suporte a historico do navegador (Voltar/Avançar e mudancas de #slide-X)
  window.addEventListener('hashchange', () => {
    const targetIdx = getSavedSlideIndex();
    if (targetIdx !== currentSlideIndex) {
      goToSlide(targetIdx);
    }
  });
}

function initAdmin() {
  document.body.className = 'bad-theme'; 
  
  let adminHtml = `
    <div style="padding: 40px; color: var(--color-white); max-width: 1000px; margin: 0 auto; overflow-y: auto; height: 100vh;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
        <h1 style="font-family: var(--font-family-title); color: var(--color-crimson-red);">ÁREA ADMINISTRATIVA</h1>
        <div>
          <button id="admin-reset-btn" style="background-color: transparent; color: var(--color-grey-light); padding: 12px 24px; border: none; font-size: 0.9rem; cursor: pointer; text-decoration: underline;">Restaurar Padrão</button>
          <button id="admin-save-btn" style="background-color: var(--color-crimson-red); color: white; padding: 12px 24px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-right: 15px; margin-left: 15px;">SALVAR ALTERAÇÕES</button>
          <button id="admin-view-btn" style="background-color: var(--color-grey-dark); color: white; padding: 12px 24px; border: 1px solid var(--color-grey-medium); border-radius: 4px; font-weight: bold; cursor: pointer;">VER APRESENTAÇÃO</button>
        </div>
      </div>
      <p style="margin-bottom: 30px; font-size: 1.2rem; color: var(--color-grey-light);">Edite o texto e o HTML de cada slide abaixo. Cuidado para não apagar as tags HTML se não quiser perder o layout visual das páginas.</p>
      <div id="admin-slides-list" style="display: flex; flex-direction: column; gap: 40px;">
      </div>
    </div>
  `;
  document.getElementById('app').innerHTML = adminHtml;

  const listContainer = document.getElementById('admin-slides-list');
  slidesData.forEach((slide, index) => {
    const slideBox = document.createElement('div');
    slideBox.style.cssText = 'background: rgba(0,0,0,0.5); border: 1px solid var(--color-grey-medium); border-radius: 8px; padding: 20px;';
    
    slideBox.innerHTML = `
      <h3 style="margin-bottom: 15px; color: var(--color-yellow);">Slide ${slide.id}</h3>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; color: var(--color-grey-light);">Slogan do Rodapé:</label>
        <input type="text" id="admin-slogan-${index}" value="${slide.slogan.replace(/"/g, '&quot;')}" style="width: 100%; padding: 10px; background: #111; border: 1px solid #333; color: white; border-radius: 4px; font-size: 1rem;">
      </div>
      <div>
        <label style="display: block; margin-bottom: 5px; color: var(--color-grey-light);">Conteúdo HTML / Texto:</label>
        <textarea id="admin-html-${index}" rows="10" style="width: 100%; padding: 10px; background: #111; border: 1px solid #333; color: white; border-radius: 4px; font-size: 1rem; font-family: monospace;">${slide.html}</textarea>
      </div>
    `;
    listContainer.appendChild(slideBox);
  });

  document.getElementById('admin-save-btn').addEventListener('click', () => {
    const newSlidesData = slidesData.map((slide, index) => {
      return {
        ...slide,
        slogan: document.getElementById('admin-slogan-' + index).value,
        html: document.getElementById('admin-html-' + index).value,
      };
    });
    localStorage.setItem('exdevedor_slides', JSON.stringify(newSlidesData));
    alert('Alterações salvas com sucesso!');
  });

  document.getElementById('admin-reset-btn').addEventListener('click', () => {
    if(confirm('Tem certeza? Isso apagará todas as suas edições e voltará para o texto original.')) {
      localStorage.removeItem('exdevedor_slides');
      window.location.reload();
    }
  });

  document.getElementById('admin-view-btn').addEventListener('click', () => {
    window.location.hash = '';
    window.location.search = '';
    window.location.reload();
  });
}

// ==========================================================================
// INICIALIZA O SITE (E ROTEAMENTO ADMIN)
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
    initAdmin();
  } else {
    initSlides();
  }
});
