<template>
  <v-container>
    <!-------------------------------- cadstro de profissao -------------------------------->
    <v-row>
      <v-col class="pa-ml-12">
        <v-hover v-slot="{ isHovering, props }">
          <v-btn v-bind="props" :elevation="isHovering ? 24 : 6" :color="isHovering ? 'primary' : undefined">
            CADASTRO DE PROFISSÃO
            <v-dialog v-model="cadastroProfissao" activator="parent">
              <v-col align-self="center" cols="6">
                <v-card>
                  <v-card-text>
                    <v-form v-model="cadastroProfissaoValido" @submit.prevent="cadastrar">
                      <v-row>
                        <v-col>
                          <v-text-field :rules="[v => Boolean(v) || 'Field is required']" label="PROFISSÃO"
                            v-model="bodyProfissaoCadastrar.nome">
                          </v-text-field>

                          <v-btn type="submit" block :disabled="!cadastroProfissaoValido" color="primary">SALVAR
                            PROFISSÃO</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" block @click="cadastroProfissao = false">FECHAR</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-dialog>
          </v-btn>
        </v-hover>

        <v-tooltip v-model="profisson" location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon class="pa-md-6" icon v-bind="props" color="grey-lighten-1" hover="primary">
              mdi-help-circle-outline
            </v-icon>
          </template>
          <span>Clique neste botão para adciona uma nova profissão.</span>
        </v-tooltip>
      </v-col>

      <!-------------------------------- cadastro de usuario -------------------------------->
      <v-col>
        <v-hover v-slot="{ isHovering, props }">
          <v-btn v-bind="props" :elevation="isHovering ? 24 : 6" :color="isHovering ? 'primary' : undefined">
            CADASTRO DE USUÁRIO

            <v-dialog v-model="cadastroUsuario" activator="parent">
              <v-col align-self="center" cols="6">
                <v-card>
                  <v-card-text>
                    <v-form v-model="cadastroUsuarioValido" @submit.prevent="cadastrarUsuario">
                      <v-row class="text-center">
                        <v-col>
                          <v-text-field :rules="[v => Boolean(v) || 'Field is required']" label="USUÁRIO"
                            v-model="bodyCadastrarUsuario.usuario"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-autocomplete :rules="[v => Boolean(v) || 'Field is required']" label="PROFISSÃO"
                            :items="profissoes" item-title="nome" item-value="id"
                            v-model="bodyCadastrarUsuario.profissaoId"></v-autocomplete>
                          <v-btn type="submit" block :disabled="!cadastroUsuarioValido" color="primary">SALVAR
                            USUÁRIO</v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" block @click="cadastroUsuario = false">FECHAR</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-dialog>
          </v-btn>
        </v-hover>
        <v-tooltip v-model="user" location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon class="pa-md-6" icon v-bind="props" color="grey-lighten-1" hover="primary">
              mdi-help-circle-outline
            </v-icon>
          </template>
          <span>Clique neste botão para adciona um novo usuário.</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <!-------------------------------- tabela profissao -------------------------------->
    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th>PROFISSÃO <v-icon class="pa-md-3">mdi-briefcase-outline</v-icon></th>
              <th>EDITAR <v-icon class="pa-md-3">mdi-pencil</v-icon></th>
              <th>EXCLUIR <v-icon class="pa-md-3">mdi-delete-outline</v-icon></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in profissoes" :key="index">
              <td> {{ item.nome }} </td>
              <td>
                <v-btn @click="editarClick(item)" color="primary">
                  EDITAR PROFISSÃO
                  <v-icon>mdi-autorenew</v-icon>
                </v-btn>
              </td>
              <td><v-btn @click="deletar(item.id)" class="deletar"><v-icon>mdi-delete-outline</v-icon></v-btn></td>
            </tr>
          </tbody>
        </v-table>
      </v-col>

      <!-------------------------------- tababela usuario -------------------------------->
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th>USUÁRIO <v-icon class="pa-md-3">mdi-account-outline</v-icon></th>
              <th>PROFISSÃO <v-icon class="pa-md-3">mdi-briefcase-outline</v-icon></th>
              <th>EDITAR <v-icon class="pa-md-3">mdi-pencil</v-icon></th>
              <th>EXCLUIR <v-icon class="pa-md-3">mdi-delete-outline</v-icon></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in usuariosComputados" :key="index">
              <td> {{ item.usuario }} </td>
              <td> {{ item.profissao.nome }}</td>
              <td>
                <v-btn @click="editarClickUsuario(item)" color="primary">
                  EDITAR USUÁRIO<v-icon>mdi-autorenew</v-icon>
                </v-btn>
              </td>
              <td><v-btn @click="deletarUsuario(item.id)" class="deletar"><v-icon>mdi-delete-outline</v-icon></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <!-------------------------------- editar profissao -------------------------------->
    <v-dialog v-model="atualizaProfissao">
      <v-col align-self="center" cols="6">
        <v-card>
          <v-card-text>
            <v-form v-model="cadastroProfissaoValidoAtualizar" @submit.prevent="atualizar">
              <v-row class="text-center">
                <v-col>
                  <v-text-field :rules="[v => Boolean(v) || 'Field is required']" label="PROFISSÃO"
                    v-model="bodyProfissaoAtualizar.nome">
                  </v-text-field>
                  <v-btn type="submit" block :disabled="!cadastroProfissaoValidoAtualizar"
                    color="primary">EDITAR</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="atualizaProfissao = false">FECHAR</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-dialog>

    <!-------------------------------- editar usuario -------------------------------->
    <v-dialog v-model="atualizaUsuario">
      <v-col align-self="center" cols="6">
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="atualizarUsuario">
              <v-row class="text-center">
                <v-col>
                  <v-text-field :rules="[v => Boolean(v) || 'Field is required']" label="USUÁRIO"
                    v-model="bodyAtualizarUsuario.usuario"></v-text-field>
                  <v-autocomplete label="PROFISSÃO" :items="profissoes" item-title="nome" item-value="id"
                    v-model="bodyAtualizarUsuario.profissaoId"></v-autocomplete>
                  <v-btn color="primary" type="submit" block :disabled="!formEditarUsuarioValido">
                    EDITAR
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="atualizaUsuario = false">FECHAR</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  mounted() {
    this.listar().then();
    this.listarUsuario().then();
  },

  data: () => ({

    user: false,
    profisson: false,

    cadastroProfissao: false,
    cadastroUsuario: false,

    atualizaProfissao: false,
    atualizaUsuario: false,

    cadastroUsuarioValido: false,
    cadastroProfissaoValido: false,

    cadastroUsuarioValidoAtualizar: false,
    cadastroProfissaoValidoAtualizar: false,

    // ------------------------------ profissao ------------------------------
    bodyProfissaoCadastrar: {
      nome: "",
    },

    bodyProfissaoAtualizar: {
      id: "",
      nome: "",
    },
    idProfissaoAtualizar: "",

    profissoes: [],

    //----------------------- usuario ----------------------------------

    bodyCadastrarUsuario: {
      usuario: "",
      profissaoId: null,
    },

    bodyAtualizarUsuario: {
      id: "",
      profissaoId: null,
    },

    usuarios: [],
  }),

  //----------------------- profissoes ----------------------------------

  computed: {
    usuariosComputados() {
      return this.usuarios.map(usuario => {
        const profissao = this.profissoes.find(item => item.id === usuario.profissaoId)
        return { ...usuario, profissao: { ...profissao } }
      })
    },

    formEditarUsuarioValido() {
      if (!this.bodyAtualizarUsuario.usuario)
        return false

      if (!this.bodyAtualizarUsuario.profissaoId)
        return false

      return true
    }
  }
  ,

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) alert('Form is valid')
    },

    async cadastrar() {
      console.log("submit disparado");
      console.log(this.body);

      await fetch("http://localhost:3000/profissoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.bodyProfissaoCadastrar),
      });
      this.listar().then();
      this.bodyProfissaoCadastrar.nome = ""
      this.cadastroProfissao = false
    },

    async listar() {
      const response = await fetch("http://localhost:3000/profissoes", {
        method: "GET",
      });
      this.profissoes = await response.json();
    },

    async atualizar() {
      console.log(this.bodyProfissaoAtualizar)
      await fetch(`http://localhost:3000/profissoes/${this.bodyProfissaoAtualizar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.bodyProfissaoAtualizar),
      });
      this.listar().then();

      this.bodyProfissaoAtualizar.id = ""
      this.bodyProfissaoAtualizar.nome = ""
      this.atualizaProfissao = false
    },

    editarClick(item) {
      this.bodyProfissaoAtualizar = { ...item };
      this.atualizaProfissao = true;
    },

    async deletar(id) {
      const response = await fetch(`http://localhost:3000/profissoes/${id}`, {
        method: "DELETE",
      });

      if (response.status < 200 || response.status > 299) {
        alert(await response.text())
      }

      this.listar().then();
    },

    //------------------------------- usuarios ---------------------------------------
    async cadastrarUsuario() {
      console.log("submit disparado");
      console.log(this.bodyCadastrarUsuario);

      await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.bodyCadastrarUsuario),
      });
      this.listarUsuario().then();
      this.bodyCadastrarUsuario.usuario = "";
      this.bodyCadastrarUsuario.profissaoId = "";
      this.cadastroUsuario = false;
    },

    async listarUsuario() {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "GET",
      });
      this.usuarios = await response.json();
    },

    async atualizarUsuario() {
      await fetch(`http://localhost:3000/usuarios/${this.bodyAtualizarUsuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.bodyAtualizarUsuario),
      });

      await this.listarUsuario().then();

      this.bodyAtualizarUsuario.id = ""
      this.bodyAtualizarUsuario.usuario = ""
      this.bodyAtualizarUsuario.profissaoId = ""

      this.atualizaUsuario = false
    },

    editarClickUsuario(item) {
      this.atualizaUsuario = true;
      this.bodyAtualizarUsuario = { ...item };
    },

    async deletarUsuario(id) {
      await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
      });
      this.listarUsuario().then();
    },
  },
};
</script>

<style>
.primaria {
  background-color: #44405000;
}

.secundaria {
  background-color: #37344000;
}

.complementar {
  background-color: #28262f00;
}

.deletar {
  background-color: #ee0212;
}
</style>
