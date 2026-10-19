(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const savedTheme = localStorage.getItem('cr7-theme');
  if (savedTheme === 'light') document.documentElement.dataset.theme = 'light';
  const themeBtn = $('[data-theme-toggle]');
  themeBtn?.addEventListener('click', () => {
    const light = document.documentElement.dataset.theme !== 'light';
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    localStorage.setItem('cr7-theme', light ? 'light' : 'dark');
  });
  const menuBtn = $('[data-menu-toggle]');
  menuBtn?.addEventListener('click', () => {
    const nav = $('.main-nav');
    const open = nav?.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(!!open));
  });
  // Cursor-reactive hero: gentle perspective/parallax, respects reduced-motion preferences.
  const hero = $('.hero-art');
  if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      hero.style.setProperty('--mx', `${x*10}px`);
      hero.style.setProperty('--my', `${y*7}px`);
    });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--mx','0px'); hero.style.setProperty('--my','0px');
    });
  }
  // Gallery filters
  const filters = $$('[data-filter]');
  const galleryItems = $$('[data-category]');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => { b.classList.toggle('active', b===btn); b.setAttribute('aria-pressed', String(b===btn)); });
    const wanted = btn.dataset.filter;
    galleryItems.forEach(item => item.hidden = wanted !== 'all' && item.dataset.category !== wanted);
  }));
  // Accessible image detail dialog
  const dialog = $('#image-dialog');
  $$('[data-open-image]').forEach(card => card.addEventListener('click', () => {
    if (!dialog) return;
    const image = $('[data-dialog-image]', dialog);
    image.src = card.dataset.image;
    image.alt = card.dataset.title || 'Cristiano Ronaldo career photograph';
    $('[data-dialog-title]', dialog).textContent = card.dataset.title || 'Career moment';
    $('[data-dialog-copy]', dialog).textContent = card.dataset.copy || 'A moment from the journey.';
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open','');
  }));
  $$('[data-close-dialog]').forEach(b => b.addEventListener('click', () => dialog?.close?.()));
  dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  // Ten-question quiz, deterministic scoring and feedback.
  const quizRoot = $('#quiz');
  if (quizRoot) {
    const questions = [
      ['Which island was Ronaldo born on?',['Madeira','Sicily','Mallorca','Sardinia'],0],
      ['Which club did he join in 2003?',['Arsenal','Manchester United','Chelsea','Liverpool'],1],
      ['In which year did Portugal win Euro 2016?',['2012','2014','2016','2018'],2],
      ['Which number is most associated with Ronaldo?',['9','7','10','11'],1],
      ['Which Spanish club did he represent from 2009?',['Barcelona','Atlético Madrid','Real Madrid','Sevilla'],2],
      ['Which Italian club did he join in 2018?',['Inter','Juventus','Milan','Roma'],1],
      ['What is his famous celebration commonly called?',['Vamos','Siuuu','Allez','Olé'],1],
      ['Against which country did Portugal win the Euro 2016 final?',['France','Germany','Spain','Italy'],0],
      ['Which position best describes his main role?',['Goalkeeper','Centre-back','Forward','Defensive midfielder'],2],
      ['What is the name of Portugal’s national team nickname?',['The Selecção','The Oranje','The Azzurri','The Three Lions'],0]
    ];
    let index=0, score=0, locked=false;
    const render=()=>{
      locked=false;
      const q=questions[index];
      $('#quiz-progress').textContent=`QUESTION ${index+1} / ${questions.length}`;
      $('#quiz-score').textContent=score;
      $('#quiz-question').textContent=q[0];
      const answers=$('#quiz-answers'); answers.innerHTML='';
      q[1].forEach((a,i)=>{
        const b=document.createElement('button'); b.className='answer'; b.textContent=`${String.fromCharCode(65+i)}  ${a}`;
        b.addEventListener('click',()=>{
          if(locked)return; locked=true;
          [...answers.children].forEach((el,j)=>{el.disabled=true;if(j===q[2])el.classList.add('correct');if(j===i&&i!==q[2])el.classList.add('wrong')});
          if(i===q[2])score++;
          $('#quiz-score').textContent=score;
          $('#quiz-feedback').textContent=i===q[2]?'SIUUU! Correct answer.':`Keep grinding! Correct answer: ${q[1][q[2]]}.`;
          $('#quiz-next').textContent=index===questions.length-1?'PLAY AGAIN':'NEXT QUESTION →';
          $('#quiz-next').hidden=false;
        }); answers.appendChild(b);
      });
      $('#quiz-feedback').textContent='Choose your answer.';
      $('#quiz-next').hidden=true;
    };
    $('#quiz-next').addEventListener('click',()=>{
      if(index===questions.length-1){index=0;score=0;} else index++;
      render();
    });
    render();
  }
  // SUIUUU celebration
  const siuuu=$('[data-siuuu]');
  // Play the supplied, locally bundled Ronaldo SIUUU recording.
  const siuuuAudio = $('#siuuu-audio');
  siuuu?.addEventListener('click', async ()=>{
    siuuu.classList.remove('burst'); void siuuu.offsetWidth; siuuu.classList.add('burst');
    const output=$('#siuuu-output');
    if(!siuuuAudio){
      if(output) output.textContent='Audio file not found. Please re-extract the complete website ZIP.';
      return;
    }
    try {
      siuuuAudio.pause();
      siuuuAudio.currentTime = 0;
      siuuuAudio.volume = 1;
      if(output) output.textContent='SIUUU! PLAYING';
      await siuuuAudio.play();
    } catch (error) {
      if(output) output.textContent='Audio could not start. Check your device volume and tap again.';
    }
  });
  siuuuAudio?.addEventListener('ended',()=>{
    const output=$('#siuuu-output');
    if(output) output.textContent='SIUUU! AGAIN?';
  });
  siuuuAudio?.addEventListener('error',()=>{
    const output=$('#siuuu-output');
    if(output) output.textContent='Could not load the local SIUUU audio file.';
  });
  // Search panel
  const searchBtn=$('[data-search-toggle]'), searchPanel=$('#search-panel');
  searchBtn?.addEventListener('click',()=>{searchPanel.hidden=!searchPanel.hidden;if(!searchPanel.hidden)$('#site-search')?.focus()});
  $('#site-search')?.addEventListener('input',e=>{
    const q=e.target.value.toLowerCase().trim();
    $$('.search-entry').forEach(el=>el.hidden=!!q&&!el.textContent.toLowerCase().includes(q));
  });
})();