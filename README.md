# GitHub Profile Viewer

Aplicação web para buscar e visualizar perfis do GitHub. Digite um nome de usuário e veja informações completas do perfil, incluindo seguidores, repositórios e estatísticas.

## 🎯 O que faz

- Busca usuários do GitHub pela API
- Mostra avatar, nome, bio, localização e empresa
- Exibe contadores de seguidores, seguindo e repositórios públicos
- Lista os 10 repositórios mais recentes com stars, forks, watchers e linguagem
- Mostra há quanto tempo cada repositório foi atualizado
- Totalmente responsivo para mobile e desktop

## 🚀 Como usar

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/github-profile-viewer.git
```

2. Abra o `index.html` no navegador

3. Digite um username do GitHub (ex: torvalds, gaearon) e clique em "Buscar"

## 🛠️ Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Animações, Variáveis CSS)
- JavaScript ES6+ (Classes, Async/Await, Modules, Fetch API)
- GitHub REST API v3

## 📂 Estrutura
```
github-profile-viewer/
├── index.html
└── src/
    ├── css/
    │   ├── reset.css          # Reset de estilos padrão
    │   ├── styles.css         # Estilos principais e layout
    │   ├── animations.css     # Animações e transições
    │   └── responsive.css     # Media queries (320px até 1280px)
    └── js/
        ├── githubApi.js       # Classe para requisições à API
        ├── profileView.js     # Classe para renderização da UI
        └── index.js           # Controlador principal da aplicação
```

## 💡 Funcionalidades

✅ Validação de input com regex (aceita apenas usernames válidos do GitHub)  
✅ Tratamento de erros (usuário não encontrado 404, limite de API 403)  
✅ Loading spinner animado durante requisições  
✅ Design responsivo mobile-first (7 breakpoints)  
✅ Animações suaves (fade-in, slide-up, hover effects)  
✅ Requisições paralelas com Promise.all() para melhor performance  
✅ Link direto para o perfil completo no GitHub  
✅ Descrição dos repositórios quando disponível  
✅ Data relativa de atualização (ex: "3 dias atrás")  
✅ Feedback visual em todos os estados (loading, erro, sucesso)

## 🎨 Destaques Técnicos

- **Arquitetura limpa**: Separação de responsabilidades em classes específicas
- **ES6 Modules**: Código modular e reutilizável
- **Async/Await**: Código assíncrono legível
- **CSS Grid + Flexbox**: Layout moderno e responsivo
- **Gradiente animado**: Background com animação suave
- **Cards interativos**: Hover effects nos repositórios

## 📱 Responsividade

Breakpoints otimizados para:
- 1280px (Desktop médio)
- 1024px (Tablet landscape)
- 768px (Tablet portrait)
- 640px (Mobile grande)
- 480px (Mobile médio)
- 375px (Mobile pequeno - iPhone SE)
- 320px (Mobile extra pequeno)

## 🔍 API do GitHub

Endpoints utilizados:
- `GET /users/{username}` - Dados do usuário
- `GET /users/{username}/repos` - Repositórios (ordenados por atualização)

Limite: 60 requisições por hora (sem autenticação)

## 📝 Licença

MIT

---

**Desenvolvido para praticar consumo de APIs REST e manipulação do DOM**
