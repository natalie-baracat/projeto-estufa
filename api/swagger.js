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
            name: 'Atuadores',
            description: 'Rotas para visualização e edição de cada atuador em cada cultivo'
        },
        {
            name: 'Sensores',
            description: 'Rotas para visualização de cada sensor em cada cultivo'
        },
        {
            name: 'Leituras dos sensores',
            description: 'Rotas para visualização das leituras do sensor em cada cultivo'
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

        // RELATORIOS ****************************************
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

        '/relatorios': {
            get: {
                tags: ['Relatorios'],
                summary: 'Listar todos os relatórios',
                description: 'Método utilizado para listar todos os relatórios cadastrados',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de relatórios',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            titulo: { type: 'string', example: 'Desempenho dos atuadores nas últimas horas (28/07)' },
                                            id_usuario: { type: 'integer', example: 7 },
                                            id_cultivo: { type: 'integer', example: 3 },
                                            conteudo: { type: 'string', example: 'Relatório aqui' }
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

        // ATUADORES *****************************************
        '/atuadores': {
            get: {
                tags: ['Atuadores'],
                summary: 'Listar todos os atuadores',
                description: 'Método utilizado para listar todos os atuadores cadastrados',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de atuadores',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            nome: { type: 'string', example: 'Válvula Solenoide 12V 3/4' },
                                            status: { type: 'string', example: 'desligado' },
                                            descricao: { type: 'string', example: 3 },
                                            porta_controle: { type: 'integer', example: 12 },
                                            tipo: { type: 'string', example: 'umidade' },
                                            cultivo: { type: 'string', example: 'morango' }
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

        '/atuadores/editar/:id': {
            patch: {
                tags: ['Atuadores'],
                summary: 'Editar atuador',
                description: 'Editar de atuador',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                        status: { type: 'string', example: 'ligado' },
                                }
                            }
                        }
                    }
                }
            },
            
        },

        // SENSORES ******************************************
        '/sensores': {
            get: {
                tags: ['Sensores'],
                summary: 'Listar todos os sensores',
                description: 'Método utilizado para listar todos os sensores cadastrados',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de sensores',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            nome: { type: 'string', example: 'Sensor DHT22' },
                                            img_sensor: { type: 'string', example: 'sensor1.jpg' },
                                            descricao: { type: 'string', example: 'sensor de temperatura e umidade' },
                                            ativo: { type: 'string', example: 'inativo' },
                                            tipo: { type: 'string', example: 'temperatura e umidade' },
                                            cultivo: { type: 'string', example: 'morango' }
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
        
        // LEITURAS ******************************************

        '/leituras': {
            get: {
                tags: ['Leituras'],
                summary: 'Listar todas as leituras dos sensores',
                description: 'Método utilizado para listar todas as leituras lidas nos sensores',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de leituras',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            valor: { type: 'float', example: 1232.5 },
                                            data_hora_leitura: { type: 'string', example: 'SAIDA' }
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

    //     '/leituras/{id_categoria}': {
    //         delete: {
    //             tags: ['leituras'],
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

    //     'leituras/editar/{id_categoria}': {
    //         patch: {
    //             tags: ['leituras'],
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