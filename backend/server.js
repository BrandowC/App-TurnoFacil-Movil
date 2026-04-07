const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// =========================
// DATOS EN MEMORIA
// =========================
let servicios = [
  {
    id: 1,
    nombre: "Asesoría",
    descripcion: "Atención para orientación académica y administrativa.",
    cupos: 5,
    horario: "8:00 AM - 12:00 PM",
  },
  {
    id: 2,
    nombre: "Certificados",
    descripcion: "Solicitud y entrega de certificados estudiantiles.",
    cupos: 3,
    horario: "9:00 AM - 1:00 PM",
  },
  {
    id: 3,
    nombre: "Bienestar",
    descripcion: "Atención de bienestar universitario y apoyo estudiantil.",
    cupos: 0,
    horario: "7:00 AM - 11:00 AM",
  },
  {
    id: 4,
    nombre: "Registro Académico",
    descripcion: "Procesos de matrícula, notas y registro.",
    cupos: 4,
    horario: "8:00 AM - 2:00 PM",
  },
  {
    id: 5,
    nombre: "Consultorio",
    descripcion: "Atención básica y orientación en salud.",
    cupos: 2,
    horario: "10:00 AM - 3:00 PM",
  },
  {
    id: 6,
    nombre: "Psicología",
    descripcion: "Atención psicológica y acompañamiento emocional.",
    cupos: 1,
    horario: "1:00 PM - 5:00 PM",
  },
];

let turnos = [];

// =========================
// RUTA BASE
// =========================
app.get("/", (req, res) => {
  res.send("API TurnoFácil funcionando");
});

// =========================
// GET /api/servicios
// =========================
app.get("/api/servicios", (req, res) => {
  res.json(servicios);
});

// =========================
// GET /api/servicios/:id
// =========================
app.get("/api/servicios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const servicio = servicios.find((s) => s.id === id);

  if (!servicio) {
    return res.status(404).json({
      mensaje: "Servicio no encontrado",
    });
  }

  res.json(servicio);
});

// =========================
// POST /api/turnos
// =========================
app.post("/api/turnos", (req, res) => {
  const { nombre, documento, servicioId } = req.body || {};

  // Validación campos requeridos
  if (!nombre || !documento || !servicioId) {
    return res.status(400).json({
      mensaje: "Faltan campos requeridos: nombre, documento y servicioId",
    });
  }

  const servicio = servicios.find((s) => s.id === Number(servicioId));

  // Validación servicio no existe
  if (!servicio) {
    return res.status(404).json({
      mensaje: "El servicio no existe",
    });
  }

  // Validación cupos
  if (servicio.cupos <= 0) {
    return res.status(400).json({
      mensaje: "Sin cupos disponibles para este servicio",
    });
  }

  const nuevoTurno = {
    id: turnos.length + 1,
    nombre,
    documento,
    servicio: servicio.nombre,
    servicioId: servicio.id,
    hora: new Date().toLocaleString(),
  };

  turnos.push(nuevoTurno);

  // Restar cupo
  servicio.cupos -= 1;

  res.status(201).json({
    mensaje: "Turno solicitado con éxito",
    turno: nuevoTurno,
  });
});

// =========================
// LEVANTAR SERVIDOR
// =========================
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
