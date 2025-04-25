import React, { useEffect, useState } from "react";
import "../styles/pages/Movimentação.css"; // Estilos exclusivos da página Movimentação
import imagem from "../assets/images/pagina-pessoa.jpg";
import api from "../api/api";

function Movimentacao() {
  const [formData, setFormData] = useState({
    contaId: "",
    valor: "",
    tipo: "",
  });
  const [pessoas, setPessoas] = useState([]);
  const [contas, setContas] = useState([]);
  const [extrato, setExtrato] = useState([]);
  const [saldoAtual, setSaldoAtual] = useState(0); // Saldo da conta selecionada

  // Carregar as pessoas (nome e CPF) ao montar o componente
  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await api.get("/pessoas/IdNomeCpf");
        setPessoas(response.data);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
        alert("Erro ao carregar a lista de pessoas.");
      }
    };

    fetchPessoas();
  }, []);

  // Carregar as contas (número da conta e saldo) ao selecionar um usuário
  const handlePessoaChange = async (e) => {
    const pessoaId = e.target.value;
    setFormData({ ...formData, contaId: "", valor: "", tipo: "" }); // Reseta os campos dependentes
    setExtrato([]); // Reseta o extrato
    setSaldoAtual(0); // Reseta o saldo
    try {
      const response = await api.get(`/contas/pessoas/${pessoaId}`);
      setContas(response.data);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
      alert("Erro ao carregar as contas do usuário.");
    }
  };

  // Carregar o extrato e saldo ao selecionar uma conta
  const handleContaChange = async (e) => {
    const contaId = e.target.value;
    setFormData({ ...formData, contaId });
    await atualizarExtratoEConta(contaId); // Atualiza o extrato e saldo
  };

  // Atualizar extrato e saldo da conta
  const atualizarExtratoEConta = async (contaId) => {
    try {
      const response = await api.get(`/movimentacoes/conta/${contaId}`);
      setExtrato(response.data);
      if (response.data.length > 0) {
        const saldoAtualizado = response.data[0].conta.saldo;
        setSaldoAtual(saldoAtualizado); // Atualiza o saldo exibido no extrato
        // Atualiza o saldo no select de contas
        setContas((prevContas) =>
          prevContas.map((conta) =>
            conta.id === parseInt(contaId)
              ? { ...conta, saldo: saldoAtualizado }
              : conta
          )
        );
      } else {
        setSaldoAtual(0); // Caso não haja movimentações, o saldo é zerado
      }
    } catch (error) {
      console.error("Erro ao carregar o extrato:", error);
      alert("Erro ao carregar o extrato da conta.");
    }
  };

  // Lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Salvar a movimentação
  // Salvar a movimentação
  const handleSave = async () => {
    if (!formData.contaId || !formData.valor || !formData.tipo) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    // Validação do valor (deve ser um número válido e maior que zero)
    const valorNumerico = parseFloat(formData.valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("O valor deve ser um número maior que zero!");
      return;
    }

    const movimentacao = {
      conta: { id: parseInt(formData.contaId) },
      valor: valorNumerico, // Sempre envia o valor como positivo
      tipo: formData.tipo,  // Tipo: "DEPOSITO" ou "RETIRADA"
    };

    try {
      const response = await api.post("/movimentacoes/cadastro", movimentacao);
      alert("Movimentação cadastrada com sucesso!");
      console.log("Resposta do servidor:", response.data);

      // Atualiza o extrato e saldo da conta selecionada
      await atualizarExtratoEConta(formData.contaId);

      // Limpa os campos de valor e tipo, mantendo a conta selecionada
      setFormData({ ...formData, valor: "", tipo: "" });
    } catch (error) {
      console.error("Erro ao cadastrar movimentação:", error);
      alert("Erro ao cadastrar a movimentação.");
    }
  };

  return (
    <div className="container-t">
      <img
        src={imagem}
        alt="Imagem relacionada à movimentação"
        className="imagem-movimentacao"
      />
      <div className="form-movimentacao">
        <div className="titulo">
          <h1>Extrato e Movimentações</h1>
          <p>
            Selecione o usuário e a conta para visualizar o extrato e realizar
            movimentações.
          </p>
        </div>
        <form>
          {/* Campo Usuário */}
          <div className="input-container">
            <select
              id="pessoa"
              name="pessoa"
              onChange={handlePessoaChange}
              required
            >
              <option value="" disabled>
                Selecione o Usuário
              </option>
              {pessoas.map((pessoa) => (
                <option key={pessoa.id} value={pessoa.id}>
                  {pessoa.nome} - {pessoa.cpf}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Conta */}
          <div className="input-container">
            <select
              id="contaId"
              name="contaId"
              value={formData.contaId}
              onChange={handleContaChange}
              required
            >
              <option value="" disabled>
                Selecione a Conta
              </option>
              {contas.map((conta) => (
                <option key={conta.id} value={conta.id}>
                  Conta: {conta.numeroConta} - Saldo: R$ {conta.saldo.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Valor */}
          <div className="input-container">
            <input
              id="valor"
              type="text"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="valor">Valor</label>
          </div>

          {/* Campo Depósito/Retirada */}
          <div className="input-container">
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Depositar/Retirar
              </option>
              <option value="DEPOSITO">Depositar</option>
              <option value="RETIRADA">Retirar</option>
            </select>
          </div>

          <button type="button" onClick={handleSave}>
            Salvar
          </button>
        </form>

        {/* Exibir Extrato */}
        <div className="extrato-container">
          <h2>Extrato da Conta</h2>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {extrato.map((mov) => (
                <tr key={mov.id}>
                  <td>
                    {new Date(mov.data).toLocaleDateString()}{" "}
                    {new Date(mov.data).toLocaleTimeString()}
                  </td>
                  <td>{mov.tipo}</td>
                  <td style={{ color: mov.valor < 0 ? "red" : "green" }}>
                    R$ {mov.valor.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Saldo Atual: R$ {saldoAtual.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default Movimentacao;