import prismadb from "@/lib/prismadb";

import { ProductoForm } from "@/app/(dashboard)//(routes)/producto/[productoId]/components/producto-form";

const ProductoPageAdd = async ({
  params
}: {
  params: { productoId: string }
}) => {
  const productoId = Number(params.productoId);

  const producto = await prismadb.producto.findUnique({
    where: {
      prdid: productoId,
    }
  });

  const tipo = await prismadb.tipo.findMany({
  });

    const productor = await prismadb.productor.findMany({
    });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductoForm tipos={tipo} productores={productor} initialData={producto} />
      </div>
    </div>
  );
}

export default ProductoPageAdd;