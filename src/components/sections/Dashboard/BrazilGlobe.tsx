/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ============================================
// TIPOS
// ============================================
interface StateData {
  id: string;
  name: string;
  value: number;
}

interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

interface HoveredState {
  id: string;
  name: string;
  value: number;
}

interface Props {
  data: StateData[];
  onStateClick?: (state: StateData) => void;
}

// ============================================
// CONFIG: CORES
// ============================================
const COLORS = {
  globe: "#030712", // Cor base do globo (oceanos/fundo da esfera)
  globeEmissive: "#0E1C43", // Auto-iluminação interna do globo (brilho próprio sutil)
  atmosphere: "#8BA8CC", // Cor do halo atmosférico ao redor do globo

  brazil: { r: 96, g: 165, b: 250 }, // Cor base dos estados BR em RGB (alpha calculado pelo valor)
  brazilHover: { r: 147, g: 197, b: 253 }, // Cor do estado quando o mouse está em cima (mais claro que o base)
  brazilSide: "#030712", // Cor da lateral 3D dos estados (visível quando o Brasil está elevado)
  brazilStroke: "rgba(191, 219, 254, 1)", // Cor da borda/contorno dos estados BR
  brazilStrokeHover: "rgba(255, 255, 255, 1)", // Cor da borda do estado em hover (branca pra destacar)

  world: "#060F27", // Cor de preenchimento dos países que não são o Brasil
  worldStroke: "rgba(96, 165, 250, 0.3)", // Cor da borda dos países não-BR (translúcida)

  arcStart: "rgba(191, 219, 254, 0.9)", // Cor inicial do arco (no ponto de partida — mais brilhante)
  arcEnd: "rgba(96, 165, 250, 0.1)", // Cor final do arco (no ponto de chegada — mais apagada)
};

// ============================================
// CONFIG: ANIMAÇÃO DE ENTRADA
// ============================================
const INTRO = {
  enabled: true, // Liga/desliga toda a animação de entrada (false = pula direto pro Brasil)
  duration: 4500, // Tempo total da câmera viajando até a posição final em ms
  initialAltitude: 4.0, // Distância inicial da câmera (maior = começa mais longe do globo)
  initialLat: -22.5, // Latitude inicial da câmera (igual ao CAMERA = sem movimento vertical)
  initialLng: 30, // Longitude inicial da câmera (offset cria efeito de rotação lateral até chegar no Brasil)
  liftDelay: 200, // Pausa após câmera parar antes dos estados começarem a subir (ms)
  liftAnimationDuration: 600, // Duração da animação de elevação dos estados saindo do globo (ms)
};

// ============================================
// CONFIG: CÂMERA
// ============================================
const CAMERA = {
  lat: -8.5, // Latitude final da câmera (vertical: menos negativo = Brasil mais alto na tela)
  lng: -54.0, // Longitude final da câmera (horizontal: menos negativo = Brasil mais à esquerda)
  altitude: 1.4, // Distância final da câmera (menor = mais zoom no Brasil)
  minDistance: 140, // Limite mínimo de zoom permitido pelo usuário (quão perto pode aproximar)
  maxDistance: 200, // Limite máximo de zoom permitido pelo usuário (quão longe pode afastar)
  damping: 0.1, // Inércia ao arrastar/soltar (menor = mais deslizante, maior = mais travado)
  returnDelay: 800, // Tempo parado antes do globo voltar pro centro após interação do usuário (ms)
  returnDuration: 1000, // Duração da animação de retorno ao centro do Brasil (ms)
};

// ============================================
// CONFIG: GLOBO
// ============================================
const GLOBE = {
  emissiveIntensity: 0.12, // Força do brilho interno do globo (0 = sem brilho, 1 = bem iluminado)
  shininess: 8, // Reflexo da superfície do globo (0 = fosco, 100 = espelhado)
  atmosphereAltitude: 0.22, // Espessura do halo atmosférico (maior = halo mais largo e difuso)
  brazilLift: 0.04, // Altura padrão dos estados BR saindo do globo (efeito 3D de bloco erguido)
  brazilLiftHover: 0.06, // Altura do estado quando hover (maior que o lift normal = sobe mais ao passar o mouse)
};

