"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface StateData {
  id: string;
  name: string;
  value: number;
}

interface GlobePoint {
  lat: number;
  lng: number;
  name: string;
  value: number;
  id: string;
}

interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

interface Props {
  data: StateData[];
}

// Centro visual do Brasil (ajustado pra ficar bonito na tela, não geográfico)
const BRAZIL_VIEW = {
  lat: -12.5,
  lng: -54.0,
  altitude: 0.4,
};

const HUB_STATE = "SP";

// Altura do "relevo" do Brasil saindo do globo
const BRAZIL_LIFT = 0.02;

// === Paleta de cores ===
// Troca o COLOR_PALETTE entre "deepBlue", "midnight", "tactical" pra mudar tudo
const PALETTES = {
  deepBlue: {
    globeColor: "#0a1840",
    globeEmissive: "#1e3a8a",
    globeEmissiveIntensity: 0.12,
    atmosphere: "#60a5fa",
    polygonBR: (alpha: number) => `rgba(96, 165, 250, ${alpha})`,
    polygonBRSide: "rgba(59, 130, 246, 0.6)",
    polygonBRStroke: "rgba(191, 219, 254, 1)",
    polygonWorld: "rgba(30, 64, 175, 0.18)",
    polygonWorldStroke: "rgba(96, 165, 250, 0.3)",
    arcGradient: ["rgba(191,219,254,0.9)", "rgba(96,165,250,0.1)"],
    ringColor: "96, 165, 250",
  },
  midnight: {
    globeColor: "#020617",
    globeEmissive: "#1e3a8a",
    globeEmissiveIntensity: 0.05,
    atmosphere: "#3b82f6",
    polygonBR: (alpha: number) => `rgba(59, 130, 246, ${alpha})`,
    polygonBRSide: "rgba(37, 99, 235, 0.7)",
    polygonBRStroke: "rgba(147, 197, 253, 1)",
    polygonWorld: "rgba(30, 58, 138, 0.12)",
    polygonWorldStroke: "rgba(96, 165, 250, 0.25)",
    arcGradient: ["rgba(147,197,253,0.8)", "rgba(96,165,250,0.1)"],
    ringColor: "96, 165, 250",
  },
  tactical: {
    globeColor: "#0a1f1a",
    globeEmissive: "#0f766e",
    globeEmissiveIntensity: 0.08,
    atmosphere: "#5eead4",
    polygonBR: (alpha: number) => `rgba(45, 212, 191, ${alpha})`,
    polygonBRSide: "rgba(20, 184, 166, 0.7)",
    polygonBRStroke: "rgba(153, 246, 228, 1)",
    polygonWorld: "rgba(15, 118, 110, 0.15)",
    polygonWorldStroke: "rgba(94, 234, 212, 0.3)",
    arcGradient: ["rgba(153,246,228,0.8)", "rgba(45,212,191,0.1)"],
    ringColor: "45, 212, 191",
  },
};

const COLOR_PALETTE = PALETTES.midnight; // ← muda aqui pra trocar o tema

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

function getStatePoint(feature: any): [number, number] {
  const sigla = feature.properties.sigla;
  return STATE_COORDINATES[sigla] ?? [0, 0];
}

