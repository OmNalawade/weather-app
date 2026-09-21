/**
 * TemperatureGraph creates a lightweight, smooth SVG spline line chart
 * with a glowing soft gradient fill and glowing vertex nodes.
 */
export default function TemperatureGraph({ hourlyData = [] }) {
  if (!hourlyData || hourlyData.length === 0) return null;

  const totalPoints = hourlyData.length;
  const svgWidth = 1000;
  const svgHeight = 90;
  const paddingTop = 24;
  const paddingBottom = 26;

  const temps = hourlyData.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = Math.max(maxTemp - minTemp, 1);

  // Calculate coordinates for each point
  const points = hourlyData.map((item, index) => {
    const x = ((index + 0.5) / totalPoints) * svgWidth;
    const normalized = (item.temp - minTemp) / tempRange;
    // higher temp = lower y (higher in SVG)
    const y = svgHeight - paddingBottom - normalized * (svgHeight - paddingTop - paddingBottom);
    return { x, y, temp: item.temp };
  });

  // Generate smooth cubic bezier curve through points
  const getSplinePath = (pts) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let path = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i !== pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    return path;
  };

  const linePath = getSplinePath(points);
  const firstX = points[0].x;
  const lastX = points[points.length - 1].x;
  const fillAreaPath = `${linePath} L ${lastX} ${svgHeight} L ${firstX} ${svgHeight} Z`;

  return (
    <div className="temperature-graph-wrapper">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="temperature-graph-svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle gradient fill under curve */}
          <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </linearGradient>

          {/* Stroke line glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#38bdf8" floodOpacity="0.6" />
          </filter>

          {/* Node point glow */}
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#60a5fa" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Shaded Area Under Line */}
        <path d={fillAreaPath} fill="url(#curveGradient)" />

        {/* Main Spline Curve */}
        <path
          d={linePath}
          fill="none"
          stroke="#5b93d3"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Vertex Glow Nodes */}
        {points.map((pt, idx) => (
          <g key={`pt-${idx}`}>
            {/* Outer halo */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r="6"
              fill="#60a5fa"
              fillOpacity="0.3"
            />
            {/* Core dot */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#ffffff"
              stroke="#3b82f6"
              strokeWidth="2"
              filter="url(#dotGlow)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