// ============================================
// CONFIG: POLÍGONOS
// ============================================
const POLYGON = {
  worldAltitude: 0.005, // Altura dos países não-BR sobre a esfera (quase colado pra evitar z-fighting visual)
  alphaBase: 0.25, // Opacidade mínima dos estados BR (estado com menor valor recebe essa opacidade)
  alphaRange: 0.55, // Variação adicional de opacidade pelo valor (estado top: alphaBase + alphaRange)
};

// ============================================
// CONFIG: ARCOS
// ============================================
const ARCS = {
  hubState: "SP", // Sigla do estado de origem dos arcos (centro da rede de conexões)
  dashLength: 0.3, // Tamanho do pulso visível no arco (0.1 = curto, 0.5 = longo, 1 = arco contínuo)
  dashGap: 4, // Espaço entre pulsos sucessivos (menor = mais pulsos simultâneos no arco)
  dashAnimateTime: 2000, // Duração de um ciclo do pulso (menor = pulsos mais rápidos)
  dashInitialGap: 0, // Atraso antes do primeiro pulso aparecer (0 = imediato)
  stroke: 0.1, // Espessura da linha do arco (0.2 = fino, 0.8 = grosso)
  altitudeAutoScale: 1, // Quanto o arco curva pra cima baseado na distância (0 = reto, 1 = arco bem alto)
  altitudeOffset: 0.05, // Altura inicial dos arcos acima do bloco do Brasil (pra não enterrarem nos polígonos elevados)
};

// ============================================
// COORDENADAS DOS ESTADOS
// ============================================
const STATE_COORDINATES: Record<string, [number, number]> = {
  AC: [-70.0, -9.0],
  AL: [-36.6, -9.6],
  AM: [-64.5, -4.5],
  AP: [-52.0, 1.0],
  BA: [-41.5, -12.5],
  CE: [-39.5, -5.5],
  DF: [-47.85, -15.78],
  ES: [-40.5, -19.5],
  GO: [-49.5, -16.0],
  MA: [-45.5, -5.5],
  MG: [-44.5, -18.5],
  MS: [-54.5, -20.5],
  MT: [-55.5, -13.0],
  PA: [-52.5, -4.5],
  PB: [-36.7, -7.2],
  PE: [-37.8, -8.3],
  PI: [-43.0, -7.5],
  PR: [-51.5, -24.5],
  RJ: [-42.5, -22.2],
  RN: [-36.8, -5.7],
  RO: [-63.0, -10.8],
  RR: [-61.5, 2.0],
  RS: [-53.5, -29.8],
  SC: [-50.5, -27.2],
  SE: [-37.4, -10.6],
  SP: [-48.5, -22.0],
  TO: [-48.5, -10.5],
};

// ============================================
// HELPERS
// ============================================
const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

