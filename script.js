// Hamburguer Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.style.display = 'none';
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Filtro de projetos
const filtroButtons = document.querySelectorAll('.filtro-btn');
const projectCards = document.querySelectorAll('.projeto-card');

filtroButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover classe ativa de todos os botões
        filtroButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar classe ativa ao botão clicado
        button.classList.add('active');

        const filtro = button.getAttribute('data-filtro');

        // Filtrar projetos
        projectCards.forEach(card => {
            if (filtro === 'todos') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                const categoria = card.getAttribute('data-categoria');
                if (categoria === filtro) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Scroll suave para seções (já está no CSS, mas adicionando suporte para navegadores antigos)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animação ao fazer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos de animação
document.querySelectorAll('.projeto-card, .servico-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Form submission
const form = document.querySelector('.contato-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obter valores do formulário
        const nome = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const mensagem = form.querySelector('textarea').value;

        // Validação básica
        if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // Simular envio
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Enviando...';
        button.disabled = true;

        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Obrigado por entrar em contato.');
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// Efeito parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Atualizar navbar ao fazer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Adicionar classe ativa aos links de navegação baseado na seção visível
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Inicializar
console.log('Portfólio carregado com sucesso!');
