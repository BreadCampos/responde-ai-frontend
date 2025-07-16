interface Resources {
  "common": {
    "wellcome": "Bem-vindo ao nosso aplicativo!",
    "sidebar": {
      "survey": "Formulário",
      "webhooks": "Webhooks",
      "company": "Empresa",
      "logout": "Sair"
    },
    "button": {
      "add": "Adicionar",
      "edit": "Editar",
      "delete": "Deletar",
      "save": "Salvar",
      "cancel": "Cancelar",
      "submit": "Enviar",
      "close": "Fechar",
      "next": "Próximo",
      "previous": "Anterior",
      "submiting": "Enviando...",
      "validating": "Validando...",
      "loading": "Carregando...",
      "confirm": "Confirmar",
      "send": "Enviar"
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
    "questionTypes": {
      "text": "Texto",
      "number": "Número",
      "date": "Data",
      "select": "Seleção",
      "checkbox": "Checkbox",
      "radio": "Radio",
      "textarea": "Área de Texto",
      "rating": "Avaliação",
      "checkbox_group": "Grupo de Checkboxes",
      "select_multiple": "Seleção Múltipla"
    },
    "surveys": {
      "title": "Questionários",
      "addNew": "Adicionar nova questionário",
      "columns": {
        "id": "ID",
        "title": "Título",
        "link": "Link",
        "createdAt": "Criado em"
      }
    },
    "createSurvey": {
      "defaultTitle": "Título da Questionário",
      "clickToEdit": "Clique para editar",
      "toasts": {
        "addQuestionSuccess": "Pergunta adicionada com sucesso!",
        "updateQuestionSuccess": "Pergunta atualizada com sucesso!",
        "previewSubmit": "Dados do questionário enviados com sucesso!",
        "dragError": "Erro ao arrastar a pergunta. Por favor, tente novamente.",
        "deleteQuestion": "Pergunta deletada com sucesso",
        "confirm": "Essa pergunta tem '{{dependencyQuestion}}' como dependente. Se você deletar, a pergunta dependente também será deletada. Você tem certeza que deseja continuar?"
      },
      "editController": {
        "title": "Perguntas",
        "page": "Page {{page}}",
        "editQuestion": "Editar pergunta",
        "deleteQuestion": "Deletar pergunta",
        "questionType": "Tipo de pergunta",
        "defaultMessage": "Adicione uma pergunta para iniciar."
      },
      "buttons": {
        "create": "Criar questionário",
        "update": "Atualizar questionário",
        "addQuestion": "Adicionar pergunta"
      }
    },
    "surveyPreview": {
      "title": "Visualização do questionário",
      "description": "Visualize como o questionário será exibido para os usuários.",
      "submit": "Enviar questionário",
      "toasts": {
        "submitSuccess": "Questionário enviado com sucesso!"
      }
    },
    "surveyModal": {
      "title": {
        "edit": "Editar Questão",
        "add": "Adicionar Questão",
        "preview": "Pré vizualização"
      },
      "description": {
        "edit": "Está no modo edição de uma questão já existente",
        "add": "Adicione uma nova questão ao questionário"
      },
      "buttons": {
        "save": "Salvar"
      },
      "form": {
        "title": "Especificação",
        "fields": {
          "label": {
            "label": "Titulo da questão"
          },
          "type": {
            "label": "Tipo de questão"
          },
          "placeholder": {
            "label": "Placeholder"
          },
          "hint": {
            "label": "Dica"
          },
          "pageIndex": {
            "label": "Número da Página"
          },
          "inputMask": {
            "label": "Máscara de Input (Opcional)",
            "placeholder": "exp: (00) 00000-0000",
            "helperText": "Use '0' para números, 'a' para letras e '*' para qualquer caractere. Para múltiplas máscaras, separe com vírgula."
          }
        }
      },
      "rating": {
        "title": "Opções de Avaliação",
        "styles": {
          "stars": "Estrelas",
          "slider": "Barra de Deslizar",
          "nps": "NPS (Escala 0-10)"
        },
        "nps": {
          "minLabelDefault": "Não Recomendo",
          "maxLabelDefault": "Recomendo Totalmente"
        },
        "fields": {
          "style": {
            "label": "Estilo de Exibição"
          },
          "minLabel": {
            "label": "Label do valor mínimo"
          },
          "maxLabel": {
            "label": "Label do valor maximo"
          },
          "min": {
            "label": "Valor Mínimo"
          },
          "max": {
            "label": "Valor Máximo"
          }
        }
      },
      "options": {
        "title": "Opções da Questão",
        "fields": {
          "label": {
            "placeholder": "Label {{index}}"
          },
          "value": {
            "placeholder": "Valor {{index}}"
          }
        },
        "buttons": {
          "add": "Adicionar Opção +"
        }
      },
      "conditionals": {
        "enable": {
          "label": "Adicionar lógica condicional?"
        },
        "fields": {
          "fieldId": {
            "label": "Aparecer somente se a pergunta...",
            "placeholder": "Selecione uma pergunta"
          },
          "operator": {
            "label": "...a condição for...",
            "placeholder": "Selecione uma condição"
          }
        },
        "operators": {
          "equals": "Igual a",
          "not_equals": "Diferente de",
          "greater_than": "Maior que",
          "greater_than_equal": "Maior ou igual a",
          "less_than": "Menor que",
          "less_than_equal": "Menor ou igual a",
          "contains": "Contém",
          "is_one_of": "É um de (OU)"
        },
        "multiValue": {
          "label": "...um dos seguintes valores:",
          "optionPlaceholder": "Opção {{index}}",
          "valuePlaceholder": "Valor {{index}}"
        },
        "singleValue": {
          "label": "...o valor:",
          "selectPlaceholder": "Selecione uma opção",
          "textPlaceholder": "Coloque o valor"
        },
        "buttons": {
          "addValue": "Adicionar Valor"
        }
      },
      "validations": {
        "title": "Regras de Validação",
        "fields": {
          "type": {
            "placeholder": "Selecione uma regra"
          },
          "value": {
            "datePlaceholder": "Selecione a data",
            "numberPlaceholder": "Valor",
            "textPlaceholder": "Regex"
          },
          "errorMessage": {
            "placeholder": "Mensagem de erro (opcional)"
          }
        },
        "labels": {
          "required": "Obrigatório",
          "email": "E-mail válido",
          "url": "URL válida",
          "min": "Valor mínimo",
          "max": "Valor máximo",
          "min_length": "Comprimento mínimo",
          "max_length": "Comprimento máximo",
          "custom": "Regex customizado"
        },
        "buttons": {
          "add": "Adicionar Validação +"
        }
      }
    }
  },
  "webhook": {
    "title": "Webhooks"
  }
}

export default Resources;
