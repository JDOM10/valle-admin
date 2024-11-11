import prismadb from "@/lib/prismadb";

const ClientePageView = async ({
  params,
}: {
  params: { clienteId: string };
}) => {
  const clienteId = Number(params.clienteId);

  // Obtener los datos del cliente
  const cliente = await prismadb.cliente.findUnique({
    where: {
      clid: clienteId,
    },
  });

  // Si no se encuentra el cliente, retornar un mensaje de error o redirigir
  if (!cliente) {
    return <div>Cliente no encontrado</div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
      </div>
    </div>
  );
};

export default ClientePageView;
