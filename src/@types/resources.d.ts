interface Resources {
  "common": {
    "wellcome": "Bem-vindo ao nosso aplicativo!",
    "sidebar": {
      "survey": "Formulário",
      "webhooks": "Webhooks",
      "company": "Empresa",
      "logout": "Sair"
    }
  },
  "company": {
    "title": "Companhia"
  },
  "login": {
    "title": "Login!",
    "subtitle": "Por favor, insira suas credenciais para fazer login.",
    "form": {
      "emailLabel": "Email",
      "emailPlaceholder": "john.doe@addres.com",
      "passwordLabel": "Senha",
      "passwordPlaceholder": "********"
    },
    "actions": {
      "forgotPassword": "Esqueci minha Senha",
      "submit": "Entrar",
      "createAccount": "Criar Conta"
    }
  },
  "surveys": {
    "surveys": {
      "title": "Questionários",
      "addNew": "Adicionar nova enquete",
      "columns": {
        "id": "ID",
        "title": "Título",
        "link": "Link",
        "createdAt": "Criado em"
      }
    },
    "createSurvey": {
      "defaultTitle": "Título da Enquete",
      "toasts": {
        "addQuestionSuccess": "Pergunta adicionada com sucesso!",
        "updateQuestionSuccess": "Pergunta atualizada com sucesso!",
        "previewSubmit": "Dados do questionário enviados com sucesso!",
        "dragError": "Erro ao arrastar a pergunta. Por favor, tente novamente.",
        "deleteQuestion": "Pergunta deletada com sucesso",
        "confirm": "Essa pergunta tem '{{ dependencyQuestion }}' como dependente. Se você deletar, a pergunta dependente também será deletada. Você tem certeza que deseja continuar?"
      }
    }
  },
  "webhook": {
    "title": "Webhooks"
  }
}

export default Resources;
