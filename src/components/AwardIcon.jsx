import Estatueta from "@/images/estatueta.svg";
import Gramofone from "@/images/gramofone.svg";
import GoldenGlobe from "@/images/golden-globe.svg";

const ICONS = {
  estatueta: Estatueta,
  gramofone: Gramofone,
  "golden-globe": GoldenGlobe,
};

/**
 * O icone e desenhado como mascara CSS em vez de <Image>, entao ele herda a cor
 * do texto do elemento pai e pode mudar de cor no hover.
 */
const AwardIcon = ({ icon, alt, size = 24, className }) => {
  const arquivo = (ICONS[icon] ?? Estatueta).src;

  return (
    <span
      role={alt ? "img" : "presentation"}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${arquivo})`,
        maskImage: `url(${arquivo})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
};

export default AwardIcon;
