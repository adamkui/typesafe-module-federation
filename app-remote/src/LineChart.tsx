import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function DarkLineChart({
  clicksData = [6500, 6418, 6456, 6526, 6356, 6456],
  cpcData = [6456, 6356, 6526, 6332, 6418, 6500],
  categories = ["01 Feb", "02 Feb", "03 Feb", "04 Feb", "05 Feb", "06 Feb"],
  height = 260,
}: {
  clicksData?: number[];
  cpcData?: number[];
  categories?: string[];
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);

    const w = container.clientWidth;
    const h = height;

    svg.attr("viewBox", `0 0 ${w} ${h}`).attr("width", w).attr("height", h);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 10, bottom: 20, left: 10 };
    const innerW = w - margin.left - margin.right;
    const innerH = h - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X and Y scales
    const x = d3
      .scaleLinear()
      .domain([0, categories.length - 1])
      .range([0, innerW]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max([...clicksData, ...cpcData])! * 1.1])
      .range([innerH, 0]);

    // Gradient for clicks
    const defs = svg.append("defs");
    const clicksGradient = defs
      .append("linearGradient")
      .attr("id", "clicksGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    clicksGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#4f46e5")
      .attr("stop-opacity", 0.55);
    clicksGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#4f46e5")
      .attr("stop-opacity", 0);

    // Gradient for CPC
    const cpcGradient = defs
      .append("linearGradient")
      .attr("id", "cpcGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    cpcGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#22c55e")
      .attr("stop-opacity", 0.55);
    cpcGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#22c55e")
      .attr("stop-opacity", 0);

    // Line generator
    const lineGen = (data: number[]) =>
      d3
        .line<number>()
        .x((_, i) => x(i))
        .y((d) => y(d))
        .curve(d3.curveMonotoneX)(data);

    // Area generator
    const areaGen = (data: number[], gradientId: string) =>
      d3
        .area<number>()
        .x((_, i) => x(i))
        .y0(innerH)
        .y1((d) => y(d))
        .curve(d3.curveMonotoneX);

    // Clicks area + line
    g.append("path")
      .datum(clicksData)
      .attr("d", areaGen(clicksData, "clicksGradient"))
      .attr("fill", "url(#clicksGradient)");
    g.append("path")
      .datum(clicksData)
      .attr("d", lineGen(clicksData))
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 4)
      .attr("fill", "none");

    // CPC area + line
    g.append("path")
      .datum(cpcData)
      .attr("d", areaGen(cpcData, "cpcGradient"))
      .attr("fill", "url(#cpcGradient)");
    g.append("path")
      .datum(cpcData)
      .attr("d", lineGen(cpcData))
      .attr("stroke", "#22c55e")
      .attr("stroke-width", 4)
      .attr("fill", "none");

    // Hover interaction
    const overlay = g
      .append("rect")
      .attr("width", innerW)
      .attr("height", innerH)
      .attr("fill", "transparent")
      .style("cursor", "crosshair");

    overlay
      .on("mousemove", (event) => {
        const [mx] = d3.pointer(event);
        const idx = Math.round(x.invert(mx));
        if (idx < 0 || idx >= categories.length) return;

        tooltip
          .style("display", "block")
          .style("left", `${x(idx) + margin.left + 10}px`)
          .style(
            "top",
            `${y(Math.max(clicksData[idx], cpcData[idx])) + margin.top - 30}px`
          ).html(`
            <div class="text-xs text-gray-400">${categories[idx]}</div>
            <div class="text-sm font-semibold text-indigo-500">Clicks: ${clicksData[idx]}</div>
            <div class="text-sm font-semibold text-green-500">CPC: $${cpcData[idx]}</div>
          `);
      })
      .on("mouseleave", () => {
        tooltip.style("display", "none");
      });
  }, [clicksData, cpcData, categories, height]);

  return (
    <div className="max-w-sm w-full bg-gradient-to-b from-black via-[#0d1a36] to-[#0d1a36] border border-gray-700 rounded-2xl shadow-lg p-4 md:p-6">
      <div className="flex justify-between mb-4 md:mb-6">
        <div className="grid gap-4 grid-cols-2">
          <div>
            <h5 className="inline-flex items-center text-gray-400">Clicks</h5>
            <p className="text-white text-2xl font-semibold">42,3k</p>
          </div>
          <div>
            <h5 className="inline-flex items-center text-gray-400">CPC</h5>
            <p className="text-white text-2xl font-semibold">$5.40</p>
          </div>
        </div>
        <div>
          <button className="inline-flex items-center text-gray-300 bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm px-3 py-2">
            Last week
          </button>
        </div>
      </div>
      <div ref={containerRef} className="relative w-full h-[260px]">
        <svg ref={svgRef} className="w-full h-full"></svg>
        <div
          ref={tooltipRef}
          className="absolute z-50 hidden pointer-events-none px-3 py-2 rounded-md shadow-lg text-left
          bg-gray-900/90 border border-gray-700 backdrop-blur"
        />
      </div>
      <div className="items-center border-t border-gray-700 mt-4 md:mt-6 pt-4 md:pt-6">
        <button className="inline-flex items-center text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-3 py-2">
          View full report
        </button>
      </div>
    </div>
  );
}
