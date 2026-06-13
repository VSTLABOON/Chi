const questions = [
  {
    question: "¿Cuál es el ancestro vivo más cercano al temible Tiranosaurio Rex?",
    options: [
      "El cocodrilo del Nilo",
      "El pollo de tu plato de comida",
      "El avestruz corredor"
    ],
    correct: 1,
    correctFeedback: "¡Exacto! Cada pollo que cacarea lleva en sus venas la sangre de un Tiranosaurio Rex. ¡Eres una gran paleontóloga!"
  },
  {
    question: "Si un Mosasaurus medía 18 metros de largo, ¿cómo se compara con la paciencia de Samara en el salón?",
    options: [
      "El Mosasaurus es más grande, sin duda",
      "La paciencia de Samara supera los límites de la física cuántica",
      "Son exactamente del mismo tamaño"
    ],
    correct: 1,
    correctFeedback: "¡Absolutamente! Explicar el mismo tema doce veces requiere una paciencia cósmica insuperable."
  },
  {
    question: "¿Qué canción de los 80 describe mejor el impacto de tu mirada café?",
    options: [
      "Rock With You de Michael Jackson",
      "Die For You de The Weeknd",
      "S&M de Rihanna"
    ],
    correct: 0,
    correctFeedback: "¡Sí! 'I wanna rock with you, all night...' Tu mirada café alegra cualquier día del Cretácico."
  },
  {
    question: "¿Cuál de estos icónicos pasos de Michael Jackson desafía más la gravedad y la física escolar?",
    options: [
      "El Moonwalk (caminata lunar)",
      "El Lean de 45 grados en 'Smooth Criminal'",
      "El giro de 360 grados sobre las puntas"
    ],
    correct: 1,
    correctFeedback: "¡Espectacular! Esa inclinación de 45 grados es legendaria y desafía las leyes físicas, igual que tu energía alegra el día más gris."
  },
  {
    question: "Si un asteroide prehistórico cayera hoy cerca del colegio, ¿cuál sería la reacción de Samara?",
    options: [
      "Correr en círculos y cacarear como un pollito asustado",
      "Calmar a todos con una sonrisa y pedir que anoten la caída del meteorito como tarea de ciencias",
      "Esconderse en el casillero más cercano"
    ],
    correct: 1,
    correctFeedback: "¡Definitivamente! Tu templanza, liderazgo y carisma son a prueba de cataclismos mesozoicos."
  },
  {
    question: "¿Cuál es considerado el dinosaurio más inteligente y con más estilo del Cretácico?",
    options: [
      "El Triceratops, por sus elegantes cuernos",
      "El Tiranosaurio Rex, aunque tenga brazos cortitos",
      "El Velociraptor, por su rapidez mental y brillo astuto"
    ],
    correct: 2,
    correctFeedback: "¡Por supuesto! Inteligente, audaz y con mucha chispa... ¡igual que la maestra favorita del salón!"
  },
  {
    question: "Si Samara fuera un elemento de la tabla periódica, ¿cuál la representaría mejor?",
    options: [
      "El Helio, porque nos hace flotar de felicidad",
      "El Oro, por su brillo único, valor incalculable y elegancia eterna",
      "El Carbono, porque está en todas partes"
    ],
    correct: 1,
    correctFeedback: "¡Oro puro! Valiosa, excepcional y con una luz propia que no se oxida jamás."
  },
  {
    question: "En el juego del pollito corredor, ¿por qué esquivamos meteoritos con tanto empeño?",
    options: [
      "Porque queremos entregarle una tarea perfecta a la maestra Samara",
      "Porque los meteoritos son de lava ardiente",
      "Porque el pollito tiene miedo"
    ],
    correct: 0,
    correctFeedback: "¡Totalmente! No hay obstáculo espacial capaz de detener a un pollito dedicado a su maestra preferida."
  },
  {
    question: "¿Cuál es el lema legendario que usa el Rayo McQueen en 'Cars 1' para motivarse antes de cada carrera?",
    options: [
      "Veloz como el viento, fuerte como el roble",
      "Vuela como un cohete, esquiva como un cometa",
      "Veloz... yo soy veloz. Un ganador, 42 perdedores. Yo desayuno el peligro..."
    ],
    correct: 2,
    correctFeedback: "¡Cuchau! '¡Veloz, yo soy veloz!' Eres tan veloz e imparable como el Rayo McQueen en la Copa Pistón."
  },
  {
    question: "Si tuvieras que cantar a todo pulmón con 'Big Time Rush' en su viaje por el mundo, ¿qué éxito elegirías?",
    options: [
      "Worldwide, para viajar cantando por todo el globo",
      "Boyfriend, para buscar un novio estrella del pop",
      "Windows Down, para saltar con el volumen al máximo"
    ],
    correct: 0,
    correctFeedback: "¡Worldwide! 'Yes I'll be thinking of you, worldwide...' Esa nostalgia de la época dorada de Nickelodeon es eterna."
  },
  {
    question: "En 'Rápidos y Furiosos 5' (Fast Five), ¿qué arrastran Dom y Brian por las calles de Río de Janeiro en su persecución más loca?",
    options: [
      "Un helicóptero militar derribado",
      "Una gigantesca bóveda de banco blindada tirada por cables de acero",
      "Un tren de carga cargado de dinero"
    ],
    correct: 1,
    correctFeedback: "¡Brillante! Esa bóveda de banco destrozando las calles de Río es el pico del cine de acción. ¡Y qué gran tema es Danza Kuduro!"
  },
  {
    question: "¿Cómo se le conoce popularmente en el escenario a Travis Scott, el famoso creador del álbum Astroworld?",
    options: [
      "Cactus Jack / La Flame",
      "The Starboy",
      "Slim Shady"
    ],
    correct: 0,
    correctFeedback: "¡IT'S LIT! Cactus Jack o La Flame es una leyenda del rap contemporáneo y sus beats nos dan 'goosebumps' reales."
  },
  {
    question: "La artista urbana De La Rose se ha robado los corazones de la escena. ¿Qué tipo de vibras tienen sus letras?",
    options: [
      "Un perreo melancólico y triste, con la carita empapada de lágrimas",
      "Felicidad desbordante bajo el sol playero",
      "Un grito de rock pesado y rebeldía"
    ],
    correct: 0,
    correctFeedback: "¡Exacto! Ese perreo nostálgico con la carita triste y un ritmo de reggaetón lento que se queda en la mente."
  },
  {
    question: "¿Cuál es el nombre real del artista detrás del exitoso alter ego musical y estético 'The Weeknd'?",
    options: [
      "Abel Tesfaye",
      "Austin Mahone",
      "Khalid Robinson"
    ],
    correct: 0,
    correctFeedback: "¡Correcto! Abel Tesfaye nos sumerge en sintetizadores oscuros y voces insuperables de R&B moderno."
  },
  {
    question: "¿Cuál es el álbum de 2013 de 'Arctic Monkeys' que incluye himnos como 'Do I Wanna Know?' y 'I Wanna Be Yours'?",
    options: [
      "AM",
      "Favorite Worst Nightmare",
      "Humbug"
    ],
    correct: 0,
    correctFeedback: "¡Sí, AM! Ese disco de rock alternativo elegante con ondas de sonido en la portada definió a toda una generación."
  },
  {
    question: "En el videoclip de 'Toxic' de Britney Spears, ¿qué profesión ejerce ella mientras hace piruetas de espionaje?",
    options: [
      "Una maestra de ciencias premium",
      "Una azafata de vuelo que en realidad es una agente secreta letal",
      "Una conductora de carreras de alta velocidad"
    ],
    correct: 1,
    correctFeedback: "¡It's Britney, bitch! Como azafata/espía en ese traje futurista azul, marcó un hito indiscutible en la cultura pop."
  },
  {
    question: "En la trilogía original de 'El Hombre Araña' con Tobey Maguire, ¿cuál es el consejo inmortal del tío Ben a Peter Parker?",
    options: [
      "Con gran velocidad viene una gran Copa Pistón",
      "Un gran poder conlleva una gran responsabilidad",
      "Si eres bueno en algo, nunca lo hagas gratis"
    ],
    correct: 1,
    correctFeedback: "¡Por siempre! 'Un gran poder conlleva una gran responsabilidad' es la frase que cambió la historia de los cómics y el cine."
  },
  {
    question: "En 'Son como niños 1' (Grown Ups), ¿qué peligroso pero divertido juego de azar juegan en la cabaña usando un arco?",
    options: [
      "La ruleta de la flecha (lanzar la flecha arriba y ver quién tarda más en correr)",
      "El tiro al blanco con los ojos completamente vendados",
      "Carreras de obstáculos cruzando el bosque de noche"
    ],
    correct: 0,
    correctFeedback: "¡Jajaja, sí! Lanzar la flecha directo al cielo y aguantar sin moverse... ¡la comedia clásica de Adam Sandler y sus amigos!"
  }
];

