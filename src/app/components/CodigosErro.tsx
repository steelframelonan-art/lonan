"use client";

import { useState, useMemo } from "react";
import { Search, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ErrorCode {
  id: string;
  code: string;
  brand: string;
  equipmentType: string;
  description: string;
  possibleCauses: string[];
  solutions: string[];
  severity: "low" | "medium" | "high";
}

// Dados de exemplo - em produção viriam de um banco de dados
const errorCodesData: ErrorCode[] = [
  {
    id: "1",
    code: "E1",
    brand: "LG",
    equipmentType: "Ar Condicionado Split",
    description: "Erro de comunicação entre unidade interna e externa",
    possibleCauses: [
      "Cabo de comunicação danificado ou mal conectado",
      "Interferência eletromagnética",
      "Placa eletrônica com defeito",
      "Conexões oxidadas"
    ],
    solutions: [
      "Verificar e reconectar cabos de comunicação",
      "Testar continuidade dos cabos",
      "Verificar se há interferência de outros equipamentos",
      "Limpar conexões oxidadas",
      "Substituir placa eletrônica se necessário"
    ],
    severity: "high"
  },
  {
    id: "2",
    code: "E2",
    brand: "Samsung",
    equipmentType: "Ar Condicionado Split",
    description: "Sensor de temperatura ambiente com defeito",
    possibleCauses: [
      "Sensor desconectado",
      "Sensor com defeito",
      "Fiação rompida",
      "Curto-circuito no sensor"
    ],
    solutions: [
      "Verificar conexão do sensor",
      "Medir resistência do sensor (deve estar entre 10-15kΩ a 25°C)",
      "Verificar continuidade da fiação",
      "Substituir sensor se necessário"
    ],
    severity: "medium"
  },
  {
    id: "3",
    code: "F0",
    brand: "Midea",
    equipmentType: "Ar Condicionado",
    description: "Proteção contra vazamento de gás refrigerante",
    possibleCauses: [
      "Vazamento real de gás",
      "Sensor de vazamento com defeito",
      "Pressão do sistema baixa",
      "Falso alarme por contaminação do sensor"
    ],
    solutions: [
      "Verificar pressão do sistema",
      "Procurar vazamentos com detector eletrônico",
      "Limpar sensor de vazamento",
      "Verificar carga de gás",
      "Substituir sensor se necessário"
    ],
    severity: "high"
  },
  {
    id: "4",
    code: "P1",
    brand: "Gree",
    equipmentType: "Ar Condicionado",
    description: "Proteção de alta pressão",
    possibleCauses: [
      "Condensador sujo ou obstruído",
      "Ventilador externo não funcionando",
      "Carga excessiva de gás",
      "Temperatura ambiente muito alta",
      "Fluxo de ar insuficiente"
    ],
    solutions: [
      "Limpar condensador",
      "Verificar funcionamento do ventilador",
      "Verificar carga de gás refrigerante",
      "Garantir ventilação adequada da unidade externa",
      "Verificar pressostato de alta"
    ],
    severity: "high"
  },
  {
    id: "5",
    code: "E4",
    brand: "Electrolux",
    equipmentType: "Ar Condicionado",
    description: "Proteção de baixa pressão",
    possibleCauses: [
      "Falta de gás refrigerante",
      "Vazamento no sistema",
      "Filtro obstruído",
      "Válvula de expansão com defeito",
      "Evaporador congelado"
    ],
    solutions: [
      "Verificar carga de gás",
      "Procurar e reparar vazamentos",
      "Limpar ou substituir filtros",
      "Verificar válvula de expansão",
      "Descongelar evaporador se necessário"
    ],
    severity: "high"
  },
  {
    id: "6",
    code: "H6",
    brand: "Carrier",
    equipmentType: "Ar Condicionado",
    description: "Falha no motor do compressor",
    possibleCauses: [
      "Compressor travado",
      "Sobrecarga elétrica",
      "Capacitor de partida defeituoso",
      "Enrolamento do motor queimado",
      "Falta de lubrificação"
    ],
    solutions: [
      "Verificar se compressor está travado",
      "Testar capacitor de partida",
      "Medir resistência dos enrolamentos",
      "Verificar alimentação elétrica",
      "Substituir compressor se necessário"
    ],
    severity: "high"
  },
  {
    id: "7",
    code: "E5",
    brand: "Springer",
    equipmentType: "Ar Condicionado",
    description: "Sobrecarga de corrente",
    possibleCauses: [
      "Tensão de alimentação baixa",
      "Compressor com defeito",
      "Ventilador travado",
      "Curto-circuito no sistema",
      "Placa eletrônica com defeito"
    ],
    solutions: [
      "Verificar tensão de alimentação",
      "Testar corrente do compressor",
      "Verificar ventiladores",
      "Procurar curtos-circuitos",
      "Verificar placa eletrônica"
    ],
    severity: "high"
  },
  {
    id: "8",
    code: "F1",
    brand: "Consul",
    equipmentType: "Freezer",
    description: "Sensor de degelo com defeito",
    possibleCauses: [
      "Sensor desconectado",
      "Sensor com leitura incorreta",
      "Fiação danificada",
      "Acúmulo excessivo de gelo"
    ],
    solutions: [
      "Verificar conexão do sensor",
      "Testar resistência do sensor",
      "Verificar fiação",
      "Realizar degelo manual",
      "Substituir sensor se necessário"
    ],
    severity: "medium"
  },
  {
    id: "9",
    code: "E7",
    brand: "Brastemp",
    equipmentType: "Freezer",
    description: "Falha no sistema de degelo",
    possibleCauses: [
      "Resistência de degelo queimada",
      "Timer de degelo com defeito",
      "Termostato de degelo defeituoso",
      "Fusível térmico queimado"
    ],
    solutions: [
      "Testar resistência de degelo",
      "Verificar timer de degelo",
      "Testar termostato de degelo",
      "Verificar fusível térmico",
      "Substituir componentes defeituosos"
    ],
    severity: "medium"
  },
  {
    id: "10",
    code: "CH",
    brand: "Daikin",
    equipmentType: "Ar Condicionado",
    description: "Erro no sensor de temperatura da serpentina",
    possibleCauses: [
      "Sensor mal posicionado",
      "Sensor com defeito",
      "Conexão solta",
      "Fiação danificada"
    ],
    solutions: [
      "Reposicionar sensor na serpentina",
      "Verificar conexões",
      "Testar resistência do sensor",
      "Verificar fiação",
      "Substituir sensor se necessário"
    ],
    severity: "medium"
  }
];

interface CodigosErroProps {
  searchQuery: string;
}

export default function CodigosErro({ searchQuery }: CodigosErroProps) {
  const [localSearch, setLocalSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const searchTerm = searchQuery || localSearch;

  // Filtrar códigos de erro
  const filteredCodes = useMemo(() => {
    return errorCodesData.filter(error => {
      const matchesSearch = 
        error.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        error.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        error.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        error.possibleCauses.some(cause => cause.toLowerCase().includes(searchTerm.toLowerCase())) ||
        error.solutions.some(solution => solution.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesBrand = selectedBrand === "all" || error.brand === selectedBrand;
      const matchesType = selectedType === "all" || error.equipmentType === selectedType;

      return matchesSearch && matchesBrand && matchesType;
    });
  }, [searchTerm, selectedBrand, selectedType]);

  // Obter marcas únicas
  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(errorCodesData.map(e => e.brand)));
    return uniqueBrands.sort();
  }, []);

  // Obter tipos de equipamento únicos
  const equipmentTypes = useMemo(() => {
    const uniqueTypes = Array.from(new Set(errorCodesData.map(e => e.equipmentType)));
    return uniqueTypes.sort();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-700 border-red-300";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low": return "bg-green-100 text-green-700 border-green-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertCircle className="w-4 h-4" />;
      case "medium": return <Info className="w-4 h-4" />;
      case "low": return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "high": return "Alta Prioridade";
      case "medium": return "Média Prioridade";
      case "low": return "Baixa Prioridade";
      default: return "Normal";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Códigos de Erro</h2>
        <p className="text-gray-600">
          Consulte códigos de todas as marcas com causas e soluções detalhadas
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Códigos</CardTitle>
          <CardDescription>
            Pesquise por código, marca, descrição ou solução
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Digite o código de erro, marca ou problema..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Filtrar por Marca
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas as Marcas</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tipo de Equipamento
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os Tipos</option>
                {equipmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            {filteredCodes.length} {filteredCodes.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </h3>
        </div>

        {filteredCodes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Nenhum código de erro encontrado com os filtros aplicados.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tente ajustar sua busca ou filtros.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredCodes.map((error) => (
              <AccordionItem 
                key={error.id} 
                value={error.id}
                className="border rounded-lg shadow-sm bg-white overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between w-full text-left pr-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="text-lg font-bold bg-blue-600 hover:bg-blue-700">
                          {error.code}
                        </Badge>
                        <Badge variant="outline" className="font-semibold">
                          {error.brand}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`flex items-center gap-1 ${getSeverityColor(error.severity)}`}
                        >
                          {getSeverityIcon(error.severity)}
                          {getSeverityLabel(error.severity)}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {error.description}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {error.equipmentType}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <Tabs defaultValue="causes" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="causes">Possíveis Causas</TabsTrigger>
                      <TabsTrigger value="solutions">Soluções</TabsTrigger>
                    </TabsList>
                    <TabsContent value="causes" className="mt-4">
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                          Possíveis Causas do Problema
                        </h5>
                        <ul className="space-y-2">
                          {error.possibleCauses.map((cause, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    <TabsContent value="solutions" className="mt-4">
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Soluções Recomendadas
                        </h5>
                        <ul className="space-y-2">
                          {error.solutions.map((solution, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                              <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
