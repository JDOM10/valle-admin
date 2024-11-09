import prismadb from "@/lib/prismadb";

import { ProductoColumn } from "./components/columns";
import { ProductoClient } from "./components/client";

const ProductoPage = async () => {
  const producto = await prismadb.producto.findMany({
    include: { tipo: true, productor: true },
  });

  const formattedProducto: ProductoColumn[] = producto.map((item) => ({   
    prdid: item.prdid,
    prdnombre: item.prdnombre,
    prdprecio: item.prdprecio,
    proid: item.productor.pronombre,
    tipid: item.tipo.tipnombre,
    prddescripcion: item.prddescripcion,
    prdfoto: item.prdfoto,
    prdcntnut: item.prdcntnut,

  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductoClient data={formattedProducto} />
      </div>
    </div>
  );
};

export default ProductoPage;