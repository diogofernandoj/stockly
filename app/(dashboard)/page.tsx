import {
  DollarSignIcon,
  HandCoinsIcon,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";

const DashboardPage = () => {
  return (
    <div className="m-8 w-full space-y-8 overflow-auto rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão Geral</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard>
          <SummaryCardIcon>{<DollarSignIcon size={24} />}</SummaryCardIcon>
          <SummaryCardTitle>Receita total</SummaryCardTitle>
          <SummaryCardValue>R$ 45.000,00</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>{<DollarSignIcon size={24} />}</SummaryCardIcon>
          <SummaryCardTitle>Receita hoje</SummaryCardTitle>
          <SummaryCardValue>R$ 5.000,00</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SummaryCard>
          <SummaryCardIcon>{<HandCoinsIcon size={24} />}</SummaryCardIcon>
          <SummaryCardTitle>Vendas totais</SummaryCardTitle>
          <SummaryCardValue>1040</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>{<PackageIcon size={24} />}</SummaryCardIcon>
          <SummaryCardTitle>Total em estoque</SummaryCardTitle>
          <SummaryCardValue>12020</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>{<ShoppingBasketIcon size={24} />}</SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>55</SummaryCardValue>
        </SummaryCard>
      </div>
    </div>
  );
};

export default DashboardPage;
