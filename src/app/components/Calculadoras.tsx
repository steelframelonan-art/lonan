"use client";

import { useState } from "react";
import { Calculator, Gauge, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Calculadoras() {
  // Calculadora de Carga de Gás
  const [area, setArea] = useState("");
  const [btu, setBtu] = useState("");
  const [gasType, setGasType] = useState("R410A");
  const [gasResult, setGasResult] = useState<string | null>(null);

  // Calculadora de Perda de Carga
  const [pipeLength, setPipeLength] = useState("");
  const [pipeDiameter, setPipeDiameter] = useState("");
  const [flowRate, setFlowRate] = useState("");
  const [pressureLoss, setPressureLoss] = useState<string | null>(null);

  // Conversor de Unidades
  const [conversionType, setConversionType] = useState("psi-bar");
  const [inputValue, setInputValue] = useState("");
  const [conversionResult, setConversionResult] = useState<string | null>(null);

  const calculateGasCharge = () => {
    const areaNum = parseFloat(area);
    const btuNum = parseFloat(btu);

    if (isNaN(areaNum) || isNaN(btuNum) || areaNum <= 0 || btuNum <= 0) {
      setGasResult("Por favor, insira valores válidos.");
      return;
    }

    // Fórmula simplificada: BTU / 12000 = Toneladas de refrigeração
    // Carga aproximada: 2-3 kg por tonelada para R410A
    const tons = btuNum / 12000;
    let chargePerTon = 2.5; // kg por tonelada

    if (gasType === "R22") {
      chargePerTon = 2.0;
    } else if (gasType === "R32") {
      chargePerTon = 1.8;
    }

    const totalCharge = (tons * chargePerTon).toFixed(2);
    
    setGasResult(
      `Carga estimada: ${totalCharge} kg de ${gasType}\n` +
      `Capacidade: ${tons.toFixed(2)} TR (Toneladas de Refrigeração)\n` +
      `Área: ${areaNum} m²\n` +
      `BTU: ${btuNum.toLocaleString()}`
    );
  };

  const calculatePressureLoss = () => {
    const length = parseFloat(pipeLength);
    const diameter = parseFloat(pipeDiameter);
    const flow = parseFloat(flowRate);

    if (isNaN(length) || isNaN(diameter) || isNaN(flow) || length <= 0 || diameter <= 0 || flow <= 0) {
      setPressureLoss("Por favor, insira valores válidos.");
      return;
    }

    // Fórmula simplificada de Darcy-Weisbach
    // ΔP = f × (L/D) × (ρ × v²/2)
    // Simplificado para fins didáticos
    const velocity = (4 * flow) / (Math.PI * Math.pow(diameter / 1000, 2)); // m/s
    const frictionFactor = 0.02; // fator de atrito aproximado
    const density = 1.2; // kg/m³ (ar)
    
    const pressureLossValue = frictionFactor * (length / (diameter / 1000)) * (density * Math.pow(velocity, 2) / 2);
    const pressureLossPsi = (pressureLossValue / 6894.76).toFixed(2); // Conversão para PSI

    setPressureLoss(
      `Perda de carga: ${pressureLossValue.toFixed(2)} Pa (${pressureLossPsi} PSI)\n` +
      `Velocidade do fluido: ${velocity.toFixed(2)} m/s\n` +
      `Comprimento: ${length} m\n` +
      `Diâmetro: ${diameter} mm`
    );
  };

  const convertUnits = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value)) {
      setConversionResult("Por favor, insira um valor válido.");
      return;
    }

    let result = "";

    switch (conversionType) {
      case "psi-bar":
        result = `${value} PSI = ${(value * 0.0689476).toFixed(4)} Bar`;
        break;
      case "bar-psi":
        result = `${value} Bar = ${(value * 14.5038).toFixed(4)} PSI`;
        break;
      case "btu-watts":
        result = `${value} BTU/h = ${(value * 0.293071).toFixed(2)} Watts`;
        break;
      case "watts-btu":
        result = `${value} Watts = ${(value * 3.41214).toFixed(2)} BTU/h`;
        break;
      case "celsius-fahrenheit":
        result = `${value}°C = ${((value * 9/5) + 32).toFixed(2)}°F`;
        break;
      case "fahrenheit-celsius":
        result = `${value}°F = ${((value - 32) * 5/9).toFixed(2)}°C`;
        break;
      case "kg-lb":
        result = `${value} kg = ${(value * 2.20462).toFixed(2)} lb`;
        break;
      case "lb-kg":
        result = `${value} lb = ${(value * 0.453592).toFixed(2)} kg`;
        break;
      default:
        result = "Conversão não disponível.";
    }

    setConversionResult(result);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Calculadoras Técnicas</h2>
        <p className="text-gray-600">
          Ferramentas essenciais para cálculos do dia a dia
        </p>
      </div>

      <Tabs defaultValue="gas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-2">
          <TabsTrigger value="gas" className="flex items-center gap-2 py-3">
            <Gauge className="w-4 h-4" />
            Carga de Gás
          </TabsTrigger>
          <TabsTrigger value="pressure" className="flex items-center gap-2 py-3">
            <Calculator className="w-4 h-4" />
            Perda de Carga
          </TabsTrigger>
          <TabsTrigger value="conversion" className="flex items-center gap-2 py-3">
            <Zap className="w-4 h-4" />
            Conversão de Unidades
          </TabsTrigger>
        </TabsList>

        {/* Calculadora de Carga de Gás */}
        <TabsContent value="gas">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="w-6 h-6 text-blue-600" />
                Calculadora de Carga de Gás Refrigerante
              </CardTitle>
              <CardDescription>
                Calcule a quantidade aproximada de gás necessária para o sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Área do Ambiente (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Ex: 25"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="btu">Capacidade do Equipamento (BTU)</Label>
                  <Input
                    id="btu"
                    type="number"
                    placeholder="Ex: 12000"
                    value={btu}
                    onChange={(e) => setBtu(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gasType">Tipo de Gás Refrigerante</Label>
                  <select
                    id="gasType"
                    value={gasType}
                    onChange={(e) => setGasType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="R410A">R410A</option>
                    <option value="R22">R22</option>
                    <option value="R32">R32</option>
                  </select>
                </div>
              </div>

              <Button 
                onClick={calculateGasCharge}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcular Carga de Gás
              </Button>

              {gasResult && (
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Badge className="bg-blue-600">Resultado</Badge>
                  </h4>
                  <pre className="text-sm text-blue-800 whitespace-pre-wrap font-mono">
                    {gasResult}
                  </pre>
                  <p className="text-xs text-blue-600 mt-3 italic">
                    * Valores aproximados. Sempre consulte o manual do fabricante.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calculadora de Perda de Carga */}
        <TabsContent value="pressure">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-green-600" />
                Calculadora de Perda de Carga
              </CardTitle>
              <CardDescription>
                Calcule a perda de pressão em tubulações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pipeLength">Comprimento da Tubulação (m)</Label>
                  <Input
                    id="pipeLength"
                    type="number"
                    placeholder="Ex: 10"
                    value={pipeLength}
                    onChange={(e) => setPipeLength(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pipeDiameter">Diâmetro Interno (mm)</Label>
                  <Input
                    id="pipeDiameter"
                    type="number"
                    placeholder="Ex: 15"
                    value={pipeDiameter}
                    onChange={(e) => setPipeDiameter(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flowRate">Vazão (m³/h)</Label>
                  <Input
                    id="flowRate"
                    type="number"
                    placeholder="Ex: 5"
                    value={flowRate}
                    onChange={(e) => setFlowRate(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={calculatePressureLoss}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcular Perda de Carga
              </Button>

              {pressureLoss && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Badge className="bg-green-600">Resultado</Badge>
                  </h4>
                  <pre className="text-sm text-green-800 whitespace-pre-wrap font-mono">
                    {pressureLoss}
                  </pre>
                  <p className="text-xs text-green-600 mt-3 italic">
                    * Cálculo simplificado. Para projetos críticos, use software especializado.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversor de Unidades */}
        <TabsContent value="conversion">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-600" />
                Conversor de Unidades
              </CardTitle>
              <CardDescription>
                Converta rapidamente entre diferentes unidades de medida
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="conversionType">Tipo de Conversão</Label>
                  <select
                    id="conversionType"
                    value={conversionType}
                    onChange={(e) => setConversionType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <optgroup label="Pressão">
                      <option value="psi-bar">PSI → Bar</option>
                      <option value="bar-psi">Bar → PSI</option>
                    </optgroup>
                    <optgroup label="Potência">
                      <option value="btu-watts">BTU/h → Watts</option>
                      <option value="watts-btu">Watts → BTU/h</option>
                    </optgroup>
                    <optgroup label="Temperatura">
                      <option value="celsius-fahrenheit">°C → °F</option>
                      <option value="fahrenheit-celsius">°F → °C</option>
                    </optgroup>
                    <optgroup label="Massa">
                      <option value="kg-lb">kg → lb</option>
                      <option value="lb-kg">lb → kg</option>
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inputValue">Valor a Converter</Label>
                  <Input
                    id="inputValue"
                    type="number"
                    placeholder="Digite o valor"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={convertUnits}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Converter
              </Button>

              {conversionResult && (
                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Badge className="bg-purple-600">Resultado</Badge>
                  </h4>
                  <p className="text-lg text-purple-800 font-mono font-semibold">
                    {conversionResult}
                  </p>
                </div>
              )}

              {/* Tabela de Referência Rápida */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-3">Referência Rápida</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>• 1 Bar = 14.5038 PSI</div>
                  <div>• 1 BTU/h = 0.293 Watts</div>
                  <div>• 0°C = 32°F</div>
                  <div>• 1 kg = 2.205 lb</div>
                  <div>• 1 TR = 12.000 BTU/h</div>
                  <div>• 1 HP = 746 Watts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
