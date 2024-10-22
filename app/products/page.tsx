import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import SidebarSheetButton from "../_components/sidebar-sheet-button";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/product/get-products";
import CreateProductButton from "./_components/create-product-button";
import { productTableColumns } from "./_components/product-table-columns";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="w-full space-y-8 overflow-auto rounded-lg bg-white p-8 lg:m-8">
      <Header>
        <SidebarSheetButton />
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateProductButton />
        </HeaderRight>
      </Header>
      <DataTable columns={productTableColumns} data={products} />
    </div>
  );
};

export default ProductsPage;
