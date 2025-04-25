import React, { useEffect, useState } from "react";
import "../styles/pages/Conta.css";
import imagem from "../assets/images/pagina-pessoa.jpg";
import api from "../api/api";

function Conta() {
  const [formData, setFormData] = useState({ pessoaId: "", numeroConta: "" });
  const [pessoas, setPessoas] = useState([]);
  const [selectedContaId, setSelectedContaId] = useState(null);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await api.get("http://localhost:8080/pessoas/contas");
        setPessoas(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar pessoas e contas:", error);
        alert("Erro ao carregar a lista de pessoas e contas.");
      }
    };

    fetchPessoas();
  }, []);

  const capitalizeWords = (value) => {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const applyCpfMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleEdit = (pessoaId, conta) => {
    setFormData({
      pessoaId: pessoaId,
      numeroConta: conta.numero,
    });
    setSelectedContaId(conta.id);
  };

  const handleRemove = async (contaId) => {
    if (window.confirm(`Tem certeza que deseja remover a conta de ID ${contaId}?`)) {
      try {
        await api.delete(`http://localhost:8080/contas/${contaId}`);
        alert("Conta removida com sucesso!");

        // Atualiza a lista localmente sem precisar recarregar tudo
        const updatedPessoas = pessoas.map(pessoa => ({
          ...pessoa,
          contas: pessoa.contas.filter(conta => conta.id !== contaId)
        }));
        
        setPessoas(updatedPessoas);
        
        // Se estava editando a conta que foi removida, limpa o formulário
        if (selectedContaId === contaId) {
          setFormData({ pessoaId: "", numeroConta: "" });
          setSelectedContaId(null);
        }
      } catch (error) {
        console.error("Erro ao remover conta:", error);
        alert("Erro ao remover a conta.");
      }
    }
  };

  const handleSave = async () => {
    // Verifica se contém apenas números
    if (!/^\d+$/.test(formData.numeroConta)) {
      alert("O número da conta deve conter apenas números!");
      return;
    }
  
    if (!formData.pessoaId || !formData.numeroConta) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
  
    try {
      const payload = { numeroConta: formData.numeroConta }; 
  
      if (selectedContaId) {
        console.log("Atualizando conta com ID:", selectedContaId);
        await api.put(`http://localhost:8080/contas/${selectedContaId}`, payload);
        alert("Conta atualizada com sucesso!");
      } else {
        await api.post(
          `http://localhost:8080/contas/cadastro?pessoa_id=${formData.pessoaId}`,
          payload
        );
        alert("Conta cadastrada com sucesso!");
      }
  
      setFormData({ pessoaId: "", numeroConta: "" });
      setSelectedContaId(null);
  
      // Recarrega os dados
      const response = await api.get("http://localhost:8080/pessoas/contas");
      setPessoas(response.data);
    } catch (error) {
      console.error("Erro ao salvar conta:", error);
      alert("Erro ao salvar a conta: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container-t">
      <img src={imagem} alt="Imagem relacionada à conta" className="imagem-conta" />
      <div className="form-conta">
        <div className="titulo">
          <h1>{selectedContaId ? "Editar Conta" : "Cadastrar Conta"}</h1>
          <p>Selecione um usuário e preencha os dados!</p>
        </div>
        <div className="container-t-form">
          <form>
            <div className="input-container">
              <select
                id="pessoaId"
                name="pessoaId"
                value={formData.pessoaId}
                onChange={(e) => setFormData({ ...formData, pessoaId: e.target.value })}
                required
              >
                <option value="" disabled>Selecione o Usuário</option>
                {pessoas.map((pessoa) => (
                  <option key={pessoa.id} value={pessoa.id}>
                    {capitalizeWords(pessoa.nome)} - {applyCpfMask(pessoa.cpf)}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-container">
              <input
                id="numeroConta"
                type="text"
                name="numeroConta"
                value={formData.numeroConta}
                onChange={(e) => setFormData({ ...formData, numeroConta: e.target.value })}
                placeholder="­"
                required
              />
              <label htmlFor="numeroConta">Número da Conta</label>
            </div>
            <button type="button" onClick={handleSave}>
              {selectedContaId ? "Atualizar" : "Salvar"}
            </button>
          </form>
        </div>

        <div className="tabela-pessoas">
          <h2>Lista de Pessoas e Contas</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Contas</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td>{capitalizeWords(pessoa.nome)}</td>
                  <td>{applyCpfMask(pessoa.cpf)}</td>
                  <td>
                    {pessoa.contas.length > 0 ? (
                      pessoa.contas.map((conta) => (
                        <div key={`conta-${conta.id}`}>Conta: {conta.numero}</div>
                      ))
                    ) : (
                      "Não possui conta cadastrada"
                    )}
                  </td>
                  <td>
                    {pessoa.contas.map((conta) => (
                      <div key={`radio-edit-${conta.id}`}>
                        <input
                          type="radio"
                          name={`select-conta-edit`}
                          checked={selectedContaId === conta.id}
                          onChange={() => handleEdit(pessoa.id, conta)}
                          style={{ transform: "scale(0.5)" }}
                        />
                      </div>
                    ))}
                  </td>
                  <td>
                    {pessoa.contas.map((conta) => (
                      <div key={`radio-remove-${conta.id}`}>
                        <input
                          type="radio"
                          name={`select-conta-remove`}
                          onChange={() => handleRemove(conta.id)}
                          style={{ transform: "scale(0.5)" }}
                        />
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Conta;