const debounce = <T extends (...args: any[]) => void>(fn: T, ms: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

const geoCache = new Map<string, any>();
const fetchGeoJson = async (url: string) => {
  const cached = geoCache.get(url);
  if (cached) return cached;
  const data = await fetch(url).then((r) => r.json());
  geoCache.set(url, data);
  return data;
};

// ============================================
// COMPONENTE
// ============================================
export function BrazilGlobe({ data, onStateClick }: Props) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [Globe, setGlobe] = useState<any>(null);
  const [arcs, setArcs] = useState<GlobeArc[]>([]);
  const [polygons, setPolygons] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hovered, setHovered] = useState<HoveredState | null>(null);
  const [statesElevated, setStatesElevated] = useState(!INTRO.enabled);

  const hoveredIdRef = useRef<string | null>(null);

  const dataMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of data) map.set(d.id, d.value);
    return map;
  }, [data]);

  const maxValue = useMemo(() => {
    let max = 0;
    for (const d of data) if (d.value > max) max = d.value;
    return max || 1;
  }, [data]);

  const polygonStyleCache = useMemo(() => {
    const cache = new Map<string, { color: string; alpha: number }>();
    for (const [sigla, _] of Object.entries(STATE_COORDINATES)) {
      const value = dataMap.get(sigla) ?? 0;
      const alpha = POLYGON.alphaBase + (value / maxValue) * POLYGON.alphaRange;
      cache.set(sigla, {
        alpha,
        color: `rgba(${COLORS.brazil.r}, ${COLORS.brazil.g}, ${COLORS.brazil.b}, ${alpha})`,
      });
    }
    return cache;
  }, [dataMap, maxValue]);

  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(COLORS.globe),
      emissive: new THREE.Color(COLORS.globeEmissive),
      emissiveIntensity: GLOBE.emissiveIntensity,
      shininess: GLOBE.shininess,
    });
    return material;
  }, []);

  useEffect(() => {
    return () => {
      globeMaterial.dispose();
    };
  }, [globeMaterial]);

  useEffect(() => {
    let mounted = true;
    import("react-globe.gl").then((m) => {
      if (mounted) setGlobe(() => m.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    const debouncedUpdate = debounce(updateSize, 150);
    updateSize();
    window.addEventListener("resize", debouncedUpdate);
    return () => window.removeEventListener("resize", debouncedUpdate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!tooltipRef.current) return;
      tooltipRef.current.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY + 16}px, 0)`;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchGeoJson("/world-countries.geojson"), fetchGeoJson("/brazil-states.geojson")]).then(
      ([world, brazil]) => {
        if (cancelled) return;

        const brazilFeatures = brazil.features.map((f: any) => ({
          ...f,
          properties: { ...f.properties, isBrazilState: true },
        }));

        const worldWithoutBrazil = world.features.filter(
          (f: any) => f.properties.NAME !== "Brazil" && f.properties.ADMIN !== "Brazil",
        );

        const allPolygons = [...worldWithoutBrazil, ...brazilFeatures];

        const hubCoords = STATE_COORDINATES[ARCS.hubState];
        const calculatedArcs: GlobeArc[] = hubCoords
          ? Object.entries(STATE_COORDINATES)
              .filter(([sigla]) => sigla !== ARCS.hubState)
              .map(([, coords]) => ({
                startLat: hubCoords[1],
                startLng: hubCoords[0],
                endLat: coords[1],
                endLng: coords[0],
              }))
          : [];

        setPolygons(allPolygons);
        setArcs(calculatedArcs);
      },
    );

    return () => {
      cancelled = true;
    };
  }, [dataMap]);

  useEffect(() => {
    if (!globeRef.current || !Globe) return;

    const globe = globeRef.current;
    const controls = globe.controls();

    controls.enableDamping = true;
    controls.dampingFactor = CAMERA.damping;
    controls.minDistance = CAMERA.minDistance;
    controls.maxDistance = CAMERA.maxDistance;
    controls.autoRotate = false;

    const finalView = {
      lat: CAMERA.lat,
      lng: CAMERA.lng,
      altitude: CAMERA.altitude,
    };

    let returnTimeout: ReturnType<typeof setTimeout>;
    let liftTimeout: ReturnType<typeof setTimeout>;
    let introActive = false;

    const handleStart = () => {
      if (introActive) introActive = false;
      clearTimeout(returnTimeout);
    };

    const handleEnd = () => {
      if (introActive) return;
      clearTimeout(returnTimeout);
      returnTimeout = setTimeout(() => {
        globe.pointOfView(finalView, CAMERA.returnDuration);
      }, CAMERA.returnDelay);
    };

    controls.addEventListener("start", handleStart);
    controls.addEventListener("end", handleEnd);

    if (INTRO.enabled) {
      introActive = true;
      globe.pointOfView(
        {
          lat: INTRO.initialLat,
          lng: INTRO.initialLng,
          altitude: INTRO.initialAltitude,
        },
        0,
      );

      requestAnimationFrame(() => {
        globe.pointOfView(finalView, INTRO.duration);
      });

      liftTimeout = setTimeout(() => {
        introActive = false;
        setStatesElevated(true);
      }, INTRO.duration + INTRO.liftDelay);
    } else {
      globe.pointOfView(finalView, 0);
    }

    return () => {
      clearTimeout(returnTimeout);
      clearTimeout(liftTimeout);
      controls.removeEventListener("start", handleStart);
      controls.removeEventListener("end", handleEnd);
    };
  }, [Globe]);

  const polygonAltitude = useCallback(
    (feat: any) => {
      if (!feat.properties.isBrazilState) return POLYGON.worldAltitude;
      if (!statesElevated) return POLYGON.worldAltitude;
      return hoveredIdRef.current === feat.properties.sigla ? GLOBE.brazilLiftHover : GLOBE.brazilLift;
    },
    [statesElevated, hovered],
  );

  const polygonCapColor = useCallback(
    (feat: any) => {
      if (!feat.properties.isBrazilState) return COLORS.world;
      const sigla = feat.properties.sigla;
      const cached = polygonStyleCache.get(sigla);
      if (!cached) return COLORS.world;

      if (hoveredIdRef.current === sigla) {
        const hoverAlpha = Math.min(cached.alpha + 0.2, 1);
        return `rgba(${COLORS.brazilHover.r}, ${COLORS.brazilHover.g}, ${COLORS.brazilHover.b}, ${hoverAlpha})`;
      }
      return cached.color;
    },
    [polygonStyleCache, hovered],
  );

  const polygonSideColor = useCallback(
    (feat: any) => (feat.properties.isBrazilState ? COLORS.brazilSide : "rgba(0,0,0,0)"),
    [],
  );

  const polygonStrokeColor = useCallback(
    (feat: any) => {
      if (!feat.properties.isBrazilState) return COLORS.worldStroke;
      return hoveredIdRef.current === feat.properties.sigla ? COLORS.brazilStrokeHover : COLORS.brazilStroke;
    },
    [hovered],
  );

  const arcColor = useMemo(() => () => [COLORS.arcStart, COLORS.arcEnd], []);

  const handlePolygonHover = useCallback(
    (feat: any) => {
      if (!feat || !feat.properties.isBrazilState) {
        if (hoveredIdRef.current !== null) {
          hoveredIdRef.current = null;
          setHovered(null);
          if (containerRef.current) {
            containerRef.current.style.cursor = "default";
          }
        }
        return;
      }

      const sigla = feat.properties.sigla;
      if (hoveredIdRef.current === sigla) return;

      hoveredIdRef.current = sigla;
      const value = dataMap.get(sigla) ?? 0;
      setHovered({ id: sigla, name: feat.properties.name, value });

      if (containerRef.current) {
        containerRef.current.style.cursor = "pointer";
      }
    },
    [dataMap],
  );

  const handlePolygonClick = useCallback(
    (feat: any) => {
      if (!feat || !feat.properties.isBrazilState || !onStateClick) return;
      const sigla = feat.properties.sigla;
      onStateClick({
        id: sigla,
        name: feat.properties.name,
        value: dataMap.get(sigla) ?? 0,
      });
    },
    [dataMap, onStateClick],
  );

  if (!Globe) return null;

  return (
    <div ref={containerRef} className="absolute h-full w-full">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        showAtmosphere
        atmosphereColor={COLORS.atmosphere}
        atmosphereAltitude={GLOBE.atmosphereAltitude}
        polygonsData={polygons}
        polygonAltitude={polygonAltitude}
        polygonCapColor={polygonCapColor}
        polygonSideColor={polygonSideColor}
        polygonStrokeColor={polygonStrokeColor}
        polygonsTransitionDuration={INTRO.liftAnimationDuration}
        onPolygonHover={handlePolygonHover}
        onPolygonClick={handlePolygonClick}
        arcsData={arcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={arcColor}
        arcDashLength={ARCS.dashLength}
        arcDashGap={ARCS.dashGap}
        arcDashAnimateTime={ARCS.dashAnimateTime}
        arcDashInitialGap={ARCS.dashInitialGap}
        arcStroke={ARCS.stroke}
        arcAltitude={GLOBE.brazilLift + ARCS.altitudeOffset}
        arcAltitudeAutoScale={ARCS.altitudeAutoScale}
      />

      <div
        ref={tooltipRef}
        className="pointer-events-none fixed left-0 top-0 z-50 will-change-transform"
        style={{ display: hovered ? "block" : "none" }}
      >
        {hovered && (
          <div className="rounded-md border border-blue-400/40 bg-slate-950/95 px-4 py-3 shadow-lg backdrop-blur-md">
            <div className="text-[10px] font-medium uppercase tracking-[1.5px] text-blue-400">{hovered.id}</div>
            <div className="mt-1 text-sm font-medium text-slate-100">{hovered.name}</div>
            <div className="mt-1.5 text-xs tabular-nums text-blue-300">{formatBRL(hovered.value)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
