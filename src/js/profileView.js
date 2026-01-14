export class ProfileRenderer {
  static render(userData, userRepos, container) {
    const repositoriesHTML = this.renderRepositories(userRepos);

    container.innerHTML = `
            ${this.renderProfileCard(userData)}
            ${this.renderCounters(userData)}
            ${this.renderRepositoriesSection(repositoriesHTML)}
        `;
  }

  static renderProfileCard(userData) {
    return `
            <div class="profile-card">
                <img 
                    src="${userData.avatar_url}" 
                    alt="Avatar de ${userData.login}" 
                    class="profile-avatar"
                >
                <div class="profile-info">
                    <h2>${userData.name || userData.login}</h2>
                    <p>${userData.bio || "Sem biografia cadastrada"}</p>
                    ${userData.location ? `<p>📍 ${userData.location}</p>` : ""}
                    ${userData.company ? `<p>🏢 ${userData.company}</p>` : ""}
                    <a 
                        href="${userData.html_url}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="profile-link"
                    >
                        Ver perfil completo no GitHub →
                    </a>
                </div>
            </div>
        `;
  }

  static renderCounters(userData) {
    return `
            <div class="profile-counters">
                <div class="counter-item">
                    <h4>👥 Seguidores</h4>
                    <span>${userData.followers}</span>
                </div>
                <div class="counter-item">
                    <h4>👤 Seguindo</h4>
                    <span>${userData.following}</span>
                </div>
                <div class="counter-item">
                    <h4>📚 Repositórios</h4>
                    <span>${userData.public_repos}</span>
                </div>
            </div>
        `;
  }

  static renderRepositories(userRepos) {
    if (!userRepos || userRepos.length === 0) {
      return '<div class="empty-state"><p>📭 Nenhum repositório público encontrado</p></div>';
    }

    return userRepos
      .map(
        (repo) => `
            <a 
                href="${repo.html_url}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="repository-card"
            >
                <h3>${repo.name}</h3>
                ${
                  repo.description
                    ? `<p style="color: var(--muted-foreground); font-size: 0.875rem; margin-bottom: 1rem;">${repo.description}</p>`
                    : ""
                }
                <div class="repository-stats">
                    <span>⭐ Stars: ${repo.stargazers_count}</span>
                    <span>🍴 Forks: ${repo.forks_count}</span>
                    <span>👀 Watchers: ${repo.watchers_count}</span>
                    <span>💻 ${
                      repo.language || "Linguagem não especificada"
                    }</span>
                    ${
                      repo.updated_at
                        ? `<span>🕒 Atualizado: ${this.formatDate(
                            repo.updated_at
                          )}</span>`
                        : ""
                    }
                </div>
            </a>
        `
      )
      .join("");
  }

  static renderRepositoriesSection(repositoriesHTML) {
    return `
            <div class="profile-repositories">
                <h2>Repositórios Recentes</h2>
                <div class="repositories">
                    ${repositoriesHTML}
                </div>
            </div>
        `;
  }

  static showLoading(container) {
    container.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Carregando perfil...</p>
            </div>
        `;
  }

  static showError(container, message) {
    container.innerHTML = `
            <div class="error-message">
                ⚠️ ${message}
            </div>
        `;
  }

  static formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
    return `${Math.floor(diffDays / 365)} anos atrás`;
  }
}
