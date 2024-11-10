import prismadb from "@/lib/prismadb";
import { PedidoForm } from "@/app/(dashboard)/(routes)/pedido/[pedidoId]/components/pedido-form";

const PedidoPageAdd = async ({
  params,
}: {
  params: { pedidoId: string };
}) => {
  const pedidoId = Number(params.pedidoId);

  // Obtener los datos del pedido incluyendo detalles de cliente y productos
  const pedido = await prismadb.pedido.findUnique({
    where: {
      peid: pedidoId,
    },
    include: {
      cliente: true,
      producto: {
        include: {
          producto: true, // Incluye detalles del producto en el pedido
        },
      },
    },
  });

  // Si no se encuentra el pedido, retornar un mensaje de error o redirigir
  if (!pedido) {
    return <div>Pedido no encontrado</div>;
  }

  // Preparar los datos para `PedidoForm`
  const pedidoData = {
    pednombre: pedido.peid ? `Pedido #${pedido.peid}` : "Sin nombre",
    pedfecha: pedido.pedfecha.toISOString(),
    pedtotal: pedido.pedtotal,
    cliente: {
      clinombre: pedido.cliente?.clinombre || "Sin cliente",
    },
    productos: pedido.producto.map((item) => ({
      prdnombre: item.producto.prdnombre,
      cantidad: item.ppcantidad,
    })),
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PedidoForm initialData={pedidoData} />
      </div>
    </div>
  );
};

export default PedidoPageAdd;
