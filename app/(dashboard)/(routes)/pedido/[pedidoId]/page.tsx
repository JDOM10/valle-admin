import prismadb from "@/lib/prismadb";

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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
      </div>
    </div>
  );
};

export default PedidoPageAdd;
