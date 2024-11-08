import prismadb from "@/lib/prismadb";

import { ProductorColumn } from "./components/columns";
import { ProductorClient } from "./components/client";

const ProductorPage = async () => {
  const productor = await prismadb.productor.findMany({
  });

  const formattedProductor: ProductorColumn[] = productor.map((item) => ({   
    proid: item.proid,
    pronombre: item.pronombre,
    prodescripcion: item.prodescripcion,
    profoto: item.profoto,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductorClient data={formattedProductor} />
      </div>
    </div>
  );
};

export default ProductorPage;