let currentQuestionIndex = 0;

function initQuiz() {
  const questionContainer = document.getElementById('questionContainer');
  const quizCard = document.getElementById('quizCard');
  const diplomaContainer = document.getElementById('diplomaContainer');

  if (!questionContainer) return;

  function renderQuestion() {
    const q = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
      <div class="quiz-question-container">
        <h4>Pregunta ${currentQuestionIndex + 1} de ${questions.length}:</h4>
        <p style="font-size: 1.1rem; font-weight: bold; margin-bottom: 1.2rem; color: var(--cafe);">${q.question}</p>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-opt-btn" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
        <div id="quizFeedback" style="margin-top: 1.2rem; min-height: 40px; font-style: italic; color: var(--guinda-light); transition: opacity 0.3s ease;"></div>
      </div>
    `;

    const buttons = questionContainer.querySelectorAll('.quiz-opt-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIndex = parseInt(btn.getAttribute('data-index') || '0', 10);
        handleAnswer(selectedIndex, buttons);
      });
    });
  }

  function handleAnswer(selectedIndex, buttons) {
    const q = questions[currentQuestionIndex];
    const feedbackEl = document.getElementById('quizFeedback');
    
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
      buttons[selectedIndex].style.background = '#d4edda';
      buttons[selectedIndex].style.borderColor = '#c3e6cb';
      buttons[selectedIndex].style.color = '#155724';
      if (feedbackEl) {
        feedbackEl.textContent = q.correctFeedback;
        feedbackEl.style.color = '#155724';
      }
    } else {
      buttons[selectedIndex].style.background = '#f8d7da';
      buttons[selectedIndex].style.borderColor = '#f5c6cb';
      buttons[selectedIndex].style.color = '#721c24';
      buttons[q.correct].style.background = '#d4edda';
      buttons[q.correct].style.borderColor = '#c3e6cb';
      if (feedbackEl) {
        feedbackEl.textContent = "¡Cerca! Pero la respuesta correcta era: " + q.options[q.correct];
        feedbackEl.style.color = '#721c24';
      }
    }

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        renderQuestion();
      } else {
        if (quizCard) {
          quizCard.style.opacity = '0';
          quizCard.style.transform = 'translateY(-20px)';
          setTimeout(() => {
            quizCard.style.display = 'none';
            if (diplomaContainer) {
              diplomaContainer.classList.add('open');
              if (typeof launchConfetti === 'function') {
                launchConfetti();
              }
            }
          }, 500);
        }
      }
    }, 2200);
  }

  // Bind print download button
  const downloadBtn = document.getElementById('downloadDiplomaBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      window.print();
    });
  }

  renderQuestion();
}
