import { GitHubAPI } from './githubApi.js';
import { ProfileRenderer } from './profileView.js';

class App {
    constructor() {
        this.inputSearch = document.getElementById('input-search');
        this.btnSearch = document.getElementById('btn-search');
        this.searchForm = document.getElementById('search-form');
        this.profileResults = document.querySelector('.profile-results');
        
        this.init();
    }

    /**
     * Inicializa os event listeners
     */
    init() {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.getUserProfile();
        });

        // Remove erro quando usuário começa a digitar
        this.inputSearch.addEventListener('input', () => {
            this.inputSearch.classList.remove('error');
        });
    }

    /**
     * Valida o input do usuário
     * @returns {string|null} Nome de usuário ou null se inválido
     */
    validateInput() {
        const userName = this.inputSearch.value.trim();
        
        if (!userName) {
            this.showInputError('Por favor, digite um nome de usuário.');
            return null;
        }

        if (userName.length < 2) {
            this.showInputError('Nome de usuário deve ter pelo menos 2 caracteres.');
            return null;
        }

        // Validação básica de caracteres permitidos no GitHub
        const validPattern = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
        if (!validPattern.test(userName)) {
            this.showInputError('Nome de usuário inválido.');
            return null;
        }

        return userName;
    }

    /**
     * Mostra erro no input
     * @param {string} message - Mensagem de erro
     */
    showInputError(message) {
        this.inputSearch.classList.add('error');
        ProfileRenderer.showError(this.profileResults, message);
        
        setTimeout(() => {
            this.inputSearch.classList.remove('error');
            ProfileRenderer.clear(this.profileResults);
        }, 3000);
    }

    /**
     * Busca e renderiza o perfil do usuário
     */
    async getUserProfile() {
        const userName = this.validateInput();
        
        if (!userName) {
            return;
        }

        // Desabilita o botão e mostra loading
        this.btnSearch.disabled = true;
        this.inputSearch.classList.remove('error');
        ProfileRenderer.showLoading(this.profileResults);

        try {
            const { userData, userRepos } = await GitHubAPI.fetchUserProfile(userName);
            ProfileRenderer.render(userData, userRepos, this.profileResults);
        } catch (error) {
            console.error('Erro ao buscar perfil:', error);
            ProfileRenderer.showError(this.profileResults, error.message);
        } finally {
            this.btnSearch.disabled = false;
        }
    }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new App();
});