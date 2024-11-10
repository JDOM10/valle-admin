import prismadb from "@/lib/prismadb";
import { ClienteForm } from "@/app/(dashboard)/(routes)/cliente/[clienteId]/components/cliente-form";

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

  // Preparar los datos para `ClienteForm`, incluyendo `clid`
  const clienteData = {
    clid: cliente.clid, // Asegurarse de incluir `clid`
    clinombre: cliente.clinombre,
    clicorreo: cliente.clicorreo,
    clitelefono: cliente.clitelefono,
    clici: cliente.clici,
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClienteForm initialData={clienteData} />
      </div>
    </div>
  );
};

export default ClientePageView;
