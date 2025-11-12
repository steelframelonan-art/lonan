"use client";

import { useState } from "react";
import { Users, Plus, Search, Phone, Mail, MapPin, Calendar, Wrench, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ServiceCall {
  id: string;
  date: string;
  description: string;
  status: "pending" | "completed" | "scheduled";
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  serviceCalls: ServiceCall[];
  createdAt: string;
}

export default function GestaoClientes() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "João Silva",
      phone: "(11) 98765-4321",
      email: "joao.silva@email.com",
      address: "Rua das Flores, 123 - São Paulo, SP",
      notes: "Cliente preferencial. Possui 3 aparelhos de ar condicionado.",
      serviceCalls: [
        {
          id: "1",
          date: "2024-01-15",
          description: "Manutenção preventiva - Split sala",
          status: "completed"
        },
        {
          id: "2",
          date: "2024-02-20",
          description: "Recarga de gás - Split quarto",
          status: "completed"
        }
      ],
      createdAt: "2023-06-10"
    },
    {
      id: "2",
      name: "Maria Santos",
      phone: "(11) 91234-5678",
      email: "maria.santos@email.com",
      address: "Av. Paulista, 456 - São Paulo, SP",
      notes: "Empresa - 5 splits instalados",
      serviceCalls: [
        {
          id: "3",
          date: "2024-03-10",
          description: "Instalação de novo split",
          status: "completed"
        }
      ],
      createdAt: "2023-08-22"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: ""
  });

  const [serviceFormData, setServiceFormData] = useState({
    date: "",
    description: "",
    status: "scheduled" as "pending" | "completed" | "scheduled"
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = () => {
    if (!formData.name || !formData.phone) {
      alert("Nome e telefone são obrigatórios!");
      return;
    }

    const newClient: Client = {
      id: Date.now().toString(),
      ...formData,
      serviceCalls: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setClients([...clients, newClient]);
    setFormData({ name: "", phone: "", email: "", address: "", notes: "" });
    setIsAddingClient(false);
  };

  const handleAddService = () => {
    if (!selectedClient || !serviceFormData.date || !serviceFormData.description) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const newService: ServiceCall = {
      id: Date.now().toString(),
      ...serviceFormData
    };

    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          serviceCalls: [...client.serviceCalls, newService]
        };
      }
      return client;
    });

    setClients(updatedClients);
    setServiceFormData({ date: "", description: "", status: "scheduled" });
    setIsAddingService(false);
    setSelectedClient(null);
  };

  const handleDeleteClient = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "scheduled": return "bg-blue-100 text-blue-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Concluído";
      case "scheduled": return "Agendado";
      case "pending": return "Pendente";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Gestão de Clientes</h2>
        <p className="text-gray-600">
          Cadastre e gerencie seus clientes e histórico de serviços
        </p>
      </div>

      {/* Search and Add */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <CardTitle>Meus Clientes</CardTitle>
              <CardDescription>
                {clients.length} {clients.length === 1 ? 'cliente cadastrado' : 'clientes cadastrados'}
              </CardDescription>
            </div>
            <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do cliente
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 98765-4321"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="cliente@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Rua, número - Cidade, Estado"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Informações adicionais sobre o cliente..."
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={handleAddClient}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Cliente
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar por nome, telefone, e-mail ou endereço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchQuery ? "Nenhum cliente encontrado com os termos de busca." : "Nenhum cliente cadastrado ainda."}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {!searchQuery && "Clique em 'Novo Cliente' para começar."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{client.name}</CardTitle>
                    <CardDescription className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4" />
                        {client.phone}
                      </div>
                      {client.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4" />
                          {client.email}
                        </div>
                      )}
                      {client.address && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4" />
                          {client.address}
                        </div>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedClient(client);
                        setIsAddingService(true);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClient(client.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {client.notes && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{client.notes}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-orange-600" />
                    Histórico de Serviços ({client.serviceCalls.length})
                  </h4>
                  {client.serviceCalls.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      Nenhum serviço registrado ainda.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {client.serviceCalls.map((service) => (
                        <div 
                          key={service.id}
                          className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">
                                {new Date(service.date).toLocaleDateString('pt-BR')}
                              </span>
                              <Badge className={getStatusColor(service.status)}>
                                {getStatusLabel(service.status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Service Dialog */}
      <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Novo Serviço</DialogTitle>
            <DialogDescription>
              Cliente: {selectedClient?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceDate">Data do Serviço *</Label>
              <Input
                id="serviceDate"
                type="date"
                value={serviceFormData.date}
                onChange={(e) => setServiceFormData({ ...serviceFormData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Descrição do Serviço *</Label>
              <Textarea
                id="serviceDescription"
                value={serviceFormData.description}
                onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                placeholder="Ex: Manutenção preventiva, Instalação, Recarga de gás..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceStatus">Status</Label>
              <select
                id="serviceStatus"
                value={serviceFormData.status}
                onChange={(e) => setServiceFormData({ ...serviceFormData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="scheduled">Agendado</option>
                <option value="completed">Concluído</option>
                <option value="pending">Pendente</option>
              </select>
            </div>
            <Button 
              onClick={handleAddService}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Registrar Serviço
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
