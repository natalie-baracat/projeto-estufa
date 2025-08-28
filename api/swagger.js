import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: '3.0.4',
    info: {
        title: 'API FloraData',
        version: '1.0.0',
        description: `API para monitoramento em tempo real de uma estufa. Desenvolvida no terceiro semestre do Curso Técnico de Desenvolvimento de Sistemas do SENAI`
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor Local'
        }
        // {
        //     url: 'http://192.168.0.237:3000/',
        //     description: 'Servidor do Prof. Douglas'
        // }
    ],
    tags: [
        {
            name: 'Usuarios',
            description: 'Rotas para cadastro, login, atualização e desativação de usuários'
        },
        {
            name: 'Relatorios',
            description: 'Rotas para registro, atualização e exclusão de relatórios'
        },
        {
            name: 'Leituras',
            description: 'Rotas para criação, atualização e desativação de relatórios'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    paths: {
        // USUARIOS | obs: é possivel colocar mais de um metodo na mesma rota! eu so nao quis mesmo
        '/usuarios/new': {
            post: {
                tags: ['Usuarios'],
                summary: 'Cadastrar novo relatório',
                description: 'Método utilizado para cadastrar novos relatórios',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'sobrenome', 'usuario', 'telefone', 'email', 'senha', 'id_cargo'],
                                properties: {
                                    nome: { type: 'string', example: 'João' },
                                    sobrenome: { type: 'string', example: 'Silva' },
                                    telefone: { type: 'string', example: '11 123456789' },
                                    usuario: { type: 'string', example: 'silvajoao' },
                                    email: { type: 'string', example: 'joao@example.com' },
                                    senha: { type: 'string', example: '123' },
                                    id_cargo: { type: 'integer', example: '1' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Usuário cadastrado com sucesso'
                    },
                    '400': {
                        description: 'Erro ao cadastrar usuário'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },

        '/usuarios/login': { // OBS: falta testar
            post: {
                tags: ['Usuarios'],
                summary: 'Login do usuário',
                description: 'Método utilizado para efetuar o login do usuário e gerar o token',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'senha'],
                                properties: {
                                    email: { type: 'string', example: 'natalie@email' },
                                    senha: { type: 'string', example: '7' },
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Usuário encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            token: { type: 'string', example: 'jkdnaskjdbaskjndlaksnmmlmcaj21lekn1lkn213n12jb3kj21' },
                                            id_usuario: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'João Silva' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            tipo_acesso: { type: 'string', example: 'adm' },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Erro ao encontrar usuário'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
        },

        '/usuarios': {
            get: {
                tags: ['Usuarios'],
                summary: 'Listar todos os usuários',
                description: 'Método utilizado para listar todos os usuários cadastrados',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de usuários',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            nome: { type: 'string', example: 'João' },
                                            sobrenome: { type: 'string', example: 'Silva' },
                                            telefone: { type: 'string', example: '11 123456789' },
                                            usuario: { type: 'string', example: 'silvajoao' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            cargo: { type: 'Técnico em Automação', example: '1' }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
        },


        'usuarios/editar/{id}': {
            patch: {
                tags: ['Usuarios'],
                summary: 'Editar usuário',
                description: 'Método utilizado para editar usuários',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                // required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    email: { type: 'string', example: 'amity@example.com' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Usuário editado com sucesso'
                    },
                    '400': {
                        description: 'Erro ao editar usuário'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
        },

'       /usuarios/{id}': {
            delete: {
                tags: ['Usuarios'],
                summary: 'Desativar usuario',
                description: 'Rota para desativar usuario',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                'parameters': [
                    {
                        name: 'id',
                        in: 'path', // caso queira passar como query use in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': { description: 'Usuario desativado com sucesso' },
                    '500': { description: 'Erro ao desativar usuarios' }
                }
            }
        },

        // RELATORIOS
        '/relatorios/new': {
            post: {
                tags: ['Relatorios'],
                summary: 'Novo relatorio',
                description: 'Registro de relatorio',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['titulo', 'id_usuario', 'id_cultivo', 'conteudo'],
                                properties: {
                                    titulo: { type: 'string', example: 'Alteração média da temperatura' },
                                    id_usuario: { type: 'integer', example: 7 },
                                    id_cultivo: { type: 'integer', example: 2 },
                                    conteudo: { type: 'string', example: 'Durante os últimos 7 dias, foi observada estabilidade na temperatura média da estufa de morangos 1.' }
                                }
                            }
                        }
                    }
                }
            },
            
        },

        '/relatorios/editar/:id': {
            put: {
                tags: ['Relatorios'],
                summary: 'Editar relatorio',
                description: 'Editar de relatorio',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                // required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    conteudo: { type: 'string', example: 'Correção: estufa de morango 3' }
                                }
                            }
                        }
                    }
                }
            },
            
        },

        '/relatorios/{id}': {
            delete: {
                tags: ['Relatorios'],
                summary: 'Excluir categoria',
                description: 'Rota para excluir categoria',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                'parameters': [
                    {
                        name: 'id_categoria',
                        in: 'path', // caso queira passar como query use in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': { description: 'Relatório excluído com sucesso' },
                    '500': { description: 'Erro ao excluir relatório' }
                }
            }
        },

    //     '/categorias': {
    //         get: {
    //             tags: ['Categorias'],
    //             summary: 'Listar todas as categorias',
    //             description: 'Método utilizado para listar todas as categorias cadastrados',
    //             security: [
    //                 {
    //                     bearerAuth: [],
    //                 },
    //             ],
    //             responses: {
    //                 '200': {
    //                     description: 'Lista de categorias',
    //                     content: {
    //                         'application/json': {
    //                             schema: {
    //                                 type: 'array',
    //                                 items: {
    //                                     type: 'object',
    //                                     properties: {
    //                                         nome: { type: 'string', example: 'Alimentação' },
    //                                         tipo_transacao: { type: 'string', example: 'SAIDA' },
    //                                         gasto_fixo: { type: 'boolean', example: false },
    //                                         id_usuario: { type: 'integer', example: 7 },
    //                                         cor: { type: 'string', example: '#B00B5F' },
    //                                         icone: { type: 'string', example: 'utensils' }
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 },
    //                 '500': {
    //                     description: 'Erro interno do servidor'
    //                 }
    //             }
    //         },
    //     },

    //     '/categorias/{id_categoria}': {
    //         delete: {
    //             tags: ['Categorias'],
    //             summary: 'Desativar categoria',
    //             description: 'Rota para desativar categoria',
    //             security: [
    //                 {
    //                     bearerAuth: []
    //                 }
    //             ],
    //             'parameters': [
    //                 {
    //                     name: 'id_categoria',
    //                     in: 'path', // caso queira passar como query use in: 'query'
    //                     required: true,
    //                     schema: {
    //                         type: 'integer'
    //                     }
    //                 }
    //             ],
    //             responses: {
    //                 '200': { description: 'categoria desativado com sucesso' },
    //                 '500': { description: 'Erro ao desativar categoria' }
    //             }
    //         }
    //     },

    //     'categorias/editar/{id_categoria}': {
    //         patch: {
    //             tags: ['Categorias'],
    //             summary: 'editar novo usuário',
    //             description: 'Método utilizado para editar novos usuários',
    //             requestBody: {
    //                 required: true,
    //                 content: {
    //                     'application/json': {
    //                         schema: {
    //                             type: 'object',
    //                             properties: {
    //                                 gasto_fixo: { type: 'boolean', example: false }
    //                             }
    //                         }
    //                     }
    //                 }
    //             },
    //             responses: {
    //                 '200': {
    //                     description: 'Usuário editado com sucesso'
    //                 },
    //                 '400': {
    //                     description: 'Erro ao editar usuário'
    //                 },
    //                 '500': {
    //                     description: 'Erro interno do servidor'
    //                 }
    //             }
    //         },
    //     },
    }
}

const options = {
    swaggerDefinition,
    apis: []
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec