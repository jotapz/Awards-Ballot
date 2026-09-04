import { Loader2 } from "lucide-react";

const Carregando = ({ className = "min-h-[60vh]" }) => (
  <div className={`flex items-center justify-center text-[#C9A227] ${className}`}>
    <Loader2 className="size-8 animate-spin" />
  </div>
);

export default Carregando;
