const BASE_URL = "https://api.github.com";

export class GitHubAPI {
 
  static async fetchUser(userName) {
    const response = await fetch(`${BASE_URL}/users/${userName}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Usuário não encontrado.");
      }
      if (response.status === 403) {
        throw new Error(
          "Limite de requisições excedido. Tente novamente mais tarde."
        );
      }
      throw new Error("Erro ao buscar usuário. Tente novamente.");
    }

    return await response.json();
  }

  static async fetchUserRepos(userName) {
    const response = await fetch(
      `${BASE_URL}/users/${userName}/repos?per_page=10&sort=updated&direction=desc`
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "Limite de requisições excedido. Tente novamente mais tarde."
        );
      }
      throw new Error("Erro ao buscar repositórios.");
    }

    return await response.json();
  }

  static async fetchUserProfile(userName) {
    const [userData, userRepos] = await Promise.all([
      this.fetchUser(userName),
      this.fetchUserRepos(userName),
    ]);

    return { userData, userRepos };
  }
}