export function BrazilGlobe({ data }: Props) {
  const globeRef = useRef<any>(null);
  const [Globe, setGlobe] = useState<any>(null);
  const [points, setPoints] = useState<GlobePoint[]>([]);
  const [arcs, setArcs] = useState<GlobeArc[]>([]);
  const [polygons, setPolygons] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const globeMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(COLOR_PALETTE.globeColor),
      emissive: new THREE.Color(COLOR_PALETTE.globeEmissive),
      emissiveIntensity: COLOR_PALETTE.globeEmissiveIntensity,
      shininess: 8,
    });
  }, []);

  const maxValue = useMemo(() => {
    return Math.max(...data.map((d) => d.value));
  }, [data]);

  useEffect(() => {
    import("react-globe.gl").then((m) => setGlobe(() => m.default));
  }, []);

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("/world-countries.geojson").then((r) => r.json()),
      fetch("/brazil-states.geojson").then((r) => r.json()),
    ]).then(([world, brazil]) => {
      const brazilFeatures = brazil.features.map((f: any) => ({
        ...f,
        properties: { ...f.properties, isBrazilState: true },
      }));

      const worldWithoutBrazil = world.features.filter(
        (f: any) =>
          f.properties.NAME !== "Brazil" && f.properties.ADMIN !== "Brazil",
      );

      setPolygons([...worldWithoutBrazil, ...brazilFeatures]);

      const calculated: GlobePoint[] = brazil.features.map((f: any) => {
        const [lng, lat] = getStatePoint(f);
        const sigla = f.properties.sigla;
        const match = data.find((d) => d.id === sigla);
        return {
          lat,
          lng,
          id: sigla,
          name: f.properties.name,
          value: match?.value ?? 0,
        };
      });
      setPoints(calculated);

      const hub = calculated.find((p) => p.id === HUB_STATE);
      if (hub) {
        const generatedArcs: GlobeArc[] = calculated
          .filter((p) => p.id !== HUB_STATE)
          .map((p) => ({
            startLat: hub.lat,
            startLng: hub.lng,
            endLat: p.lat,
            endLng: p.lng,
          }));
        setArcs(generatedArcs);
      }
    });
  }, [data]);

  useEffect(() => {
    if (!globeRef.current || !Globe) return;

    const globe = globeRef.current;
    const controls = globe.controls();

    controls.autoRotate = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.15;
    controls.minDistance = 180;
    controls.maxDistance = 400;

    globe.pointOfView(BRAZIL_VIEW, 0);

    let returnTimeout: NodeJS.Timeout;

    const handleStart = () => clearTimeout(returnTimeout);
    const handleEnd = () => {
      clearTimeout(returnTimeout);
      returnTimeout = setTimeout(() => {
        globe.pointOfView(BRAZIL_VIEW, 1000);
      }, 800);
    };

    controls.addEventListener("start", handleStart);
    controls.addEventListener("end", handleEnd);

    return () => {
      clearTimeout(returnTimeout);
      controls.removeEventListener("start", handleStart);
      controls.removeEventListener("end", handleEnd);
    };
  }, [Globe]);

  if (!Globe) return null;

  return (
    <Globe
      ref={globeRef}
      width={dimensions.width}
      height={dimensions.height}
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={globeMaterial}
      showAtmosphere={true}
      atmosphereColor={COLOR_PALETTE.atmosphere}
      atmosphereAltitude={0.22}
      polygonsData={polygons}
      // Brasil sai do globo, resto fica colado
      polygonAltitude={(feat: any) =>
        feat.properties.isBrazilState ? BRAZIL_LIFT : 0.005
      }
      polygonCapColor={(feat: any) => {
        if (!feat.properties.isBrazilState) {
          return COLOR_PALETTE.polygonWorld;
        }
        const sigla = feat.properties.sigla;
        const stateData = data.find((d) => d.id === sigla);
        const value = stateData?.value ?? 0;
        const intensity = value / maxValue;
        const alpha = 0.25 + intensity * 0.55;
        return COLOR_PALETTE.polygonBR(alpha);
      }}
      // Lateral do bloco erguido (cria a sensação 3D)
      polygonSideColor={(feat: any) =>
        feat.properties.isBrazilState
          ? COLOR_PALETTE.polygonBRSide
          : "rgba(0,0,0,0)"
      }
      polygonStrokeColor={(feat: any) =>
        feat.properties.isBrazilState
          ? COLOR_PALETTE.polygonBRStroke
          : COLOR_PALETTE.polygonWorldStroke
      }
      polygonsTransitionDuration={300}
      // Anéis pulsando (em altitude pra ficar acima do bloco erguido)
      ringsData={points}
      ringLat="lat"
      ringLng="lng"
      ringAltitude={BRAZIL_LIFT + 0.001}
      ringColor={() => (t: number) =>
        `rgba(${COLOR_PALETTE.ringColor}, ${1 - t})`
      }
      ringMaxRadius={2.5}
      ringPropagationSpeed={1.5}
      ringRepeatPeriod={5000}
      // Arcos saindo do bloco erguido
      arcsData={arcs}
      arcStartLat="startLat"
      arcStartLng="startLng"
      arcEndLat="endLat"
      arcEndLng="endLng"
      arcColor={() => COLOR_PALETTE.arcGradient}
      arcDashLength={0.3}
      arcDashGap={3}
      arcDashAnimateTime={1800}
      arcDashInitialGap={0}
      arcStroke={0.1}
      arcAltitude={BRAZIL_LIFT + 0.05}
      arcAltitudeAutoScale={0.3}
      // Marcadores em altitude do bloco
      htmlElementsData={points}
      htmlLat="lat"
      htmlLng="lng"
      htmlAltitude={BRAZIL_LIFT + 0.002}
      htmlElement={(d: any) => {
        const el = document.createElement("div");
        el.className = "globe-marker";
        const intensity = d.value / maxValue;
        el.style.setProperty("--marker-intensity", String(intensity));
        el.innerHTML = `
          <div class="globe-marker-beam"></div>
          <div class="globe-marker-dot"></div>
          <div class="globe-marker-tooltip">
            <div class="globe-marker-id">${d.id}</div>
            <div class="globe-marker-name">${d.name}</div>
            <div class="globe-marker-value">
              ${d.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
        `;
        el.addEventListener("click", () => {
          console.log("Clicou em:", d);
        });
        return el;
      }}
    />
  );
}
