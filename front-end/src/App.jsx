import { useEffect, useState } from "react";
import axios from "axios";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState([]);

  const [form, setForm] = useState({
    id_sensor: 1,
    temperatura: "",
    umidade: "",
    presenca: true
  });

  async function fazerLogin(e) {
    e.preventDefault();

    try {
      const resultado = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      setUsuario(resultado.user);
      setErro("");
    } catch (error) {
      console.log(error);
      setErro("Usuário não encontrado ou senha incorreta.");
    }
  }

  async function sair() {
    await signOut(auth);
    setUsuario(null);
  }

  async function buscarDashboard() {
    try {
      const resposta = await axios.get(
        "http://localhost:3002/dashboard"
      );

      setDados(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function enviarLeitura(e) {
    e.preventDefault();

    try {
      const token = await usuario.getIdToken();

      await axios.post(
        "http://localhost:3001/leituras",
        {
          temperatura: Number(form.temperatura),
          umidade: Number(form.umidade),
          presenca:
            form.presenca === true ||
            form.presenca === "true",
          id_sensor: Number(form.id_sensor)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Leitura enviada com sucesso!");

      buscarDashboard();

      setForm({
        id_sensor: 1,
        temperatura: "",
        umidade: "",
        presenca: true
      });

    } catch (error) {
      console.log(error);
      alert("Erro ao enviar leitura");
    }
  }

  useEffect(() => {
    if (usuario) {
      buscarDashboard();

      const intervalo = setInterval(() => {
        buscarDashboard();
      }, 5000);

      return () => clearInterval(intervalo);
    }
  }, [usuario]);

  if (!usuario) {
    return (
      <div className="login-container">
        <form className="login-card" onSubmit={fazerLogin}>
          <h1>Monitoramento IoT</h1>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
          />

          <button type="submit">
            Entrar
          </button>

          {erro && (
            <p className="erro">
              {erro}
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>Dashboard IoT</h1>

      <button
        className="sair"
        onClick={sair}
      >
        Sair
      </button>

      <form
        className="form-card"
        onSubmit={enviarLeitura}
      >
        <h2>Adicionar Leitura</h2>

        <select
          value={form.id_sensor}
          onChange={(e) =>
            setForm({
              ...form,
              id_sensor: e.target.value
            })
          }
        >
          <option value="1">
            Sensor 1 - Laboratório 1
          </option>

          <option value="2">
            Sensor 2 - Laboratório 2
          </option>

          <option value="3">
            Sensor 3 - Laboratório 3
          </option>
        </select>

        <input
          type="number"
          placeholder="Temperatura"
          value={form.temperatura}
          onChange={(e) =>
            setForm({
              ...form,
              temperatura: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Umidade"
          value={form.umidade}
          onChange={(e) =>
            setForm({
              ...form,
              umidade: e.target.value
            })
          }
        />

        <select
          value={form.presenca}
          onChange={(e) =>
            setForm({
              ...form,
              presenca: e.target.value
            })
          }
        >
          <option value="true">
            Presença Detectada
          </option>

          <option value="false">
            Sem Presença
          </option>
        </select>

        <button type="submit">
          Enviar Leitura
        </button>
      </form>

      <h2>Laboratórios</h2>

      <div className="cards">

        {dados.map((item) => (

          <div
            className="lab-card"
            key={item.id_dashboard}
          >

            <h3>
              {item.laboratorio}
            </h3>

            <p>
              🌡 Temperatura Média:
              {" "}
              {item.media_temperatura}°C
            </p>

            <p>
              💧 Umidade Média:
              {" "}
              {item.media_umidade}%
            </p>

            <p>
              👥 Presenças:
              {" "}
              {item.total_presencas}
            </p>

            <p>
              📊 Leituras:
              {" "}
              {item.total_leituras}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;