export const translations = {
  en: {
    hero: {
      title: "this is all very",
      titleHighlight: "awesome!",
      subtitle: "Discover the best events for all styles and occasions. Shows, plays, sports and much more: here you find the ideal ticket to live unforgettable experiences.",
      ctaButton: "see events"
    },
    bestSellers: {
      title: "most popular",
      titleHighlight: "."
    },
    footer: {
      contact: "Contact",
      rights: "E-Ventos © Some rights reserved."
    },
    events: {
      title: "our events",
      subtitle: "CHOOSE THE BEST FOR YOU"
    },
    filters: {
      name: "Name",
      startDate: "Start Date",
      endDate: "End Date",
      location: "Location",
      minPrice: "Minimum Price",
      maxPrice: "Maximum Price",
      filterButton: "Filter",
      clearFilters: "Clear Filters"
    },
    eventBuy: {
      ticketType: "TICKET TYPE",
      unitValue: "UNIT VALUE",
      quantity: "QUANTITY",
      update: "UPDATE",
      select: "SELECT",
      selectedTickets: "SELECTED TICKETS",
      totalValue: "TOTAL VALUE",
      addToCart: "ADD TO CART",
      information: "INFORMATION"
    },
    cart: {
      title: "Cart",
      close: "close",
      empty: "Your cart is empty.",
      quantity: "Quantity:",
      itemsValue: "Items value:",
      convenienceFee: "Convenience fee:",
      total: "TOTAL:",
      loginMessage: "Make",
      login: "login",
      loginSuffix: "to finalize the purchase.",
      finishPurchase: "FINISH PURCHASE"
    },
    navigation: {
      back: "Back"
    },
    auth: {
      pageTitle: "AUTHENTICATION",
      pageSubtitle: "LOGIN OR SIGN UP",
      joinTitle: "Join us",
      loginTitle: "Login to your account",
      email: "Email",
      password: "Password",
      continue: "CONTINUE",
      hasAccount: "Already have an account?",
      noAccount: "Don't have an account?",
      login: "Login",
      signUp: "Sign up"
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success"
    }
  },
  pt: {
    hero: {
      title: "isso tudo é muito",
      titleHighlight: "show!",
      subtitle: "Descubra os melhores eventos para todos os estilos e ocasiões. Shows, peças, esportes e muito mais: aqui você encontra o ingresso ideal para viver experiências inesquecíveis.",
      ctaButton: "ver eventos"
    },
    bestSellers: {
      title: "mais procurados",
      titleHighlight: "."
    },
    footer: {
      contact: "Contato",
      rights: "E-Ventos © Alguns direitos reservados."
    },
    events: {
      title: "nossos eventos",
      subtitle: "ESCOLHA O MELHOR PARA VOCÊ"
    },
    filters: {
      name: "Nome",
      startDate: "Data Inicial",
      endDate: "Data Final",
      location: "Local",
      minPrice: "Preço Mínimo",
      maxPrice: "Preço Máximo",
      filterButton: "Filtrar",
      clearFilters: "Limpar Filtros"
    },
    eventBuy: {
      ticketType: "TIPO DO INGRESSO",
      unitValue: "VALOR DA UNIDADE",
      quantity: "QUANTIDADE",
      update: "ATUALIZAR",
      select: "SELECIONAR",
      selectedTickets: "INGRESSOS SELECIONADOS",
      totalValue: "VALOR TOTAL",
      addToCart: "ADICIONAR AO CARRINHO",
      information: "INFORMAÇÕES"
    },
    cart: {
      title: "Carrinho",
      close: "fechar",
      empty: "Seu carrinho está vazio.",
      quantity: "Quantidade:",
      itemsValue: "Valor dos itens:",
      convenienceFee: "Taxa de conveniência:",
      total: "TOTAL:",
      loginMessage: "Faça",
      login: "login",
      loginSuffix: "para finalizar a compra.",
      finishPurchase: "FINALIZAR COMPRA"
    },
    navigation: {
      back: "Voltar"
    },
    auth: {
      pageTitle: "AUTENTICAÇÃO",
      pageSubtitle: "ENTRE OU CADASTRE-SE",
      joinTitle: "Faça parte",
      loginTitle: "Entre com sua conta",
      email: "E-mail",
      password: "Senha",
      continue: "CONTINUAR",
      hasAccount: "Já possui uma conta?",
      noAccount: "Não possui uma conta?",
      login: "Entrar",
      signUp: "Cadastre-se"
    },
    common: {
      loading: "Carregando...",
      error: "Erro",
      success: "Sucesso"
    }
  }
};

export type TranslationKey = keyof typeof translations;
export type TranslationValue = typeof translations[TranslationKey];
