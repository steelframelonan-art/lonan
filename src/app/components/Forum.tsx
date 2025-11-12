"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, MessageCircle, Plus, Search, TrendingUp, Clock, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Reply {
  id: string;
  author: string;
  content: string;
  date: string;
  votes: number;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  votes: number;
  replies: Reply[];
  solved: boolean;
}

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: "1",
      title: "Como diagnosticar vazamento em sistema R410A?",
      content: "Pessoal, estou com um split que está perdendo gás R410A. Já fiz teste com espuma mas não encontrei o vazamento. Alguma dica de como proceder?",
      author: "Carlos Técnico",
      date: "2024-03-15",
      category: "Diagnóstico",
      votes: 12,
      replies: [
        {
          id: "1",
          author: "Roberto Silva",
          content: "Use um detector eletrônico de vazamento. Espuma nem sempre pega vazamentos pequenos. Também verifique as conexões das válvulas de serviço.",
          date: "2024-03-15",
          votes: 8
        },
        {
          id: "2",
          author: "Ana Refrigeração",
          content: "Concordo com o Roberto. Além disso, faça teste de pressão com nitrogênio. Deixe pressurizado por 24h e veja se há queda de pressão.",
          date: "2024-03-15",
          votes: 15
        }
      ],
      solved: true
    },
    {
      id: "2",
      title: "Compressor não liga - código E1 na LG",
      content: "Aparelho LG dando código E1. Já verifiquei os cabos de comunicação e estão ok. O que mais pode ser?",
      author: "João Manutenção",
      date: "2024-03-14",
      category: "Códigos de Erro",
      votes: 8,
      replies: [
        {
          id: "3",
          author: "Marcos Tech",
          content: "E1 na LG geralmente é comunicação. Mas se os cabos estão ok, pode ser a placa eletrônica. Testa a continuidade dos cabos com multímetro.",
          date: "2024-03-14",
          votes: 6
        }
      ],
      solved: false
    },
    {
      id: "3",
      title: "Melhor método para limpeza de evaporador muito sujo",
      content: "Tenho um cliente com evaporador extremamente sujo (fumante). Qual o melhor produto e técnica para limpeza profunda sem danificar as aletas?",
      author: "Pedro Climatização",
      date: "2024-03-13",
      category: "Manutenção",
      votes: 20,
      replies: [
        {
          id: "4",
          author: "Luiz Especialista",
          content: "Uso desengraxante alcalino diluído em água. Aplico com pulverizador, deixo agir 10 min e enxáguo com água em baixa pressão. Funciona muito bem!",
          date: "2024-03-13",
          votes: 18
        },
        {
          id: "5",
          author: "Sandra Técnica",
          content: "Cuidado com produtos muito agressivos. Prefiro usar limpador específico para evaporadores. É mais caro mas não corre risco de corrosão.",
          date: "2024-03-13",
          votes: 12
        }
      ],
      solved: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [isReplying, setIsReplying] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Diagnóstico"
  });

  const [newReply, setNewReply] = useState("");

  const categories = ["Diagnóstico", "Códigos de Erro", "Manutenção", "Instalação", "Dúvidas Gerais"];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      alert("Título e conteúdo são obrigatórios!");
      return;
    }

    const post: ForumPost = {
      id: Date.now().toString(),
      ...newPost,
      author: "Você",
      date: new Date().toISOString().split('T')[0],
      votes: 0,
      replies: [],
      solved: false
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "Diagnóstico" });
    setIsCreatingPost(false);
  };

  const handleAddReply = () => {
    if (!newReply || !selectedPost) {
      alert("Escreva uma resposta!");
      return;
    }

    const reply: Reply = {
      id: Date.now().toString(),
      author: "Você",
      content: newReply,
      date: new Date().toISOString().split('T')[0],
      votes: 0
    };

    const updatedPosts = posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          replies: [...post.replies, reply]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewReply("");
    setIsReplying(false);
    setSelectedPost(null);
  };

  const handleVotePost = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, votes: post.votes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleVoteReply = (postId: string, replyId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedReplies = post.replies.map(reply => {
          if (reply.id === replyId) {
            return { ...reply, votes: reply.votes + 1 };
          }
          return reply;
        });
        return { ...post, replies: updatedReplies };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const toggleSolved = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, solved: !post.solved };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Fórum da Comunidade</h2>
        <p className="text-gray-600">
          Troque experiências e tire dúvidas com outros técnicos
        </p>
      </div>

      {/* Search and Create */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <CardTitle>Discussões</CardTitle>
              <CardDescription>
                {posts.length} {posts.length === 1 ? 'tópico ativo' : 'tópicos ativos'}
              </CardDescription>
            </div>
            <Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Pergunta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Criar Nova Pergunta</DialogTitle>
                  <DialogDescription>
                    Compartilhe sua dúvida com a comunidade
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="postTitle">Título *</Label>
                    <Input
                      id="postTitle"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="Ex: Como resolver erro E1 no ar condicionado?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postCategory">Categoria</Label>
                    <select
                      id="postCategory"
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postContent">Descrição Detalhada *</Label>
                    <Textarea
                      id="postContent"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="Descreva seu problema ou dúvida em detalhes..."
                      rows={6}
                    />
                  </div>
                  <Button 
                    onClick={handleCreatePost}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Publicar Pergunta
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar discussões..."
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
              Todas
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

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Nenhuma discussão encontrada.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-cyan-600">{post.category}</Badge>
                      {post.solved && (
                        <Badge className="bg-green-600">
                          ✓ Resolvido
                        </Badge>
                      )}
                      <Badge variant="outline" className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {post.votes}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                    <CardDescription className="text-base">
                      {post.content}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.replies.length} {post.replies.length === 1 ? 'resposta' : 'respostas'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVotePost(post.id)}
                    className="flex items-center gap-2"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Útil ({post.votes})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPost(post);
                      setIsReplying(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Responder
                  </Button>
                  {post.author === "Você" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSolved(post.id)}
                      className={post.solved ? "bg-green-50 text-green-700" : ""}
                    >
                      {post.solved ? "✓ Resolvido" : "Marcar como Resolvido"}
                    </Button>
                  )}
                </div>

                {/* Replies */}
                {post.replies.length > 0 && (
                  <div className="space-y-3 mt-4 pl-4 border-l-2 border-cyan-200">
                    <h4 className="font-semibold text-gray-800">Respostas:</h4>
                    {post.replies
                      .sort((a, b) => b.votes - a.votes)
                      .map((reply) => (
                        <div 
                          key={reply.id}
                          className="p-4 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-gray-800">
                                {reply.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(reply.date).toLocaleDateString('pt-BR')}
                              </span>
                              {reply.votes > 5 && (
                                <Badge className="bg-green-600 text-xs">
                                  Melhor Resposta
                                </Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleVoteReply(post.id, reply.id)}
                              className="flex items-center gap-1 text-xs"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              {reply.votes}
                            </Button>
                          </div>
                          <p className="text-sm text-gray-700">{reply.content}</p>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Reply Dialog */}
      <Dialog open={isReplying} onOpenChange={setIsReplying}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Responder</DialogTitle>
            <DialogDescription>
              {selectedPost?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="replyContent">Sua Resposta</Label>
              <Textarea
                id="replyContent"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Compartilhe sua experiência ou solução..."
                rows={6}
              />
            </div>
            <Button 
              onClick={handleAddReply}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Publicar Resposta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="bg-cyan-600 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Comunidade Ativa
              </h4>
              <p className="text-sm text-gray-600">
                Compartilhe suas experiências e aprenda com outros técnicos. 
                As melhores respostas recebem destaque e ajudam toda a comunidade!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
