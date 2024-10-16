import { Badge } from "./ui/badge";

const getStatusLabel = (stock: number) => {
  if (stock > 0) {
    return "Em estoque";
  }
  return "Esgotado";
};

interface ProductStatusBadgeProps {
  stock: number;
}

const ProductStatusBadge = ({ stock }: ProductStatusBadgeProps) => {
  const label = getStatusLabel(stock);
  return (
    <Badge
      variant={label === "Em estoque" ? "default" : "outline"}
      className="gap-1.5"
    >
      {label}
    </Badge>
  );
};

export default ProductStatusBadge;
