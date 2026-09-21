export default function WeatherVisual({
  condition = 'Sunny',
  isNight = false,
  icon = '',
  conditionCode = ''
}) {
  const norm = (condition || '').toLowerCase().trim();
  const iconStr = (icon || '').toLowerCase().trim();
  const code = (conditionCode || '').toLowerCase().trim();

  // Determine if it is nighttime
  const night = Boolean(
    isNight ||
    iconStr.endsWith('n') ||
    code.includes('night') ||
    norm.includes('night')
  );

  // Condition classification
  const isStorm =
    norm.includes('thunder') ||
    norm.includes('storm') ||
    norm.includes('lightning') ||
    code.includes('storm') ||
    iconStr.startsWith('11');

  const isSnow =
    !isStorm && (
      norm.includes('snow') ||
      norm.includes('flurry') ||
      norm.includes('ice') ||
      norm.includes('sleet') ||
      code.includes('snow') ||
      iconStr.startsWith('13')
    );

  const isRain =
    !isStorm &&
    !isSnow && (
      norm.includes('rain') ||
      norm.includes('drizzle') ||
      code.includes('rain') ||
      code.includes('drizzle') ||
      iconStr.startsWith('09') ||
      iconStr.startsWith('10')
    );

  const isDrizzle = isRain && (norm.includes('drizzle') || code.includes('drizzle'));

  const isFog =
    !isStorm &&
    !isSnow &&
    !isRain && (
      norm.includes('fog') ||
      norm.includes('mist') ||
      norm.includes('haze') ||
      norm.includes('smoke') ||
      norm.includes('dust') ||
      code.includes('fog') ||
      iconStr.startsWith('50')
    );

  const isPartly =
    !isStorm &&
    !isSnow &&
    !isRain &&
    !isFog && (
      norm.includes('partly') ||
      norm.includes('few') ||
      norm.includes('scattered') ||
      code.includes('partly') ||
      iconStr.startsWith('02') ||
      iconStr.startsWith('03')
    );

  const isCloudy =
    !isStorm &&
    !isSnow &&
    !isRain &&
    !isFog &&
    !isPartly && (
      norm.includes('cloud') ||
      norm.includes('overcast') ||
      code.includes('cloud') ||
      iconStr.startsWith('04')
    );

  const isClear =
    !isStorm &&
    !isSnow &&
    !isRain &&
    !isFog &&
    !isPartly &&
    !isCloudy;

  return (
    <div className="weather-visual-container" aria-hidden="true">
      <svg
        className="weather-visual-svg"
        viewBox="0 0 360 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Sun Gradients */}
          <radialGradient id="sunGlow" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fff9c4" />
            <stop offset="25%" stopColor="#fdd835" />
            <stop offset="60%" stopColor="#f57f17" />
            <stop offset="90%" stopColor="#e65100" />
            <stop offset="100%" stopColor="#bf360c" />
          </radialGradient>

          <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.45)" />
            <stop offset="40%" stopColor="rgba(245, 158, 11, 0.25)" />
            <stop offset="70%" stopColor="rgba(217, 119, 6, 0.1)" />
            <stop offset="100%" stopColor="rgba(180, 83, 9, 0)" />
          </radialGradient>

          {/* Moon Gradients */}
          <radialGradient id="moonGlow" cx="42%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#e2e8f0" />
            <stop offset="60%" stopColor="#94a3b8" />
            <stop offset="85%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>

          <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(186, 230, 253, 0.4)" />
            <stop offset="40%" stopColor="rgba(147, 197, 253, 0.2)" />
            <stop offset="70%" stopColor="rgba(99, 102, 241, 0.08)" />
            <stop offset="100%" stopColor="rgba(30, 58, 138, 0)" />
          </radialGradient>

          {/* Cloud Gradients */}
          <linearGradient id="cloudFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
            <stop offset="50%" stopColor="rgba(226, 232, 240, 0.65)" />
            <stop offset="100%" stopColor="rgba(148, 163, 184, 0.4)" />
          </linearGradient>

          <linearGradient id="cloudBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(203, 213, 225, 0.45)" />
            <stop offset="100%" stopColor="rgba(100, 116, 139, 0.2)" />
          </linearGradient>

          {/* Overcast Cloud Gradients */}
          <linearGradient id="overcastGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.7)" />
            <stop offset="60%" stopColor="rgba(100, 116, 139, 0.75)" />
            <stop offset="100%" stopColor="rgba(51, 65, 85, 0.8)" />
          </linearGradient>

          <linearGradient id="overcastGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(203, 213, 225, 0.65)" />
            <stop offset="60%" stopColor="rgba(148, 163, 184, 0.65)" />
            <stop offset="100%" stopColor="rgba(71, 85, 105, 0.75)" />
          </linearGradient>

          {/* Storm Cloud Gradient */}
          <linearGradient id="stormCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Mountain Gradients */}
          <linearGradient id="mountainBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="mountainMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#182234" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0d1522" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="mountainFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#101927" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a0f18" stopOpacity="1" />
          </linearGradient>

          {/* Fog Layer Gradients */}
          <linearGradient id="fogGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(203, 213, 225, 0)" />
            <stop offset="25%" stopColor="rgba(226, 232, 240, 0.35)" />
            <stop offset="70%" stopColor="rgba(203, 213, 225, 0.3)" />
            <stop offset="100%" stopColor="rgba(148, 163, 184, 0)" />
          </linearGradient>

          <linearGradient id="fogGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0)" />
            <stop offset="35%" stopColor="rgba(203, 213, 225, 0.25)" />
            <stop offset="75%" stopColor="rgba(226, 232, 240, 0.3)" />
            <stop offset="100%" stopColor="rgba(203, 213, 225, 0)" />
          </linearGradient>

          {/* Filters */}
          <filter id="sunBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="moonBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="mistBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          <filter id="cloudSoftBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>

          <filter id="lightningGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#fef08a" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* ========================================================= */}
        {/* 1. CLEAR DAY OR PARTLY CLOUDY DAY: Radiant Sun */}
        {/* ========================================================= */}
        {(isClear || isPartly) && !night && (
          <>
            <ellipse cx="220" cy="90" rx="130" ry="110" fill="url(#sunHalo)" />
            <g className="sun-group" filter="url(#sunBlur)">
              <circle cx="215" cy="85" r="54" fill="url(#sunHalo)" />
              <circle cx="215" cy="85" r="44" fill="url(#sunGlow)" />
              <circle cx="204" cy="74" r="16" fill="rgba(255, 255, 255, 0.4)" filter="blur(4px)" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* 2. CLEAR NIGHT OR PARTLY CLOUDY NIGHT: Glowing Moon & Stars */}
        {/* ========================================================= */}
        {(isClear || isPartly) && night && (
          <>
            <ellipse cx="220" cy="85" rx="125" ry="105" fill="url(#moonHalo)" />

            {/* Subtle twinkling night stars */}
            <g className="starry-sky" opacity="0.85">
              <circle cx="110" cy="45" r="1.5" fill="#ffffff" opacity="0.8" />
              <circle cx="145" cy="70" r="1" fill="#93c5fd" opacity="0.6" />
              <circle cx="170" cy="30" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="280" cy="40" r="1.5" fill="#ffffff" opacity="0.85" />
              <circle cx="310" cy="65" r="1" fill="#bae6fd" opacity="0.7" />
              <circle cx="295" cy="115" r="1.8" fill="#ffffff" opacity="0.75" />
              <circle cx="130" cy="120" r="1.2" fill="#93c5fd" opacity="0.6" />
              {/* Star cross twinkle at (170, 30) */}
              <line x1="170" y1="26" x2="170" y2="34" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
              <line x1="166" y1="30" x2="174" y2="30" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
            </g>

            {/* Glowing lunar sphere */}
            <g className="moon-group" filter="url(#moonBlur)">
              <circle cx="215" cy="85" r="50" fill="url(#moonHalo)" />
              <circle cx="215" cy="85" r="42" fill="url(#moonGlow)" />
              {/* Soft crater details */}
              <ellipse cx="205" cy="78" rx="8" ry="6" fill="#475569" opacity="0.25" />
              <ellipse cx="226" cy="94" rx="10" ry="7" fill="#475569" opacity="0.22" />
              <ellipse cx="212" cy="100" rx="6" ry="5" fill="#475569" opacity="0.18" />
              {/* Lunar edge light */}
              <circle cx="205" cy="77" r="14" fill="rgba(255, 255, 255, 0.35)" filter="blur(3px)" />
            </g>
          </>
        )}

        {/* ========================================================= */}
        {/* 3. PARTLY CLOUDY WISPS (Day or Night) */}
        {/* ========================================================= */}
        {isPartly && (
          <g className="cloud-wisps" opacity="0.95">
            <ellipse cx="245" cy="98" rx="55" ry="18" fill="url(#cloudBackGrad)" filter="url(#mistBlur)" />
            <circle cx="215" cy="96" r="22" fill="url(#cloudFrontGrad)" filter="url(#cloudSoftBlur)" />
            <circle cx="245" cy="94" r="26" fill="url(#cloudFrontGrad)" filter="url(#cloudSoftBlur)" />
            <circle cx="270" cy="100" r="18" fill="url(#cloudFrontGrad)" filter="url(#cloudSoftBlur)" />
            <ellipse cx="240" cy="104" rx="48" ry="14" fill="url(#cloudFrontGrad)" filter="url(#cloudSoftBlur)" />
          </g>
        )}

        {/* Subtle wisps for clear day */}
        {isClear && !night && (
          <g className="cloud-wisps-subtle" opacity="0.45">
            <ellipse cx="245" cy="108" rx="50" ry="14" fill="url(#cloudBackGrad)" filter="url(#mistBlur)" />
            <circle cx="235" cy="105" r="18" fill="url(#cloudFrontGrad)" filter="url(#cloudSoftBlur)" />
            <ellipse cx="250" cy="110" rx="40" ry="12" fill="url(#cloudFrontGrad)" filter="url(#cloudSoftBlur)" />
          </g>
        )}

        {/* ========================================================= */}
        {/* 4. CLOUDY / OVERCAST: Volumetric Cloud Layers (No Sun/Moon) */}
        {/* ========================================================= */}
        {isCloudy && (
          <g className="overcast-cloud-group">
            {/* Diffuse ambient sky glow */}
            <ellipse cx="220" cy="90" rx="130" ry="80" fill="rgba(148, 163, 184, 0.15)" filter="url(#mistBlur)" />

            {/* Back cloud billows */}
            <circle cx="150" cy="95" r="42" fill="url(#overcastGrad1)" filter="blur(4px)" />
            <circle cx="210" cy="78" r="54" fill="url(#overcastGrad1)" filter="blur(4px)" />
            <circle cx="270" cy="90" r="46" fill="url(#overcastGrad1)" filter="blur(4px)" />

            {/* Mid cloud billows */}
            <circle cx="170" cy="92" r="38" fill="url(#overcastGrad2)" />
            <circle cx="225" cy="75" r="46" fill="url(#cloudFrontGrad)" />
            <circle cx="275" cy="85" r="36" fill="url(#overcastGrad2)" />
            <circle cx="130" cy="105" r="30" fill="url(#overcastGrad1)" />

            {/* Front soft cloud base */}
            <ellipse cx="210" cy="108" rx="80" ry="24" fill="url(#cloudFrontGrad)" filter="url(#cloudSoftBlur)" />
            <ellipse cx="255" cy="114" rx="60" ry="20" fill="url(#overcastGrad2)" filter="url(#cloudSoftBlur)" />
          </g>
        )}

        {/* ========================================================= */}
        {/* 5. RAIN / DRIZZLE: Rain Clouds & Slanted Falling Rain */}
        {/* ========================================================= */}
        {isRain && (
          <g className="rain-group">
            {/* Rain storm clouds */}
            <ellipse cx="210" cy="80" rx="80" ry="44" fill="rgba(30, 41, 59, 0.8)" filter="blur(5px)" />
            <circle cx="165" cy="82" r="38" fill="url(#stormCloudGrad)" />
            <circle cx="215" cy="72" r="48" fill="url(#stormCloudGrad)" />
            <circle cx="265" cy="85" r="36" fill="url(#stormCloudGrad)" />
            <ellipse cx="220" cy="96" rx="65" ry="20" fill="rgba(51, 65, 85, 0.9)" />

            {/* Falling rain streaks */}
            <g stroke="#38bdf8" strokeWidth={isDrizzle ? 1.6 : 2.4} strokeLinecap="round" opacity="0.85">
              <line x1="150" y1="120" x2="140" y2="152" opacity="0.6" />
              <line x1="172" y1="116" x2="162" y2="154" />
              <line x1="194" y1="122" x2="184" y2="160" />
              <line x1="216" y1="115" x2="206" y2="156" />
              <line x1="238" y1="120" x2="228" y2="162" />
              <line x1="260" y1="118" x2="250" y2="155" />
              <line x1="282" y1="124" x2="272" y2="158" opacity="0.7" />

              {/* Staggered second tier */}
              <line x1="162" y1="160" x2="154" y2="190" opacity="0.6" />
              <line x1="184" y1="166" x2="176" y2="196" opacity="0.75" />
              <line x1="206" y1="162" x2="198" y2="194" opacity="0.8" />
              <line x1="228" y1="168" x2="220" y2="200" opacity="0.75" />
              <line x1="250" y1="164" x2="242" y2="195" opacity="0.65" />
            </g>

            {/* Rain mist splash near mountain line */}
            <ellipse cx="210" cy="195" rx="80" ry="12" fill="rgba(56, 189, 248, 0.15)" filter="url(#mistBlur)" />
          </g>
        )}

        {/* ========================================================= */}
        {/* 6. THUNDERSTORM: Dark Stormheads & Branched Lightning */}
        {/* ========================================================= */}
        {isStorm && (
          <g className="storm-group">
            {/* Ambient lightning flash glow */}
            <ellipse cx="215" cy="80" rx="90" ry="60" fill="rgba(168, 85, 247, 0.28)" filter="blur(16px)" />

            {/* Heavy thunderheads */}
            <ellipse cx="210" cy="78" rx="85" ry="46" fill="#0f172a" filter="blur(6px)" />
            <circle cx="160" cy="80" r="40" fill="#1e1b4b" />
            <circle cx="210" cy="68" r="50" fill="#1e293b" />
            <circle cx="265" cy="82" r="38" fill="#312e81" />
            <ellipse cx="215" cy="95" rx="72" ry="22" fill="#1e293b" />

            {/* Dynamic branched lightning bolt */}
            <g filter="url(#lightningGlow)">
              <path
                d="M 215 88 L 205 116 L 222 120 L 198 162 L 204 165 L 188 198"
                stroke="#fef08a"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 205 116 L 190 134"
                stroke="#fde047"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />
            </g>

            {/* Storm rain streaks */}
            <g stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" opacity="0.8">
              <line x1="150" y1="126" x2="138" y2="160" />
              <line x1="175" y1="122" x2="163" y2="158" />
              <line x1="240" y1="125" x2="228" y2="162" />
              <line x1="265" y1="128" x2="253" y2="164" />
              <line x1="285" y1="130" x2="273" y2="166" opacity="0.7" />
            </g>
          </g>
        )}

        {/* ========================================================= */}
        {/* 7. SNOW: Soft Winter Clouds & Drifting Snowflakes */}
        {/* ========================================================= */}
        {isSnow && (
          <g className="snow-group">
            {/* Soft cool halo */}
            <ellipse cx="220" cy="90" rx="120" ry="90" fill="rgba(186, 230, 253, 0.16)" filter="url(#mistBlur)" />

            {/* Pale winter clouds */}
            <circle cx="165" cy="80" r="36" fill="url(#cloudFrontGrad)" opacity="0.7" filter="url(#cloudSoftBlur)" />
            <circle cx="215" cy="72" r="44" fill="url(#cloudFrontGrad)" opacity="0.85" filter="url(#cloudSoftBlur)" />
            <circle cx="265" cy="82" r="34" fill="url(#cloudFrontGrad)" opacity="0.75" filter="url(#cloudSoftBlur)" />

            {/* Drifting soft snowflakes */}
            <g fill="#ffffff">
              <circle cx="165" cy="98" r="3.5" opacity="0.9" filter="blur(0.5px)" />
              <circle cx="205" cy="115" r="2.5" opacity="0.85" />
              <circle cx="240" cy="92" r="3" opacity="0.9" />
              <circle cx="185" cy="138" r="2" fill="#bae6fd" opacity="0.8" />
              <circle cx="265" cy="120" r="3.5" opacity="0.85" />
              <circle cx="285" cy="98" r="2" opacity="0.75" />
              <circle cx="145" cy="142" r="3" opacity="0.8" />
              <circle cx="225" cy="155" r="2.5" opacity="0.85" />
              <circle cx="275" cy="165" r="2" fill="#bae6fd" opacity="0.8" />
              <circle cx="195" cy="180" r="3" opacity="0.7" />
              <circle cx="245" cy="185" r="2.5" opacity="0.75" />
            </g>

            {/* Snowflake crystal crosses */}
            <g stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.85">
              <line x1="205" y1="111" x2="205" y2="119" />
              <line x1="201" y1="115" x2="209" y2="115" />

              <line x1="265" y1="116" x2="265" y2="124" />
              <line x1="261" y1="120" x2="269" y2="120" />

              <line x1="145" y1="138" x2="145" y2="146" />
              <line x1="141" y1="142" x2="149" y2="142" />
            </g>
          </g>
        )}

        {/* ========================================================= */}
        {/* 8. MIST / FOG / HAZE / SMOKE: Horizontal Atmospheric Mist */}
        {/* ========================================================= */}
        {isFog && (
          <g className="fog-group">
            {/* Diffused glow (warm amber if daytime, cool moonlit blue if night) */}
            <ellipse
              cx="220"
              cy="95"
              rx="125"
              ry="80"
              fill={night ? 'rgba(147, 197, 253, 0.12)' : 'rgba(251, 191, 36, 0.14)'}
              filter="url(#mistBlur)"
            />

            {/* Multiple drifting fog banks */}
            <rect x="70" y="68" width="240" height="24" rx="12" fill="url(#fogGrad1)" filter="url(#mistBlur)" />
            <rect x="110" y="96" width="230" height="28" rx="14" fill="url(#fogGrad2)" filter="url(#mistBlur)" />
            <rect x="50" y="128" width="290" height="26" rx="13" fill="url(#fogGrad1)" filter="url(#mistBlur)" />
            <rect x="90" y="158" width="250" height="30" rx="15" fill="url(#fogGrad2)" filter="url(#mistBlur)" />
            <rect x="40" y="188" width="310" height="34" rx="17" fill="url(#fogGrad1)" filter="url(#mistBlur)" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MOUNTAIN SILHOUETTES (Preserved across all weather themes) */}
        {/* ========================================================= */}
        <path
          d="M60 210 Q 120 150 180 180 T 290 145 T 380 175 L 380 260 L 60 260 Z"
          fill="url(#mountainBack)"
        />

        <path
          d="M40 220 Q 110 170 170 195 T 280 168 T 370 188 L 370 260 L 40 260 Z"
          fill="url(#mountainMid)"
        />

        <path
          d="M20 232 Q 90 190 160 212 T 265 190 T 360 205 L 360 260 L 20 260 Z"
          fill="url(#mountainFront)"
        />

        <rect
          x="0"
          y="230"
          width="360"
          height="30"
          fill="url(#mountainFront)"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
