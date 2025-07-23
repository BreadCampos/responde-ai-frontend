"use client";

import { useEffect, useMemo, useState } from "react";

// Define a interface para os breakpoints, tornando o hook customizável
interface ScreenSizeBreakpoints {
  mobile: number;
  tablet: number;
}

// Define os breakpoints padrão. 768px para mobile e 1024px para tablet são comuns.
const defaultBreakpoints: ScreenSizeBreakpoints = {
  mobile: 768,
  tablet: 1024,
};

/**
 * Hook customizado para monitorar as dimensões da janela do navegador.
 * Retorna a largura, altura e flags booleanas para diferentes tamanhos de tela.
 * @param {ScreenSizeBreakpoints} breakpoints - Pontos de quebra customizáveis para mobile e tablet.
 */
export const useScreenSize = (
  breakpoints: ScreenSizeBreakpoints = defaultBreakpoints
) => {
  // Guarda o tamanho da tela no estado.
  // Começamos com os valores atuais da janela para evitar um render inicial com 0.
  // A verificação `typeof window !== 'undefined'` garante que o código não quebre no lado do servidor (SSR), onde o objeto `window` não existe.
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Função que será chamada sempre que a janela for redimensionada.
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Adiciona o "ouvinte" de evento 'resize' na janela.
    window.addEventListener("resize", handleResize);

    // Função de limpeza: remove o "ouvinte" quando o componente que usa o hook for desmontado.
    // Isso é crucial para evitar vazamentos de memória.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez (montagem e desmontagem).

  // Usamos useMemo para calcular as flags apenas quando a largura da tela mudar.
  // Isso otimiza a performance, evitando recálculos em cada renderização.
  const isMobile = useMemo(
    () => screenSize.width > 0 && screenSize.width < breakpoints.mobile,
    [screenSize.width, breakpoints.mobile]
  );
  const isTablet = useMemo(
    () =>
      screenSize.width >= breakpoints.mobile &&
      screenSize.width < breakpoints.tablet,
    [screenSize.width, breakpoints.mobile, breakpoints.tablet]
  );
  const isDesktop = useMemo(
    () => screenSize.width >= breakpoints.tablet,
    [screenSize.width, breakpoints.tablet]
  );

  return {
    width: screenSize.width,
    height: screenSize.height,
    isMobile,
    isTablet,
    isDesktop,
  };
};
