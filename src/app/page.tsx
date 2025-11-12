"use client";

import { useState } from "react";
import { Search, Wrench, Calculator, BookOpen, Users, MessageSquare, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import CodigosErro from "./components/CodigosErro";
import Calculadoras from "./components/Calculadoras";
import Manuais from "./components/Manuais";
import GestaoClientes from "./components/GestaoClientes";
import Forum from "./components/Forum";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Wrench className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">OI TÉCNICO</h1>
                <p className="text-xs md:text-sm text-blue-100">Seu assistente profissional</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar códigos de erro, soluções, marcas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-0 shadow-lg bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-cyan-300"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-b">
          <nav className="container mx-auto px-4 py-2 flex flex-col gap-2">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => { setActiveTab("home"); setMenuOpen(false); }}
            >
              <Wrench className="w-4 h-4 mr-2" />
              Início
            </Button>
            <Button
              variant={activeTab === "codigos" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => { setActiveTab("codigos"); setMenuOpen(false); }}
            >
              <Search className="w-4 h-4 mr-2" />
              Códigos de Erro
            </Button>
            <Button
              variant={activeTab === "calculadoras" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => { setActiveTab("calculadoras"); setMenuOpen(false); }}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculadoras
            </Button>
            <Button
              variant={activeTab === "manuais" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => { setActiveTab("manuais"); setMenuOpen(false); }}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Manuais
            </Button>
            <Button
              variant={activeTab === "clientes" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => { setActiveTab("clientes"); setMenuOpen(false); }}
            >
              <Users className="w-4 h-4 mr-2" />
              Clientes
            </Button>
            <Button
              variant={activeTab === "forum" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => { setActiveTab("forum"); setMenuOpen(false); }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Fórum
            </Button>
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white shadow-md border-b sticky top-[120px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-2">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              onClick={() => setActiveTab("home")}
              className="whitespace-nowrap"
            >
              <Wrench className="w-4 h-4 mr-2" />
              Início
            </Button>
            <Button
              variant={activeTab === "codigos" ? "default" : "ghost"}
              onClick={() => setActiveTab("codigos")}
              className="whitespace-nowrap"
            >
              <Search className="w-4 h-4 mr-2" />
              Códigos de Erro
            </Button>
            <Button
              variant={activeTab === "calculadoras" ? "default" : "ghost"}
              onClick={() => setActiveTab("calculadoras")}
              className="whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculadoras
            </Button>
            <Button
              variant={activeTab === "manuais" ? "default" : "ghost"}
              onClick={() => setActiveTab("manuais")}
              className="whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Manuais
            </Button>
            <Button
              variant={activeTab === "clientes" ? "default" : "ghost"}
              onClick={() => setActiveTab("clientes")}
              className="whitespace-nowrap"
            >
              <Users className="w-4 h-4 mr-2" />
              Clientes
            </Button>
            <Button
              variant={activeTab === "forum" ? "default" : "ghost"}
              onClick={() => setActiveTab("forum")}
              className="whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Fórum
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Bem-vindo ao OI TÉCNICO
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sua ferramenta completa para diagnóstico, cálculos e gestão de serviços em refrigeração e ar condicionado
              </p>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-500"
                onClick={() => setActiveTab("codigos")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Códigos de Erro</CardTitle>
                  <CardDescription>
                    Consulte códigos de todas as marcas com ilustrações e soluções
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    +500 códigos cadastrados
                  </Badge>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-500"
                onClick={() => setActiveTab("calculadoras")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Calculadoras Técnicas</CardTitle>
                  <CardDescription>
                    Carga de gás, perda de carga e conversão de unidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    3 calculadoras disponíveis
                  </Badge>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500"
                onClick={() => setActiveTab("manuais")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Manuais Técnicos</CardTitle>
                  <CardDescription>
                    Download de manuais em PDF com acesso offline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Biblioteca completa
                  </Badge>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-500"
                onClick={() => setActiveTab("clientes")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Gestão de Clientes</CardTitle>
                  <CardDescription>
                    Cadastre clientes e gerencie histórico de serviços
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    Organize seu trabalho
                  </Badge>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-cyan-500"
                onClick={() => setActiveTab("forum")}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Fórum da Comunidade</CardTitle>
                  <CardDescription>
                    Troque experiências e tire dúvidas com outros técnicos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                    Comunidade ativa
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Recursos Premium</CardTitle>
                  <CardDescription>
                    Em breve: diagnóstico por IA e muito mais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                    Em desenvolvimento
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600 mt-1">Códigos de Erro</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600 mt-1">Marcas Cobertas</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-purple-600">200+</div>
                <div className="text-sm text-gray-600 mt-1">Manuais Disponíveis</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-orange-600">1000+</div>
                <div className="text-sm text-gray-600 mt-1">Técnicos Ativos</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "codigos" && <CodigosErro searchQuery={searchQuery} />}
        {activeTab === "calculadoras" && <Calculadoras />}
        {activeTab === "manuais" && <Manuais />}
        {activeTab === "clientes" && <GestaoClientes />}
        {activeTab === "forum" && <Forum />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Wrench className="w-6 h-6" />
              <span className="text-xl font-bold">OI TÉCNICO</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 OI TÉCNICO - Todos os direitos reservados
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Aplicativo profissional para técnicos de refrigeração e ar condicionado
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
