"use client";

import { useState } from "react";
import { BookOpen, Download, Star, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Manual {
  id: string;
  title: string;
  brand: string;
  category: string;
  fileSize: string;
  pages: number;
  language: string;
  downloadUrl: string;
  isFavorite: boolean;
}

export default function Manuais() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Dados de exemplo - em produção viriam de um banco de dados
  const [manuais, setManuais] = useState<Manual[]>([
    {
      id: "1",
      title: "Manual Técnico Split Hi-Wall 9.000 a 30.000 BTU",
      brand: "LG",
      category: "Ar Condicionado Split",
      fileSize: "5.2 MB",
      pages: 48,
      language: "Português",
      downloadUrl: "#",
      isFavorite: false
    },
    {
      id: "2",
      title: "Manual de Instalação e Manutenção - Linha Inverter",
      brand: "Samsung",
      category: "Ar Condicionado Split",
      fileSize: "8.7 MB",
      pages: 64,
      language: "Português",
      downloadUrl: "#",
      isFavorite: false
    },
    {
      id: "3",
      title: "Guia Técnico Completo - Sistemas VRF",
      brand: "Daikin",
      category: "VRF/VRV",
      fileSize: "12.3 MB",
      pages: 120,
      language: "Português/Inglês",
      downloadUrl: "#",
      isFavorite: false
    },
    {
      id: "4",
      title: "Manual de Serviço - Ar Condicionado Janela",
      brand: "Springer",
      category: "Ar Condicionado Janela",
      fileSize: "3.8 MB",
      pages: 32,
      language: "Português",
      downloadUrl: "#",
      isFavorite: false
    },
    {
      id: "5",
      title: "Catálogo Técnico - Freezers Verticais e Horizontais",
      brand: "Consul",
      category: "Freezer",
      fileSize: "6.1 MB",
      pages: 56,
      language: "Português",
      downloadUrl: "#",
      isFavorite: false
    },
    {
      id: "6",
      title: "Manual de Instalação - Chiller Industrial",
      brand: "Carrier",
      category: "Chiller",
      fileSize: "15.4 MB",
      pages: 98,
      language: "Português/Inglês",
      downloadUrl: "#",
      isFavorite: false
    },
    {
      id: "7",
      title: "Guia de Troubleshooting - Linha Residencial",
      brand: "Midea",
      category: "Ar Condicionado Split",
      fileSize: "4.5 MB",
      pages: 40,
      language: "Português",
      downloadUrl: "#",
      isFavorite: false
    },
    {
      id: "8",
      title: "Manual Técnico - Self Contained",
      brand: "Elgin",
      category: "Self Contained",
      fileSize: "7.9 MB",
      pages: 72,
      language: "Português",
      downloadUrl: "#",
      isFavorite: false
    },
    {
      id: "9",
      title: "Catálogo de Peças - Linha Completa",
      brand: "Gree",
      category: "Ar Condicionado Split",
      fileSize: "10.2 MB",
      pages: 88,
      language: "Português",
      downloadUrl: "#",
      isFavorite: false
    },
    {
      id: "10",
      title: "Manual de Instalação - Câmara Frigorífica",
      brand: "Embraco",
      category: "Refrigeração Comercial",
      fileSize: "9.6 MB",
      pages: 76,
      language: "Português",
      downloadUrl: "#",
      isFavorite: false
    }
  ]);

  const categories = Array.from(new Set(manuais.map(m => m.category))).sort();

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredManuais = manuais.filter(manual => {
    const matchesSearch = 
      manual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manual.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manual.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || manual.category === selectedCategory;
    const matchesFavorites = selectedCategory === "favorites" ? favorites.includes(manual.id) : true;

    return matchesSearch && (matchesCategory || matchesFavorites);
  });

  const handleDownload = (manual: Manual) => {
    // Em produção, isso faria o download real do arquivo
    alert(`Baixando: ${manual.title}\nTamanho: ${manual.fileSize}\n\nEm produção, o arquivo seria baixado automaticamente.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Manuais Técnicos</h2>
        <p className="text-gray-600">
          Biblioteca completa de manuais para download e acesso offline
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Manuais</CardTitle>
          <CardDescription>
            Pesquise por título, marca ou categoria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Digite o nome do manual, marca ou modelo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              <Filter className="w-4 h-4 mr-2" />
              Todos
            </Button>
            <Button
              variant={selectedCategory === "favorites" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("favorites")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Star className="w-4 h-4 mr-2" />
              Favoritos ({favorites.length})
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            {filteredManuais.length} {filteredManuais.length === 1 ? 'manual encontrado' : 'manuais encontrados'}
          </h3>
        </div>

        {filteredManuais.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Nenhum manual encontrado com os filtros aplicados.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tente ajustar sua busca ou filtros.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredManuais.map((manual) => (
              <Card 
                key={manual.id} 
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className="mb-2 bg-purple-600">
                        {manual.brand}
                      </Badge>
                      <CardTitle className="text-lg line-clamp-2">
                        {manual.title}
                      </CardTitle>
                    </div>
                    <button
                      onClick={() => toggleFavorite(manual.id)}
                      className="ml-2 flex-shrink-0"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          favorites.includes(manual.id) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-400 hover:text-yellow-400'
                        } transition-colors`}
                      />
                    </button>
                  </div>
                  <CardDescription className="mt-2">
                    {manual.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Tamanho:</span>
                      <br />
                      {manual.fileSize}
                    </div>
                    <div>
                      <span className="font-semibold">Páginas:</span>
                      <br />
                      {manual.pages}
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold">Idioma:</span> {manual.language}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleDownload(manual)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Acesso Offline Disponível
              </h4>
              <p className="text-sm text-gray-600">
                Todos os manuais baixados ficam salvos no seu dispositivo para consulta offline. 
                Marque seus favoritos para acesso rápido!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
