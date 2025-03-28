import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Bell, 
  PlusCircle, 
  CheckCircle2, 
  XCircle,
  Download,
  Edit,
  Search,
  FileUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const NominaPlataforma = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedNomina, setSelectedNomina] = useState(null);
  const [showNominaList, setShowNominaList] = useState(false);
  const [showNominaDetails, setShowNominaDetails] = useState(false);

  const nominasMock = [
    {
      id: 'NOM-2024-001',
      fechaGeneracion: '15/03/2024 10:30',
      periodoPago: '03/2024',
      tipoNomina: 'Pensión',
      estadoNomina: 'Original',
      ultimoUsuarioModificacion: '-',
      fechaUltimaModificacion: '-',
      motivoUltimaModificacion: '-',
      usuarioAprobador: '-',
      fechaAprobacion: '-',
      observaciones: 'Nómina inicial del mes',
      totalRegistros: 250,
      totalMontoBruto: '$350.000.000'
    },
    {
      id: 'NOM-2024-002',
      fechaGeneracion: '20/03/2024 15:45',
      periodoPago: '03/2024',
      tipoNomina: 'Retiro',
      estadoNomina: 'Modificada',
      ultimoUsuarioModificacion: 'María González',
      fechaUltimaModificacion: '22/03/2024 09:15',
      motivoUltimaModificacion: 'Corrección datos bancarios',
      usuarioAprobador: '-',
      fechaAprobacion: '-',
      observaciones: 'Requiere validación de cambios',
      totalRegistros: 75,
      totalMontoBruto: '$125.000.000'
    }
  ];

  const registrosPagoMock = [
    {
      id: 'REG-001',
      rutBeneficiario: '12.345.678-9',
      nombreBeneficiario: 'Juan Pérez González',
      tipoBeneficiario: 'Titular',
      bancoDestino: 'Banco Estado',
      tipoCuenta: 'Cuenta RUT',
      numeroCuenta: '123-45678-90',
      titularCuenta: 'Juan Pérez González',
      montoBruto: '$1.500.000',
      montoDescuentos: '$150.000',
      montoNeto: '$1.350.000',
      moneda: 'CLP',
      descripcionPago: 'Pensión mensual',
      estadoPago: 'Pendiente',
      fechaRegistro: '15/03/2024'
    },
    // Más registros...
  ];

  const renderNominaList = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Nóminas de Pago Disponibles</span>
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Buscar nómina..." 
              className="border rounded px-2 py-1 text-sm"
            />
            <Button size="sm" variant="outline">
              <Search className="mr-2 w-4 h-4" /> Buscar
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">ID Nómina</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Periodo</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Total Registros</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {nominasMock.map((nomina) => (
              <tr key={nomina.id} className="hover:bg-gray-50 border-b">
                <td className="p-3">{nomina.id}</td>
                <td className="p-3">{nomina.periodoPago}</td>
                <td className="p-3">{nomina.tipoNomina}</td>
                <td className="p-3">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-bold
                    ${nomina.estadoNomina === 'Original' ? 'bg-blue-100 text-blue-800' : 
                      nomina.estadoNomina === 'Modificada' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`
                  }>
                    {nomina.estadoNomina}
                  </span>
                </td>
                <td className="p-3">{nomina.totalRegistros}</td>
                <td className="p-3">
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setSelectedNomina(nomina);
                      setShowNominaDetails(true);
                    }}
                  >
                    <Edit className="mr-2 w-4 h-4" /> Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );

  const renderNominaDetails = () => (
    <div>
      {selectedNomina && (
        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Detalle Nómina: {selectedNomina.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-bold">Fecha Generación:</p>
                  <p>{selectedNomina.fechaGeneracion}</p>
                </div>
                <div>
                  <p className="font-bold">Periodo Pago:</p>
                  <p>{selectedNomina.periodoPago}</p>
                </div>
                <div>
                  <p className="font-bold">Tipo Nómina:</p>
                  <p>{selectedNomina.tipoNomina}</p>
                </div>
                <div>
                  <p className="font-bold">Total Registros:</p>
                  <p>{selectedNomina.totalRegistros}</p>
                </div>
                <div>
                  <p className="font-bold">Total Monto Bruto:</p>
                  <p>{selectedNomina.totalMontoBruto}</p>
                </div>
                <div>
                  <p className="font-bold">Estado:</p>
                  <p>{selectedNomina.estadoNomina}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Subir Evidencia</span>
                <Button variant="outline" size="sm">
                  <FileUp className="mr-2 w-4 h-4" /> Cargar Documentos
                </Button>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Detalle Registros de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">RUT</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Banco</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Monto Bruto</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Monto Neto</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {registrosPagoMock.map((registro) => (
                    <tr key={registro.id} className="hover:bg-gray-50 border-b">
                      <td className="p-3">{registro.rutBeneficiario}</td>
                      <td className="p-3">{registro.nombreBeneficiario}</td>
                      <td className="p-3">{registro.bancoDestino}</td>
                      <td className="p-3">{registro.montoBruto}</td>
                      <td className="p-3">{registro.montoNeto}</td>
                      <td className="p-3">
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-bold
                          ${registro.estadoPago === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                            registro.estadoPago === 'Ejecutado' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'}`
                        }>
                          {registro.estadoPago}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button size="sm">
                          <Edit className="mr-2 w-4 h-4" /> Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar y Contenido Principal (previamente definidos) */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'solicitudes' && 'Mis Solicitudes'}
            {activeTab === 'nominas' && (showNominaList ? 'Nóminas Disponibles' : 
              showNominaDetails ? 'Detalle de Nómina' : 'Nóminas')}
            {activeTab === 'perfil' && 'Perfil'}
          </h1>
          <div className="relative">
            <Bell className="text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              2
            </span>
          </div>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'solicitudes' && renderSolicitudes()}
        {activeTab === 'nominas' && !showNominaList && !showNominaDetails && (
          <Button 
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => setShowNominaList(true)}
          >
            <PlusCircle className="mr-2" /> Crear Nueva Solicitud de Modificación
          </Button>
        )}
        {activeTab === 'nominas' && showNominaList && renderNominaList()}
        {activeTab === 'nominas' && showNominaDetails && renderNominaDetails()}
      </div>
    </div>
  );
};

export default NominaPlataforma;