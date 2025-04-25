import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import imagem from "../assets/images/pagina-pessoa.jpg";
import "../styles/pages/Pessoa.css"; // Certifique-se de ajustar o CSS
import api from "../api/api";

function Pessoa() {
  const [formData, setFormData] = useState({ id: "", nome: "", cpf: "", endereco: "" });
  const [pessoas, setPessoas] = useState([]);
  const [selectedEditId, setSelectedEditId] = useState(null); // Armazena o ID do cliente selecionado para edição
  const [selectedRemoveId, setSelectedRemoveId] = useState(null); // Armazena o ID do cliente selecionado para remoção
  const [darkMode, setDarkMode] = useState(false); // Estado para habilitar/desabilitar o Dark Mode

  // Carregar lista de pessoas
  useEffect(() => {
    fetchPessoas();
  }, []);

  const fetchPessoas = async () => {
    try {
      const response = await api.get("/pessoas"); // Certifique-se de que este endpoint está correto
      setPessoas(response.data);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
      alert("Erro ao carregar a lista de pessoas.");
    }
  };

  // Função para aplicar máscara de CPF
  const applyCpfMask = (value) => {
    return value
      .replace(/\D/g, "") // Remove qualquer caractere que não seja número
      .replace(/(\d{3})(\d)/, "$1.$2") // Aplica o primeiro ponto
      .replace(/(\d{3})(\d)/, "$1.$2") // Aplica o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Aplica o traço
  };

  // Função para capitalizar a primeira letra de cada palavra
  const capitalizeWords = (value) => {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      // Aplica a máscara apenas no campo CPF
      setFormData({ ...formData, [name]: applyCpfMask(value) });
    } else if (name === "nome") {
      // Aplica capitalização no campo Nome
      setFormData({ ...formData, [name]: capitalizeWords(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Salvar ou atualizar pessoa
  const handleSave = async () => {
    // Remove a máscara do CPF antes de enviar ao back-end
    const cleanedCPF = formData.cpf.replace(/\D/g, ""); // Remove qualquer caractere que não seja número

    if (!formData.nome || !cleanedCPF || !formData.endereco) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const payload = {
        ...formData,
        cpf: cleanedCPF, // CPF sem máscara
      };

      if (formData.id) {
        // Atualizar pessoa
        await api.put(`/pessoas/${formData.id}`, payload);
        alert("Pessoa atualizada com sucesso!");
      } else {
        // Salvar nova pessoa
        await api.post("/pessoas/cadastro", payload);
        alert("Pessoa cadastrada com sucesso!");
      }

      // Limpar formulário e recarregar lista
      setFormData({ id: "", nome: "", cpf: "", endereco: "" });
      setSelectedEditId(null);
      setSelectedRemoveId(null);
      fetchPessoas(); // Recarregar lista
    } catch (error) {
      console.error("Erro ao salvar pessoa:", error);
      alert("Erro ao salvar pessoa.");
    }
  };

  // Carregar pessoa para edição
  const handleEdit = (pessoa) => {
    // Formata o CPF com máscara ao carregar para edição
    setFormData({
      ...pessoa,
      nome: capitalizeWords(pessoa.nome), // Aplica a capitalização ao carregar o campo Nome
      cpf: applyCpfMask(pessoa.cpf), // Aplica a máscara no CPF para exibição
    });
    setSelectedEditId(pessoa.id); // Marca o cliente como selecionado para edição
    setSelectedRemoveId(null); // Desmarca qualquer remoção ativa
  };

  // Remover pessoa
  const handleRemove = async (id) => {
    if (window.confirm("Tem certeza que deseja remover esta pessoa?")) {
      try {
        await api.delete(`/pessoas/${id}`);
        alert("Pessoa removida com sucesso!");
        fetchPessoas(); // Recarregar a lista
        setSelectedRemoveId(null); // Desmarca o cliente selecionado
      } catch (error) {
        console.error("Erro ao remover pessoa:", error);
        alert("Erro ao remover pessoa.");
      }
    }
  };

  // Voltar para cadastro
  const handleResetToCadastro = () => {
    setFormData({ id: "", nome: "", cpf: "", endereco: "" });
    setSelectedEditId(null);
    setSelectedRemoveId(null);
  };

  return (
    <motion.div
      className={`container-t ${darkMode ? "dark-mode" : ""}`} // Adiciona classe para Dark Mode
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.button
        className="darkmode-toggle"
        onClick={() => setDarkMode(!darkMode)} // Alterna entre Dark Mode e modo claro
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? "Desativar Dark Mode" : "Ativar Dark Mode"}
      </motion.button>
      <motion.img
        src={imagem}
        alt="maquininha passando cartão"
        className="imagem-pessoa"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      />
      <div className="container-t-form">
        <motion.div
          className="form-pessoa"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="titulo"
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{formData.id ? "Editar Pessoa" : "Cadastrar Pessoa"}</h1>
            <p>Preencha as informações abaixo para cadastrar ou editar uma pessoa.</p>
          </motion.div>
          <form>
            <motion.div
              className="input-container"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.3 }}
            >
              <input
                id="nome"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="nome">Nome</label>
            </motion.div>
            <motion.div
              className="input-container"
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.3 }}
            >
              <input
                id="cpf"
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="cpf">CPF</label>
            </motion.div>
            <motion.div
              className="input-container"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.3 }}
            >
              <input
                id="endereco"
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="endereco">Endereço</label>
            </motion.div>
            <motion.button
              type="button"
              onClick={handleSave}
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {formData.id ? "Atualizar" : "Salvar"}
            </motion.button>
          </form>
        </motion.div>
        <motion.div
          className="tabela-pessoas"
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2>Lista de Pessoas</h2>
          <table
            style={{
              width: "100%",
              tableLayout: "fixed",
              borderCollapse: "collapse",
            }}
          >
            <colgroup>
              <col style={{ width: "20%", border: "1px solid" }} />
              <col style={{ width: "20%", border: "1px solid" }} />
              <col style={{ width: "20%", border: "1px solid" }} />
              <col style={{ width: "10%", border: "1px solid" }} />
              <col style={{ width: "10%", border: "1px solid" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Endereço</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.length > 0 && (
                <tr>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span>Cadastro</span>
                    <input
                      type="radio"
                      name="action-reset"
                      onChange={handleResetToCadastro}
                      checked={!selectedEditId && !selectedRemoveId}
                      style={{ transform: "scale(0.5)" }}
                    />
                  </td>
                </tr>
              )}
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td>{capitalizeWords(pessoa.nome)}</td>{" "}
                  {/* Aplica capitalização ao exibir na tabela */}
                  <td style={{ borderTop: "1px solid" }}>
                    {applyCpfMask(pessoa.cpf)}
                  </td>{" "}
                  {/* Aplica máscara ao exibir na tabela */}
                  <td style={{ borderTop: "1px solid" }}>
                    {pessoa.endereco}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      overflow: "hidden",
                      borderTop: "1px solid",
                    }}
                  >
                    <input
                      type="radio"
                      name={`edit-${pessoa.id}`}
                      checked={selectedEditId === pessoa.id}
                      onChange={() => handleEdit(pessoa)}
                      style={{
                        transform: "scale(0.5)",
                        maxWidth: "100%",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      overflow: "hidden",
                      borderTop: "1px solid",
                    }}
                  >
                    <input
                      type="radio"
                      name={`remove-${pessoa.id}`}
                      checked={selectedRemoveId === pessoa.id}
                      onChange={() => {
                        setSelectedRemoveId(pessoa.id);
                        handleRemove(pessoa.id);
                      }}
                      style={{
                        transform: "scale(0.5)",
                        maxWidth: "100%",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Pessoa;