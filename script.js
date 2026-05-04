/* ==================== SCRIPT PRINCIPAL - MOOCAKE CONFEITARIA ==================== */

/**
 * DOCUMENTAÇÃO:
 * Este arquivo contém toda a lógica JavaScript para o site da MOOCAKE Confeitaria.
 * Inclui:
 * - Animações ao fazer scroll (Scroll animations)
 * - Validação de formulário
 * - Interatividade suave
 * - Efeitos visuais
 */

// ==================== OBSERVER PARA ANIMAÇÕES AO SCROLL ====================
// Detecta quando elementos entram na viewport e aplica animações

/**
 * Cria um Intersection Observer que ativa animações quando elementos
 * entram na viewport do navegador
 */
const observerOptions = {
    threshold: 0.1,  // Ativa quando 10% do elemento está visível
    rootMargin: '0px 0px -50px 0px'  // Ajusta a área de detecção
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        // Se o elemento entrou na viewport
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Para não animar novamente
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * Observa todos os elementos com classe 'scroll-fade-in'
 * para aplicar animações ao scroll
 */
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.scroll-fade-in');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// ==================== FUNÇÃO DE SCROLL SUAVE ====================
/**
 * Faz scroll suave até uma seção específica do site
 * @param {string} sectionId - O ID da seção para fazer scroll
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',  // Scroll suave
            block: 'start'       // Alinha ao topo
        });
    }
}

// ==================== VALIDAÇÃO E MANIPULAÇÃO DO FORMULÁRIO ====================
/**
 * Sistema de validação e envio do formulário de contato
 */
document.addEventListener('DOMContentLoaded', function() {
    const formContato = document.getElementById('formContato');
    
    if (formContato) {
        // Evento ao enviar formulário
        formContato.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne comportamento padrão
            
            // Coletando dados do formulário
            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Validação básica
            if (!nome || !telefone || !mensagem) {
                mostrarNotificacao('Por favor, preencha todos os campos!', 'erro');
                return;
            }
            
            // Validação de telefone (formato básico)
            if (!validarTelefone(telefone)) {
                mostrarNotificacao('Por favor, insira um telefone válido!', 'erro');
                return;
            }
            
            // Se passou na validação
            mostrarNotificacao('Pedido enviado com sucesso! Em breve entraremos em contato! 🎉', 'sucesso');
            
            // Limpar formulário após envio bem-sucedido
            setTimeout(() => {
                formContato.reset();
            }, 1000);
        });
    }
});

/**
 * Valida se o campo de telefone tem um formato básico válido
 * @param {string} telefone - O valor do telefone para validar
 * @returns {boolean} - True se válido, False caso contrário
 */
function validarTelefone(telefone) {
    // Remove caracteres especiais para validação
    const apenasNumeros = telefone.replace(/\D/g, '');
    // Verifica se tem entre 10 e 11 dígitos (padrão brasileiro)
    return apenasNumeros.length >= 10 && apenasNumeros.length <= 11;
}

/**
 * Exibe uma notificação visual ao usuário
 * @param {string} mensagem - Texto da notificação
 * @param {string} tipo - 'sucesso' ou 'erro'
 */
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;
    
    // Adicionar estilos inline (caso não estime em CSS)
    notificacao.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 2000;
        animation: slideInNotification 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
        background: ${tipo === 'sucesso' ? '#25d366' : '#e74c3c'};
        color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notificacao);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOutNotification 0.3s ease-out forwards';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// ==================== ANIMAÇÕES CSS PARA NOTIFICAÇÕES ====================
/**
 * Injeta estilos de animação para as notificações no documento
 * Isso evita a necessidade de adicionar em arquivo CSS separado
 */
(function injetarAnimacoesNotificacoes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInNotification {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutNotification {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})();

// ==================== EFEITO DE PARALLAX SUAVE ====================
/**
 * Cria um efeito de parallax leve ao fazer scroll
 * (movimento suave de fundo diferente do conteúdo)
 */
let ticking = false;

function updateParallax() {
    const scrollPos = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Move o fundo mais lentamente que o scroll
        hero.style.backgroundPosition = `center ${scrollPos * 0.5}px`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ==================== ANIMAÇÃO AO CARREGAR A PÁGINA ====================
/**
 * Adiciona animação especial aos elementos principais ao carregar a página
 */
document.addEventListener('DOMContentLoaded', function() {
    // Animar todos os cards de produtos ao carregar
    const produtoCards = document.querySelectorAll('.produto-card');
    produtoCards.forEach((card, index) => {
        // A animação já está definida no CSS, mas podemos adicionar clase aqui se necessário
    });
});

// ==================== DETECÇÃO DE PREFERÊNCIA DARK MODE ====================
/**
 * Detecta se o usuário prefere modo escuro e adapta o site (opcional)
 * Por enquanto, mantemos apenas o modo claro conforme especificado
 */
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Usuário prefere tema escuro
    // Poderia ajustar cores aqui se necessário
    console.log('Usuário com preferência de modo escuro detectado');
}

// ==================== FUNCIONALIDADES EXTRAS ====================

/**
 * Adicionar classe 'active' aos links de navegação baseado na seção atual
 */
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/**
 * Log de confirmação de carregamento
 * Útil para debug/verificação
 */
console.log('🎂 MOOCAKE Confeitaria - Site carregado com sucesso!');
console.log('✨ Bem-vindo ao nosso website artesanal e responsivo');
